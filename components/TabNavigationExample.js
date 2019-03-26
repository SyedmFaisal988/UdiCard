import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    TextInput,
    TouchableHighlight,
    AsyncStorage,
    Switch,
} from 'react-native'


import { Feather } from '@expo/vector-icons'
import {
    createMaterialTopTabNavigator,
    createBottomTabNavigator,
    createAppContainer
} from 'react-navigation';
import StackNavigatorExample from './StackNavigatorExample';
import AddDeck from './AddDeck';
import AddCard from './AddCard';

// **********************************************************
//Don't forget to run on commnad prompt and restart you app
//
//      $ npm install react-navigation --save 
//
// **********************************************************

class Deck extends Component{
    render(){
        return(
            <View style={{flex: 1, width: 350}}>  
                <StackNavigatorExample />
            </View>
        );
    }
}

class NewDeck extends Component{
    state = {
        title: "",
        questions: [],
        view: 0,
        tempQuestion: "",
        tempAnswer1: "",
        tempAnswer2: "",
        tempAnswer: 2,
        switch1: false,
        switch2: false,
    }
    changeTitle = (text, view)=>{
        this.setState({
            title: text,
            view,
        })
    }
    
    render(){
        const {navigation} = this.props;
        return(
            this.state.view===0?
            <AddDeck changeTitle={this.changeTitle} />
            :
            <AddCard changeTitle={this.changeTitle} navigation={navigation} title={this.state.title} questions={this.state.questions} />
        )
    }
}


//***************************************************/
// Options to try below are createBottomTabNavigator 
// and createMaterialTopTabNavigator
//***************************************************/


const TabNavigator = createMaterialTopTabNavigator(
    {
        Deck: {
            screen: Deck,
            navigationOptions: {
                tabBarIcon: () => <Feather name='home' size={25} color="white" />
            }
        },
        NewDeck: {
            screen: NewDeck,
            navigationOptions: {
                tabBarIcon: () => <Feather name='info' size={25} color="white" />,
            }
        },
    },
    {
        //*****************************************************************
        // further properties are listed on the following link
        //https://reactnavigation.org/docs/en/material-top-tab-navigator.html
        //*****************************************************************
        initialRouteName: "Deck",
        // change following with top / bottom
        tabBarPosition: 'top',
        tabBarOptions: {
            showIcon: true,
            labelStyle: {
                fontSize: 14,
                color: 'white',
            },
            tabStyle: {
                //here you can give code for styling tabs

            },
            style: {
                backgroundColor: 'black',
                paddingTop: 20,
            },
            indicatorStyle: {
                backgroundColor: 'orange',
            }
        },
        order: ['Deck', 'NewDeck'],
    },


);


export default TabNavigationExample = createAppContainer(TabNavigator);