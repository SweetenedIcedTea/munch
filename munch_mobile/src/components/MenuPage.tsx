import React, { Component } from "react";
import { FoodItem, Menu } from "../DataClasses";
import MenuSection from "./MenuSection";

interface Props {
    menuData: Menu;
    
}

interface State {
    foodQty: { [foodName: string]: number };
}

export default class MenuPage extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        const foodQty: { [foodName: string]: number } = {};
        for (const section of this.props.menuData.sections) {
            for (const food of section.foods) {
                foodQty[food.name] = 0;
            }
        }

        this.state = {
            foodQty: foodQty
        };
    }
    hasOrderedAnything() {
        for (const foodName in this.state.foodQty) {
            const qty = this.state.foodQty[foodName];
            if (qty != 0) {
                return false;
            }
        }
        return true;
    }
    render() {
        return (
            <div>
                <h1>Menu</h1>

                <ul>
                    {this.props.menuData.sections.map(section => (
                        <MenuSection
                            key={section.name}
                            sectionData={section}
                        ></MenuSection>
                    ))}
                </ul>
            </div>
        );
    }
}
