export class Menu {
    id: string = "";
    sections: Section[] = [];
    recommended: string[] = [];
    restaurantName: string = "";

    static fromJSON(data: any): Menu {
        const r = new Menu();
        r.id = data["restaurant-id"].toString();
        r.sections = data["sections"].map((sectionJSON: any) =>
            Section.fromJSON(sectionJSON)
        );
        r.recommended = data["recomendation"].map((numid:any) => numid.toString());
        r.restaurantName = data["name"];
        return r;
    }
}

export class Section {
    name: string = "";
    foods: FoodItem[] = [];

    static fromJSON(data: any): Section {
        const s = new Section();
        s.name = data["section-name"];
        s.foods = data["foods"].map((foodJSON: any) =>
            FoodItem.fromJSON(foodJSON)
        );
        return s;
    }
}

export class FoodItem {
    id: string = "";
    name: string = "";
    price: number = 0;
    ingredients: string[] = [];
    description: string = "";
    image: string = "";

    static fromJSON(data: any): FoodItem {
        const f = new FoodItem();
        f.id = data["item-id"].toString();
        f.name = data["name"];
        f.price = data["price"];
        f.ingredients = data["ingredients"];
        f.description = data["description"];
        f.image = data["image"];
        return f;
    }
}
