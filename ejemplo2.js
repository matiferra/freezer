import React , {useState} from 'react';
import { StyleSheet, Text, View , Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function App() {
  const [data , setdata] = useState("");
  const add = async ()=>{
    try {
      await AsyncStorage.setItem('gfg', "GeeksforGeeks")
    }
    catch (e){
      console.error(e);
    }
  }
  
  const get = async () => {
    try {
      const value = await AsyncStorage.getItem('gfg')
      if(value !== null) {
          setdata(value);
      }
    }  catch (e){
      console.error(e);
    }
  }
  return (
    <View style={styles.container}>
        <Text style={styles.text}>{data}</Text>
        <View style={styles.button} >
          <Button
            title={"add"}
            onPress={add}
          />
        </View>
        <View style={styles.button} >
          <Button
            title={"get"}
            onPress={get}
          />
        </View>
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
  text : {
    fontSize : 40,
    marginBottom : 30
  },
  button : {
    margin:20,
    width:250
  }
});