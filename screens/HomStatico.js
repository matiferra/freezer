import * as React from "react";
import { Text, View, TextInput,StyleSheet,Button } from 'react-native';

//Esto es solo para simular el método original (No es asincrónico), puedes ignorar esta primera parte.
const AsyncStorage = (() => {
  let data = {};

  function getItem(key) {
    return data[key];
  }

  function setItem(key, value) {
    console.log(`Se ha guardadlo la llave ${key} con el valor: ${value}`);
    data[key] = value;
  }

  return {
    getItem: getItem,
    setItem: setItem
  }

})();


const automotores = [{
  reparaciones: [{
    fecha: "15/04/21",
    detalles: {
      nombre: "Alberto",
      marca: "Ford",
      modelo: "Mondeo",
      kilometraje: "28456",
      telefono: "12345678"
    },
    observaciones: "Amortiguadores"
  }],
  detalles: "Turnos por la mañana"
}];

const nuevaCarga = {
  fecha: "19/04/21",
  detalles: {
    nombre: "Micaela",
    marca: "Volkswagen",
    modelo: "Vento",
    kilometraje: "17234",
    telefono: "87654321"
  },
  observaciones: "Tapizado"
};

//Guardamos la llave con los valores iniciales
AsyncStorage.setItem("Taller", JSON.stringify(automotores[0]));

//Ahora seguimos los pasos descritos

//1.Obtenemos el valor de la llave y 2. lo paresamos y lo guardamos en una variable (Recuerda usar el await en tu código, el ejemplo que cree no es asincrónico)

const valorTaller = JSON.parse(AsyncStorage.getItem("Taller"));

//3. Acccedemos el array de la variable y 4.le agregamos el nuevo elemento con el método push

valorTaller.reparaciones.push(nuevaCarga);

//Podemos revisar que efectivamente se haya guardado el nuevo valor en el objeto por medio de un console.log:
console.log(valorTaller);

//5.Guardamos el elemento nuevamente con el método que usamos al inicio
AsyncStorage.setItem("Taller", JSON.stringify(valorTaller));
 
export default class HomeScreen extends React.Component {

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>{nuevaCarga.detalles.nombre}</Text>

        <TextInput
                placeholder="Enter Your Nickname"
                style={styles.textInput}
            />
        <Button title="Save" onPress={AsyncStorage.setItem(nuevaCarga.detalles.nombre, JSON.stringify(nuevaCarga.detalles.nombre))} />
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