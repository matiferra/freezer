import * as React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from './screens/Home';
import SettingsScreen from './screens/Settings';
import ListScreen from './screens/Lista';

const Tab = createBottomTabNavigator();

export default class App extends React.Component {

  render() {
    return (
      <NavigationContainer>
        <Tab.Navigator

          initialRouteName="Settings"
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = focused
                  ? 'home'
                  : 'home-outline';
              } else if (route.name === 'Heladera') {
                iconName = focused ? 'snow' : 'snow-outline';
              } else if (route.name === 'Settings') {
                iconName = focused ? 'cart' : 'cart-outline';
              }

              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
          })}
        >
          <Tab.Screen
            options={{ unmountOnBlur: true }}
            name="Heladera" component={ListScreen} />

          <Tab.Screen
            options={{ unmountOnBlur: true }}
            name="Home" component={HomeScreen} />

          <Tab.Screen
            name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}