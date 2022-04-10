import React from 'react';
import { Text, View, TextInput, Button, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Accordion } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { List } from 'react-native-paper';

import AsyncStorage from "@react-native-async-storage/async-storage";
import productos from '../keys';



export default class SettingsScreen extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      recuperados: [],
      productos: [
        {
          nombre: "frutas",
          value: false,
          lista: [
            'manzanas',
            'peras'
          ],
        },
        {
          nombre: "verduras",
          value: false,
          lista: [
            'tomates',
            'zapallos'
          ],
        },
      ]
    }
    this.renderProductos = this.renderProductos.bind(this);
    this.renderAcordion = this.renderAcordion.bind(this);
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

  _handlePress = (nombre) => {
    const { productos: oldProductos } = this.state;
    const productos = oldProductos.map(p => {
      if (p.nombre === nombre) {
        p.value = !p.value;
      } else {
        p.value = false;
      }
      return p;
    });
    this.setState({
      productos: productos,
    });
  }

  renderProductos() {
    return (
      <View>
        {productos.map((producto) => {
          return (
            <View key={Math.random()} style={styles.textInput}>
              <TouchableOpacity
                key={Math.random()}
              >
                <Text
                  style={styles.text}
                >
                  {producto}
                  <Icon
                    key={Math.random()}
                    name="add-circle-outline"
                    size={50}
                    color="green"
                    onPress={() => this.storeData(producto, producto)}
                  >
                  </Icon>
                </Text>
              </TouchableOpacity>
            </View>
          );
        })
        }
      </View>
    );
  }

  renderAcordion() {
    let contador = 0;
    return (
      <View>
        <List.Section title="Productos">
          {

            this.state.productos.map((producto) => {
              return (
                <List.Accordion
                  title="Controlled Accordion"
                  left={props => <List.Icon icon="fruit-cherries" />}
                  expanded={producto.value}
                  onPress={() => this._handlePress(producto.nombre)}
                >
                  <View>
                    {producto.lista.map((cosa) => {
                      contador++
                      return (
                        <List.Item title={cosa}
                          onPress={() => this.storeData(producto.nombre.concat(contador), cosa)}
                        />
                      )
                    })}
                  </View>
                </List.Accordion>
              )
            })}
        </List.Section>
      </View >
    )
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        {this.renderAcordion()}
      </SafeAreaView>

    );
  }

}



const styles = StyleSheet.create({
  textInput: {
    width: 300,
    marginVertical: 10,
    justifyContent: 'center',
    padding: 10,
  },
  text: {
    fontSize: 27
  },
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
    alignItems: 'flex-start',
    borderWidth: 1,
    borderRadius: 50,
    backgroundColor: 'rgba( 234, 249, 249, 0.6)'
  },
  buttonText: {
    textAlign: 'center',
    padding: 20,
    color: '#cfdfff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  content: {
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#F5FCFF',
    padding: 10,
  },
  headerText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
}); 