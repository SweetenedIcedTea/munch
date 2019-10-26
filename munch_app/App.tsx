import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MunchServer from './API';

var munch = new MunchServer('http://domainofthebones.com');

interface ITestState {
  connected: boolean
}

interface ITestProps {}

class Test extends Component<ITestProps, ITestState> {
  constructor (props) {
    super(props);
    this.state = {
      'connected': false
    };
    munch.post("echo", "Echo!").then((value)=>{
      if (value == "Echo!") {
        this.setState({
          'connected': true
        });
      }
      
    });
  }
  render () {
    return <Text>{this.state.connected ? "Connected" : "Connecting..."}</Text>
  }
}

export default function App() {
  return (
    <View style={styles.container}>
      <Test></Test>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
