import * as React from 'react';
import { Text, View, Button, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import productos from '../keys';

export default class ListScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      recuperados: [],
      cargando: true
    }

    this.renderProductos = this.renderProductos.bind(this);
    this.recolectar = this.recolectar.bind(this);
  }

  async getKeys() {
    try {
      let keys = await AsyncStorage.getAllKeys()
      if (keys != null) {
        return keys
      }
    } catch (e) {
      console.log(e)
    }
  }

  async getData(producto) {
    let productos = []
    try {
      getKeys().then((keys) => {
        keys.forEach(element => {
          let data = await AsyncStorage.getItem(JSON.stringify(element))
          productos.push(data)
        });
      })
      if (productos != null) {
        console.log(productos)
        //return value
      }
    } catch (e) {
      console.log(e)
    }
  }

  componentDidMount() {
    console.log("recargado")
  }

  /*
prevState => ({
  recuperados: [value, ...prevState.recuperados],
  cargando: false
*/
  recolectar() {
    if (this.state.cargando) {
      this.getData()
        .then((data) => {
          if (data != null) {
            this.setState({
              recuperados: data,
            })
          }
        })
    }
  }

  renderProductos() {
    console.log(this.state.recuperados)
    return (
      <ScrollView>
        {
          this.state.recuperados.map((producto) => {
            return (
              <View key={Math.random()} style={styles.container}>
                <TouchableOpacity
                  key={Math.random()}
                  style={styles.button}
                  color="#4A88E1">
                  <Text key={Math.random()} style={styles.buttonText}>{producto}</Text>
                </TouchableOpacity>
              </View>
            );
          })
        }
      </ScrollView>
    );
  }

  render() {
    if (this.state.cargando) {
      return (
        <Text> CARGANDO {this.recolectar()} </Text>
      );
    } else {
      return (
        this.renderProductos()
      );
    }
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
        <ScrollView>
          {this.renderProductos()}
        </ScrollView >
      </View >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 5,
    alignItems: 'center',
  },
  background: {
    width: '100%',
    height: '100%'
  },
  button: {
    margin: 7,
    width: 260,
    alignItems: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.6)'
  },
  buttonText: {
    textAlign: 'center',
    padding: 20,
    color: '#cfdfff',
    fontWeight: 'bold',
    fontSize: 15,
  }
});