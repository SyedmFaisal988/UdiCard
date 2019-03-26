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
        <View style={{flex: 1, justifyContent: 'center' }}>
            {
                this.state.hellow.length>=1?this.state.hellow.map((data, index) =>
                    <View key={index} style={{borderBottomColor: 'black', borderBottomWidth: 1,paddingBottom: 10, paddingTop: 10}}>
                        <TouchableHighlight 
                            onPress={()=>this.props.navigation.navigate('About', {data,})} >
                            <Text style={{textAlign: 'center', fontSize: 40,}}>{data.name}</Text>
                        </TouchableHighlight>
                        <TouchableHighlight>
                            <Text style={{textAlign: 'center', fontSize: 20, color: 'grey'}}>{data.cards.length} cards</Text>
                        </TouchableHighlight>
                    </View>
            ):<Text>Nothing</Text>
            }
        </View>
        );
    }
}





class ContactUs extends Component {
    state = {
        quest: 0
    }
    render() {
        const  data  = this.props.navigation.getParam('data');
        const { quest } = this.state;
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 50, textAlign: "center"}}>
                    {data.cards[quest].question}
                </Text>
            </View>
        );
    }
}

class AboutUs extends Component {
    render() {
        const data = this.props.navigation.getParam('data');
        const navigation = this.props.navigation
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingLeft: 10, paddingRight: 10 }}>
                <Text style={{ fontSize: 50, }}>
                    {data.name}
               </Text>
               <Text style={{ fontSize: 30, color: 'grey',}}>
                    {data.cards.length} cards 
               </Text>


                <TouchableHighlight
                    style={[{ backgroundColor: 'black', }, styles.button]}
                    onPress={() => navigation.navigate('Contact', {data,})}
                >
                    <Text style={{ fontSize: 20, color: 'white' }}>
                        Start Quiz
                    </Text>
                </TouchableHighlight>

                <TouchableHighlight style={[styles.button,{marginTop: 5}]}
                    onPress={()=>this.props.navigation.goBack()}>
                    <Text style={{fontSize: 20}}>
                        Go Back
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
                header: null,
                title: "ABOUT US",
                headerBackImage: () => <Entypo name='back' size={30} color="blue" />,
            }
        },
        Contact: {
            screen: ContactUs,
            navigationOptions: {
                title: "CONTACT US",
                header: null,
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
        width: 150,
        marginTop: 20,
        paddingTop: 10,
        paddingBottom: 10,
        borderWidth: 2,
        borderRadius: 8,
        alignItems: 'center',
    }
})
export default StackNavigationExample = createAppContainer(StackNavigatorExample);