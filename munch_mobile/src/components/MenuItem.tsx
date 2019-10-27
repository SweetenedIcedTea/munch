import React, { Component } from "react";
import { FoodItem } from "../DataClasses";

interface Props {
    foodData: FoodItem;
}

interface State {}

export default class MenuItem extends Component<Props, State> {
    food: FoodItem;
    constructor(props: any) {
        super(props);
        this.food = props.foodData as FoodItem;
    }
    render() {
        return (
            <span className="meal-box">
                <img src="stulin.png" className="meal-thumb"></img>
                <div className="meal-info">
                    <h2>{this.food.name}</h2>
                    <br></br>
                    <p className="meal-desc">{this.food.description}</p>
                    <p className="price-tag">{this.food.price}</p>
                    <p className="ingredients">{this.food.ingredients.join(', ')}</p>
                </div>
                
            </span>
        );
    }
}
