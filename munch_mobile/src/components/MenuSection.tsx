import React, { Component } from "react";
import { Section } from "../DataClasses";
import MenuItem from "./MenuItem";

interface Props {
    sectionData: Section;
}

interface State {}

export default class MenuSection extends Component<Props, State> {
    section: Section;

    constructor(props: any) {
        super(props);
        this.section = props.sectionData;
    }
    render () {
        return (
            <div>
                <h1>{this.section.name}</h1>
                <ul>
                    {this.section.foods.map(food => <MenuItem key={food.id} foodData={food}></MenuItem>)}

                </ul>
            </div>
            
        );
    }
}