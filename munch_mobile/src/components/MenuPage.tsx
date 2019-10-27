import React, { Component } from "react";
import { FoodItem, Menu, Section } from "../DataClasses";
import MenuItem from "./MenuItem";

interface Props {
    menuData: Menu;
    onCheckout: Function;
}

interface State {
    foodQty: { [foodId: string]: number };
}

export default class MenuPage extends Component<Props, State> {
    idTable: { [foodId: string]: string } = {};
    priceTable: { [foodId: string]: number } = {};
    constructor(props: Props) {
        super(props);

        const foodQty: { [foodId: string]: number } = {};

        for (const section of this.props.menuData.sections) {
            for (const food of section.foods) {
                foodQty[food.id] = 0;
                this.idTable[food.id] = food.name;
                this.priceTable[food.id] = food.price;
            }
        }
        console.log(foodQty);
        this.state = {
            foodQty: foodQty
        };
    }
    hasOrderedAnything() {
        for (const foodId in this.state.foodQty) {
            const qty = this.state.foodQty[foodId];
            if (qty != 0) {
                return true;
            }
        }
        return false;
    }

    onIncrement(id: string, by: number) {
        const foodQty: { [foodId: string]: number } = {};

        for (const foodId in this.state.foodQty) {
            foodQty[foodId] =
                this.state.foodQty[foodId] + (id == foodId ? 1 : 0)*by;
        }

        this.setState({
            foodQty: foodQty
        });
    }

    renderSection(section: Section) {
        return (
            <div key={section.name}>
                <h1>{section.name}</h1>
                <ul>
                    {section.foods.map(food => (
                        <MenuItem
                            key={food.id}
                            foodData={food}
                            quantities={this.state.foodQty}
                            onIncrement={this.onIncrement.bind(this)}
                        ></MenuItem>
                    ))}
                </ul>
            </div>
        );
    }

    getTotalOrderCost() {
        var cost = 0;
        for (const foodId in this.state.foodQty) {
            const qty = this.state.foodQty[foodId];
            const price = this.priceTable[foodId];

            cost+=qty*price;
        }
        return Number(cost).toFixed(2);
    }

    renderBreakdown() {
        // the only breakdown is the one im having rn
        const listItems: JSX.Element[] = [];
        for (const foodId in this.state.foodQty) {
            const qty = this.state.foodQty[foodId];

            if (qty != 0) {
                listItems.push(
                    <span key={foodId} className="breakdown-row">
                        <p className="breakdown-name">{this.idTable[foodId]}</p>
                        <p className="breakdown-qty">x{qty}</p>
                    </span>
                );
            }
        }
        return (
            <div className="order-summary">
                <h2>Your order</h2>
                <ul>{listItems}</ul>
                <h3>Total: {this.getTotalOrderCost()}</h3>
                <button onClick={()=>{this.props.onCheckout(this.state.foodQty)}}>Checkout</button>
            </div>
           
        );
    }

    render() {
        return (
            <div>
                {this.hasOrderedAnything() ? this.renderBreakdown() : null}
                <h1 className="title">Menu for {this.props.menuData.restaurantName}</h1>
                <ul>
                    {this.props.menuData.sections.map(
                        this.renderSection.bind(this)
                    )}
                </ul>
                <div className="recommended">
                    <h2>Recommended for you by our top-notch AI:</h2>
                    <p>{this.props.menuData.recommended.map(foodId => this.idTable[foodId]).join(", ")}</p>
                </div>
                
            </div>
        );
    }
}
