import * as React from "react";
import { Text, View, TextInput, StyleSheet, Button } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      actual: "",
      recuperados: ""
    }
  }

  async storeData(value) {
    try {
      await AsyncStorage.setItem('hola', JSON.stringify(value))
      if (value !== null) {
      console.log(value)
      } else {
        console.log("STORAGE nada")
      }
    } catch (e) {
      // saving error
    }
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

        <Text>
          {this.state.recuperados}
        </Text>

        <TextInput
          placeholder="Enter Your Nickname"
          style={styles.textInput}
          onChangeText = {(value) => this.setState({actual: value}) }
        />
        <Button title="Save" onPress={() => this.storeData(this.state.actual)} />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  textInput: {
    width: 300,
    marginVertical: 30,
    padding: 10,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 50,
  }
}); 