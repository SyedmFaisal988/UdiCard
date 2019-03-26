import React, { Component } from 'react';
import { Button, Text, View, TouchableHighlight, StyleSheet, AsyncStorage } from 'react-native'

import { Entypo } from '@expo/vector-icons'
import {
    createStackNavigator,
    createAppContainer
} from 'react-navigation';

import Quiz from './Quiz';
import DeckList from './DeckList';
import DeckView from './DeckView';
import AddCard from './AddCard';

// **********************************************************
//Don't forget to run on commnad prompt and restart you app
//
//      $ npm install react-navigation --save 
//
// **********************************************************




const StackNavigatorExample = createStackNavigator(
    {
        DeckList: {
            screen: DeckList,
            params: { username: 'aamir' },
            navigationOptions: {
                header: null,
            }
        },
        DeckView: {
            screen: DeckView,
            navigationOptions: {
                header: null,
                title: "ABOUT US",
                headerBackImage: () => <Entypo name='back' size={30} color="blue" />,
            }
        },
        Quiz: {
            screen: Quiz,
            navigationOptions: {
                title: "CONTACT US",
                header: null,
            },
        },
        AddCard: {
            screen: AddCard,
            navigationOptions:{
                header: null,
            }
        }
    },
    {
        //*****************************************************************
        // further properties are listed on the following link
        //https://reactnavigation.org/docs/en/stack-navigator.html
        //*****************************************************************
        initialRouteName: "DeckList",
    },


);
export default StackNavigationExample = createAppContainer(StackNavigatorExample);