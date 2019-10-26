import json

def get_foods(menu_dict):
    food_dict={}
    for c in range(len(menu_dict['sections'])):
        for c1 in range(len(menu_dict['sections'][c]['foods'])):
            v0=menu_dict['sections'][c]['foods'][c1]
            food_dict[v0['item-id']]=v0
    return food_dict

class Backend:
    def __init__(self):
        self.rests = {}

    def register_rest(self, rest_id, queue):
        print(f"registering rest {rest_id}")
        self.rests[rest_id] = queue

    def unregister_rest(self, rest_id):
        del self.rests[rest_id]

    "Data has to be json text (type str)"
    def send_to_rest(self, rest_id, data):
        self.rests[rest_id].put_noawait(data)

    def handle_menu(self,menu_id):
        print(f"Handling menu {menu_id}")
        with open(menu_id+".json",'r') as f:
            v1=f.read()
            print(v1)
            v0=json.loads(v1)
            f.close()
        return v0

    def handle_order(self, json_data):
        print("Handling order")
        data_dict=json.loads(json_data)
        id=data_dict['restaurant-id']
        self.send_to_rest(id,json_data)
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

