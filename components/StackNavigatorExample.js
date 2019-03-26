import React, { Component } from 'react';
import { Button, Text, View, TouchableHighlight, StyleSheet, AsyncStorage } from 'react-native'
import TabNavigationExample from './TabNavigationExample';

import { Entypo } from '@expo/vector-icons'
import {
    createStackNavigator,
    createAppContainer
} from 'react-navigation';

// **********************************************************
//Don't forget to run on commnad prompt and restart you app
//
//      $ npm install react-navigation --save 
//
// **********************************************************


class HomeScreen extends Component {
    state = {
        hellow: [],
    }
    componentDidMount() {
        AsyncStorage.getAllKeys()
                .then(v =>{
                    AsyncStorage.multiGet((v), (err,data)=>{
                        if(!err){
                            let hellow = [];
                            data.map((rec)=>hellow.push({name: rec[0],
                                cards: JSON.parse(rec[1])}));
                            this.setState({hellow,})
                        }
                    })
                })
    }
    componentDidUpdate(prevProps, prevState) {
        AsyncStorage.getAllKeys()
                .then(v =>{
                    AsyncStorage.multiGet((v), (err,data)=>{
                        if(!err){
                            let hellow = [];
                            data.map((rec)=>hellow.push({name: rec[0],
                                cards: JSON.parse(rec[1])}));
                            this.setState({hellow,})
                        }
                    })
                })
    }
    render(){
        return(
        <View style={{flex: 1, width: 350, justifyContent: 'center' }}>
            {
                this.state.hellow.length>=1?this.state.hellow.map((data, index) =>
                    <View key={index} style={{borderBottomColor: 'black', borderBottomWidth: 1,paddingBottom: 10, paddingTop: 10}}>
                        <Text style={{textAlign: 'center', fontSize: 40}}>{data.name}</Text>
                        <Text style={{textAlign: 'center', fontSize: 20}}>{data.cards.length} cards</Text>
                    </View>
            ):<Text>Nothing</Text>
            }
        </View>
        );
    }
}





class ContactUs extends Component {
    
    render() {
        return (
            <TabNavigationExample />
        );
    }
}

class AboutUs extends Component {
    render() {
        const navigation = this.props.navigation
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ color: 'blue', fontSize: 35 }}>
                    This is AboutUs screen
               </Text>


                <TouchableHighlight
                    style={[{ backgroundColor: 'navy', }, styles.button]}
                    onPress={() => navigation.navigate('Contact')}
                >
                    <Text style={{ fontSize: 20, color: 'white' }}>
                        Contact Us
                    </Text>
                </TouchableHighlight>


            </View>
        );
    }
}


const StackNavigatorExample = createStackNavigator(
    {
        Home: {
            screen: HomeScreen,
            params: { username: 'aamir' },
            navigationOptions: {
                header: null,
            }
        },
        About: {
            screen: AboutUs,
            navigationOptions: {
                title: "ABOUT US",
                headerBackImage: () => <Entypo name='back' size={30} color="blue" />,
            }
        },
        Contact: {
            screen: ContactUs,
            navigationOptions: {
                title: "CONTACT US",
                headerStyle: {height: 0}                
            },
        },
    },
    {
        //*****************************************************************
        // further properties are listed on the following link
        //https://reactnavigation.org/docs/en/stack-navigator.html
        //*****************************************************************
        initialRouteName: "Home",
    },


);

const styles = StyleSheet.create({
    button: {
        width: 120,
        margin: 20,
        borderWidth: 2,
        borderRadius: 8,
        alignItems: 'center',
    }
})
export default StackNavigationExample = createAppContainer(StackNavigatorExample);