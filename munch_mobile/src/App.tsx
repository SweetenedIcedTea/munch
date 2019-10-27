import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import $ from "jquery";
import MunchServer from "./API";

const munch = new MunchServer("http://domainofthebones.com");



class RestaurantQR extends Component {
    scanner: any;

    constructor(props: any) {
        super(props);
    }

    async componentDidMount() {
        (window as any).startScanner();
        console.log(await munch.getMenu("1"));
        (window as any).onDecode = this.onDecode;
    }

    render() {
        return (
            <div className="qr-box">
                <video id="qr-preview"></video>
                <p>Scan your restaurant's QR code!</p>
            </div>
        );
    }

    onDecode(data: string) {
        console.log(data);
    }
}

export default class App extends Component {
    constructor(props: any) {
        super(props);
        this.state = {
            stage: 'connecting',
            failedToConnect: false
        };
    }

    async componentDidMount() {
        const connected = await munch.testConnection();
        if (connected) {
            this.setState({
                stage: 'scanning'
            });
        } else {
            this.setState({
                failedToConnect: true
            });
        }
    }

    renderQRStage() {
        return <RestaurantQR></RestaurantQR>;
    }
    renderConnectingStage() {
        return (
            <div>
                <p>{(this.state as any).failedToConnect ? "Failed to connect to server. Go yell at Mark or something" : "Connecting..."}</p>
            </div>
        );
    }
    renderCurrentStage() {
        const stageRenderers: { [stageName: string]: Function } = {
            connecting: this.renderConnectingStage.bind(this),
            scanning: this.renderQRStage.bind(this)
        };
        return stageRenderers[(this.state as any).stage]();
    }
    render() {
        return <div className="App">{this.renderCurrentStage()}</div>;
    }
}
