import numpy as np
import torch
from torch.autograd import Variable
import torch.nn as nn
import torch.nn.functional as F
device = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")
class munch_net(nn.Module):
    def __init__(self,food_param_num):
        super(munch_net,self).__init__()
        self.r1_food_num=7
        self.r2_food_num=7
        self.food_param_num=food_param_num
        self.input_size=self.r1_food_num*self.food_param_num
        self.context_size=100
        self.munch_net_1=nn.Linear(self.input_size,self.context_size)
        self.munch_net_2_r1=nn.Linear(self.context_size,self.r1_food_num)
        self.munch_net_2_r2=nn.Linear(self.context_size,self.r2_food_num)
        return
    def forward(self,input_mat):
        v0=F.relu(self.munch_net_1(input_mat))
        v1_r1=F.relu(self.munch_net_2_r1(v0))
        #make sigmoid train
        train_r1=F.sigmoid(self.munch_net_2_r1(v0))
        return v1_r1,train_r1
if __name__=='__main__':
    munch=munch_net()
    torch.save(munch.state_dict(),'v1d.pt')
    munch=munch_net()
    torch.save(munch.state_dict(),'v2d.pt')