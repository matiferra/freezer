import * as React from 'react';
import { Text, View, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";



const productos = [
  "frutas",
  "verduras",
];

export default class SettingsScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      recuperados: []
    }
    this.renderProductos = this.renderProductos.bind(this);

  }

  async storeData(key, value) {
    try {
      await AsyncStorage.setItem(key, value)
      if (value !== null) {
        //console.log(value)
      } else {
        console.log("STORAGE nada")
      }
    } catch (e) {
      // saving error
    }
  }

  renderProductos() {
    return (
      <ScrollView>
        {productos.map((producto) => {
          return (
            <View key={Math.random()} style={styles.container}>
              <TouchableOpacity
                key={Math.random()}
                style={styles.button}
                color="#4A88E1">
                <Text key={Math.random()} style={styles.buttonText}></Text>
                <Button title={producto} onPress={() => this.storeData(producto, producto)} />
              </TouchableOpacity>
            </View>
          );
        })
        }
      </ScrollView>
    );
  }




  /*render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

        <Text>
          {this.state.recuperados}
        </Text>

        <TextInput
          placeholder="Enter Your Nickname"
          style={styles.textInput}
          onChangeText={(value) => this.setState({ actual: value })}
        />
        <Button title="Save" onPress={() => this.storeData(this.state.actual)} />
      </View>
    );
  }*/

  render() {
    return (
      this.renderProductos()
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