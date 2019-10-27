import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import $ from "jquery";
import MunchServer from './API';

const munch = new MunchServer('http://domainofthebones.com');


class RestaurantQR extends Component {
  scanner: any

  constructor(props: any) {  
    super(props);
  }

  async componentDidMount () {
    console.log(await munch.testConnection());
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

const App: React.FC = () => {
  return (
    <div className="App">
      <RestaurantQR></RestaurantQR>
    </div>
  );
}

export default App;
