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
            <div className="meal-box">
                <img src="stulin.png" className="meal-thumb"></img>
            </div>
        );
    }
}
