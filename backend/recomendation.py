import numpy as np
import torch
import json
from custom_net import munch_net
import torch.nn as nn
import os
torch.set_default_tensor_type('torch.DoubleTensor')
device = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")
def load_menu():
    with open('1.json','r') as f:
        v1=f.read()
        v1d=json.loads(v1)
        f.close()
    with open('2.json','r') as f:
        v2=f.read()
        v2d=json.loads(v2)
    #get ingredient list
    ing_list=[]
    food_count_1=0
    food_count_2=0
    for c in range(len(v1d['sections'])):
        for c1 in range(len(v1d['sections'][c]['foods'])):
            food_count_1+=1
            ingredient=v1d['sections'][c]['foods'][c1]
            for c2 in range(len(ingredient['ingredients'])):
                if not(ingredient['ingredients'][c2] in ing_list):
                    ing_list+=[ingredient['ingredients'][c2]]
    c,c1,c2=0,0,0
    for c in range(len(v2d['sections'])):
        for c1 in range(len(v2d['sections'][c]['foods'])):
            ingredient=v2d['sections'][c]['foods'][c1]
            food_count_2+=1
            for c2 in range(len(ingredient['ingredients'])):
                if not(ingredient['ingredients'][c2] in ing_list):
                    ing_list+=[ingredient['ingredients'][c2]]
    print(ing_list)
    print(food_count_1,food_count_2)
    return ing_list,v1d,v2d
def make_datasets(menu_dict,ing_list):
    menu_vector=np.zeros([7,len(ing_list)])
    gc=0
    for c in range(len(menu_dict['sections'])):
        for c1 in range(len(menu_dict['sections'][c]['foods'])):
            menu_vector[gc,0]=menu_dict['sections'][c]['foods'][c1]['price']
            for c2 in range(len(menu_dict['sections'][c]['foods'][c1]['ingredients'])):
                loc_indice=ing_list.index(menu_dict['sections'][c]['foods'][c1]['ingredients'][c2])
                menu_vector[gc,loc_indice]=1
            gc+=1
    return menu_vector
#ing_list,v1d,v2d=load_menu()
#print(v1d)
#menu_vector=make_datasets(v1d,ing_list)
#print(menu_vector)
class recomend():
    def __init__(self):
        ing_list,v1d,v2d=load_menu()
        self.v1d=v1d
        self.v2d=v2d
        self.ing_list=ing_list
        self.il_length=len(ing_list)
        v1d_dset=make_datasets(v1d,ing_list)
        v2d_dset=make_datasets(v2d,ing_list)
        v1d_dset.shape=[1,self.il_length*7]
        v2d_dset.shape=[1,self.il_length*7]
        self.v1d_dset=v1d_dset
        self.v2d_dset=v2d_dset
        buy_water=np.zeros([1,7])
        buy_water[0,5]=1
        v1d_train=np.concatenate([v1d_dset,buy_water],axis=1)
        v2d_train=np.concatenate([v2d_dset,buy_water],axis=1)
        self.init_train=np.concatenate([v1d_train,v2d_train],axis=0)
        self.munch=munch_net(self.il_length).to(device)
        self.criterion=nn.MSELoss()
        learning_rate=0.01
        self.optim=torch.optim.Adam(self.munch.parameters(), lr = learning_rate,weight_decay=0.000)
        print(v1d)
        print(v2d)
        return
    def account_check(self,customer_id):
        customer_id=str(customer_id)
        v1=os.listdir(os.getcwd()+"/ml/")
        if (customer_id in v1):
            self.munch.load_state_dict(torch.load(os.getcwd()+"/ml/"+customer_id+"/net.pt"))
            return
        else:
            os.mkdir(os.getcwd()+"/ml/"+customer_id)
            self.munch=munch_net(self.il_length).to(device)
            torch.save(self.munch.state_dict(),os.getcwd()+"/ml/"+customer_id+"/net.pt")
            np.savetxt(os.getcwd()+"/ml/"+customer_id+"/history.csv",self.init_train,delimiter=',')
            return
    def recommend_predict(self,restaurant_id,customer_id):
        self.munch.zero_grad()
        self.account_check(customer_id)
        if restaurant_id==1:
            pred,train_pred=self.munch(torch.from_numpy(self.v1d_dset).to(device))
        else:
            pred,train_pred=self.munch(torch.from_numpy(self.v2d_dset).to(device))
        np_pred=train_pred.cpu().detach().numpy()
        max_num=2
        max_list=[]
        for c in range(max_num):
            max_arg=np.argmax(np_pred,axis=1)[0]
            max_list+=[max_arg+1]
            np_pred[0,max_arg]=-1
        return max_list
    def recommend_train(self,customer_id,data):
        input_data=data[:,0:self.il_length*7]
        target_data=data[:,il_length*7+7]
        torch_idata=torch.from_numpy(input_data).to(device)
        torch_tdata=torch.from_numpy(target_data).to(device)
        self.account_check(customer_id)
        iters=100
        for c in range(iters):
            self.munch.zero_grad()
            pred,train_pred=self.munch(torch_idata)
            loss=self.criterion(pred,torch_tdata)
            loss.backward()
            self.optim.step()
            if c%50==0:
                print("LOSS: "+str(loss.cpu().detach().numpy()))
        torch.save(self.munch.state_dict(),os.getcwd()+"/ml/"+customer_id+"/net.pt")
        return
    def recommend_data_science(self,restaurant_id,customer_id,order_id):
        if restaurant_id==1:
            input_vec=self.v1d_dset
        else:
            input_vec=self.v2d_dset
        target_vec=np.zeros([1,7])
        for c in range(len(order_id)):
            target_vec[0,order_id[c]-1]=1
        new_vec=np.concatenate([input_vec,target_vec],axis=1)
        #make new data
        load_data=np.genfromtxt(os.getcwd()+"/ml/"+customer_id+"/history.csv",delimiter=',')
        v0=load_data.shape
        if len(v0)==1:
            load_data.shape=[1,126]
        self.new_data=np.concatenate([load_data,new_vec],axis=0)
        np.savetxt(os.getcwd()+"/ml/"+customer_id+"/history.csv",self.new_data,delimiter=',')
        self.recommend_train(customer_id,self.new_data)
        return
if __name__=='__main__':
    rec=recommend()
    max_list=rec.recommend_predict(2,'1')
    max_list=rec.recommend_predict(2,'2')
    print(max_list)
    #train_1 first
    rec.recommend_data_science(1,'1',1)
    rec.recommend_data_science(1,'1',3)
    rec.recommend_data_science(1,'1',6)
    #train_2 next
    print(rec.recommend_predict(2,'1'))
    rec.recommend_data_science(1,'2',7)
    rec.recommend_data_science(2,'2',7)
    rec.recommend_data_science(2,'2',4)
    print(rec.recommend_predict(2,'2'))
