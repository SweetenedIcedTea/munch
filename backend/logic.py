import json
from recomendation import recomend
def get_foods(menu_dict):
    food_dict={}
    for c in range(len(menu_dict['sections'])):
        for c1 in range(len(menu_dict['sections'][c]['foods'])):
            v0=menu_dict['sections'][c]['foods'][c1]
            food_dict[v0['item-id']]=v0
    return food_dict
def id2food(id,menu_dict):
    for c in range(len(menu_dict['sections'])):
        for c1 in range(len(menu_dict['sections'][c]['foods'])):
            if menu_dict['sections'][c]['foods'][c1]['item-id']==id:
                return menu_dict['sections'][c]['foods'][c1]['name']
    return 'none'
class Backend:
    def __init__(self):
        self.rest_names = {1: "Jeff's Joint", 2: "Paul's Place"}
        self.rests = {}
        self.rec=recomend()
        self.customers = {}
        self.next_customer_id = 2

    def verify_rest(self, rest_id):
        return rest_id in self.rest_names

    def register_rest(self, rest_id, queue):
        print("registering rest", rest_id)
        self.rests[rest_id] = queue

    def unregister_rest(self, rest_id):
        del self.rests[rest_id]

    def register_customer(self, name):
        customer_id = self.next_customer_id
        self.next_customer_id += 1
        self.customers[customer_id] = name
        return customer_id

    "Data has to be json text (type str)"
    def send_to_rest(self, rest_id, data):
        self.rests[rest_id].put_noawait(data)

    def handle_menu(self, menu_id, user_id):
        print("Handling menu", menu_id)
        with open(menu_id+".json",'r') as f:
            v1=f.read()
            v0=json.loads(v1)
            f.close()
        # TODO
        rec_list=self.rec.recommend_predict(menu_id,user_id)
        rec_names=[]
        for c in range(len(rec_list)):
            rec_names+=[id2food(rec_list[c],v0)]
        v0['recomendation']=rec_list
        return json.dumps(v0)

    def handle_order(self, json_data):
        print("Handling order")
        data_dict=json.loads(json_data)
        id=data_dict['restaurant-id']
        self.send_to_rest(id,json_data)
        #get restaurant-id
        customer_id=data_dict['customer-id']
        order=data_dict['order']
        self.rec.recommend_data_science(id,customer_id,order)
        #with open(data_dict['restaurant_id']+'.json','r') as f:
        #    v1=f.read()
        #    print(v1)
        #    v0=json.loads(v1)
        #get price
        #price=0
        #food_dict=get_foods(v0)
        #for c in range(len(data_dict["order"])):
        #    id=data_dict['order'][c]['item_id']            
        #    price+=food_dict[id]['price']
        return 'kys'

    def get_rest_page_html(self, rest_id):
        rest_name = self.rest_names[rest_id]
        with open('../adminwebpage/restuarantPages/restHome.html') as f:
            content = f.read()
        return content.format(rest_name = rest_name)
