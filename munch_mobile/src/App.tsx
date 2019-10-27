import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import $ from "jquery";
import MunchServer from "./API";
import { Menu } from "./DataClasses";
import MenuPage from "./components/MenuPage";

const munch = new MunchServer("http://domainofthebones.com");

class RestaurantQR extends Component {
    scanner: any;

    constructor(props: any) {
        super(props);
    }

    async componentDidMount() {
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

interface AppState {
    stage: string;
    failedToConnect: boolean;
    activeMenu?: Menu;
}

interface AppProps {}

export default class App extends Component<AppProps, AppState> {
    constructor(props: any) {
        super(props);
        this.state = {
            stage: "scanning",
            failedToConnect: false
        };
        (window as any).onScanResolved = this.onScanResolved.bind(this);
    }

    async componentDidMount() {
        const connected = await munch.testConnection();
        if (connected) {
            this.setState({
                stage: "scanning"
            });
        } else {
            this.setState({
                failedToConnect: true
            });
        }
    }

    async onScanResolved(QRData: string) {
        this.setState({
            activeMenu: await munch.getMenu(QRData),
            stage: 'menu'
        });
        console.log(this.state.activeMenu);
        
    }

    async onCheckout(foodQty: { [foodId: string]: number }) {
        this.setState({
            stage:'thanks'
        });
        await munch.post("order", {
            "table-id": 1,
            "restaurant-id": parseInt(this.state.activeMenu!.id),
            "order": foodQty
        });
        
    }

    renderQRStage() {
        return <RestaurantQR></RestaurantQR>;
    }
    renderMenuStage() {
        const menu = this.state.activeMenu!;
        return (
            
            <MenuPage menuData={menu} onCheckout={this.onCheckout.bind(this)}></MenuPage>
        );
    }
    renderEndStage() {
        return (
            <div className="end-card">
                <h1>Thank you for eating at {this.state.activeMenu!.restaurantName}!</h1>
                <button onClick={()=>{
                    window.location.reload();
                }}>Home</button>
            </div>
        );
    }
    renderCurrentStage() {
        const stageRenderers: { [stageName: string]: Function } = {
            scanning: this.renderQRStage.bind(this),
            menu: this.renderMenuStage.bind(this),
            thanks: this.renderEndStage.bind(this)
        };
        return stageRenderers[this.state.stage]();
    }
    render() {
        return <div className="App">
            <div className="topnav">
                    <img className = "logo" src = "http://domainofthebones.com/resources/pictures/munchLogoTrans.png"></img>
                    <a onClick={()=>{
                        window.location.reload();
                    }}>Home</a>
                </div>
            {this.renderCurrentStage()}
        </div>;
    }
}

