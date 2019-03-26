import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import TabNavigationExample from './components/TabNavigationExample';
import { createMaterialTopTabNavigator,createAppContainer } from 'react-navigation';
//import StackNavigatorExample from './components/StackNavigatorExample';

export default class App extends Component {
  render() {  
    return (
      <TabNavigationExample />
    );
  }
}

// createAppContainer(createMaterialTopTabNavigator({
//   Home: { screen: HomeScr},
//   About: { screen: AboutUs },
// }));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});