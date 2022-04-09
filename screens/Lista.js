import * as React from 'react';
import { Text, View, Button, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";


const productos = [
  "frutas",
  "verduras",
];

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

  async getData(producto) {
    try {
      let value = await AsyncStorage.getItem(producto)
      if (value != null) {
        return value
      }
    } catch (e) {
      console.log(e)
    }
  }

  componentDidMount() {
    console.log("recargado")
  }

  recolectar() {
    if (this.state.cargando) {
      productos.forEach(element => {
        this.getData(element)
          .then((value) => {
            if(value != null){
              this.setState(
                prevState => ({
                  recuperados: [value, ...prevState.recuperados],
                  cargando: false
                }))
            }
          })
      })
    }
  }

  renderProductos() {
    return (
      <ScrollView>
        {this.state.recuperados.map((producto) => {
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