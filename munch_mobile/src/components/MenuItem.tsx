import React, { Component } from "react";
import { FoodItem } from "../DataClasses";

interface Props {
    foodData: FoodItem;
    quantities: { [foodId: string]: number };
    onIncrement: Function;
}

interface State {}

export default class MenuItem extends Component<Props, State> {
    food: FoodItem;
    constructor(props: Props) {
        super(props);
        this.food = props.foodData as FoodItem;
    }
    render() {
        return (
            <span className="meal-box">
                <img src={"http://domainofthebones.com/resources/food_thumbs/"+this.food.image} className="meal-thumb"></img>
                <div className="meal-info">
                    <h2>{this.food.name}</h2>
                    <br></br>
                    <p className="meal-desc">{this.food.description}</p>
                    <p className="price-tag">{this.food.price}</p>
                    <i>
                        <p className="ingredients">
                            Ingredients: {this.food.ingredients.join(", ")}
                        </p>
                    </i>
                    <span className="order-input">
                        <button onClick={()=>{
                            this.props.onIncrement(this.food.id, 1)
                        }}>+</button>
                        <button disabled={this.props.quantities[this.food.id] == 0} onClick={()=>{
                            this.props.onIncrement(this.food.id, -1)
                        }}>-</button>
                        <p className="order-input-quantity">Quantity: {this.props.quantities[this.food.id]}</p>
                    </span>
                </div>
            </span>
        );
    }
}
