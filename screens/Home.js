import * as React from 'react';
import { Text, View, Button } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";


export default class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      recuperados: []
    }
    this.removeValue = this.removeValue.bind(this);

  }

  async removeValue() {
    try {
      let keys = []
        keys = await AsyncStorage.getAllKeys()
        keys.forEach(element => {
          AsyncStorage.removeItem(element)
        });
      } catch (e) {
        console.log(e)
      }
    }

  render() {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Home!</Text>
          <Button title="REINICIAR" onPress={() => this.removeValue()} />
        </View>
      );
    }
  }