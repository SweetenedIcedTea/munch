import http_server
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
        pass
    def handle_menu(self,menu_id):
        with open(menu_id+".json",'r') as f:
            v1=f.read()
            print(v1)
            v0=json.loads(v1)
            f.close()
        return v0
    def send_to_rest(self, rest_id,data):
        
        return  
    def handle_order(self, json_data):
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

def main():
    backend = Backend()
    global backend
    http_server.serve_http()

if __name__ == '__main__':
    main()
