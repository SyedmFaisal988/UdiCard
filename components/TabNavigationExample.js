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
    render(){
        return(
            <View style={{flex:1}}>
                <AddDeck navigation={this.props.navigation} />
            </View>
        )
    }
}

class AddDeck extends Component{
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
    addNextHandler=()=>{
        const { tempQuestion, tempAnswer, tempAnswer1, tempAnswer2 } = this.state;
        const state = this.state;
        state.questions.push({question: tempQuestion,answer: tempAnswer, option1: tempAnswer1, option2: tempAnswer2})
        state.tempAnswer = 2;
        state.tempAnswer1 = "";
        state.tempAnswer2 = "";
        state.tempQuestion = "";
        this.setState({...state});
    }
    render(){
        const { navigate } = this.props.navigation;
        return(
            this.state.view===0?
            <View style={styles.container}>
                <Text style={styles.add_deck}>
                    Add A new Deck to list
                </Text>
                <Text>
                    {this.state.title}
                </Text>
                <TextInput style={{ width: 340, borderWidth: 1, borderColor:'black', paddingLeft: 10 ,borderRadius: 10,}}
                    placeholder="Deck Title"
                    value={this.state.title}
                    onChangeText={(text)=>this.setState({title: text})} />
                <TouchableHighlight style={{backgroundColor: 'black', marginTop: 20, width: 120, height: 45, justifyContent: 'center', alignItems: 'center', borderRadius: 7, }}
                   onPress={()=>this.setState({view: 1})}>
                    <Text style={{color: 'white', fontSize: 20,}}>
                        Submit
                    </Text>
                </TouchableHighlight>


                    {/* this button is to be deleted in final version */}
                <TouchableHighlight onPress={()=>{AsyncStorage.getAllKeys()
                .then(v=>AsyncStorage.multiRemove(v))}} >
                    <Text>
                        Delete All data
                    </Text>
                </TouchableHighlight>
            </View>:
            <View style={[styles.container, {paddingRight: 20, paddingLeft: 20, flexDirection: 'column'}]}>
                <Text style={{fontSize: 27, alignSelf: 'flex-start'}}>
                    Add Cards to Deck: {this.state.title}
                </Text>
                <Text style={{fontSize: 15, alignSelf: 'flex-start' }}>
                    Question
                </Text>
                <View style={{flexDirection: 'row'}}>
                <TextInput style={{  flex: 1 ,borderWidth: 1, borderColor:'black', borderRadius: 7, paddingLeft: 10}}
                    placeholder="Enter Question"
                    onChangeText={(text)=>this.setState({tempQuestion: text})}
                    value={this.state.tempQuestion} />
                </View>
                
                <Text style={{fontSize: 15, alignSelf:'flex-start'}}>
                    Answer 1
                </Text>
                <View style={{flexDirection: 'row'}}>
                <TextInput style={{ flex: 1 ,borderWidth: 1, borderColor:'black', borderRadius: 7, paddingLeft: 10}}
                    placeholder="Enter Answer"
                    onChangeText={(text)=>this.setState({tempAnswer1: text})}
                    value={this.state.tempAnswer1} />
                    <Switch
                     value={this.state.switch1}
                     onValueChange={()=>this.setState((prevState)=>({
                        switch1: !prevState.switch1,
                        tempAnswer: prevState.tempAnswer===0?1:0,
                     }))}
                      />
                </View>

                <Text style={{fontSize: 15, alignSelf:'flex-start'}}>
                    Answer 2
                </Text>
                <View style={{flexDirection: 'row'}}>
                <TextInput style={{ flex: 1 ,borderWidth: 1, borderColor:'black', borderRadius: 7, paddingLeft: 10}}
                    placeholder="Enter Answer"
                    onChangeText={(text)=>this.setState({tempAnswer2: text})}
                    value={this.state.tempAnswer2} />
                    <Switch
                        value={this.state.switch2}
                        onValueChange={()=>this.setState((prevState)=>({
                         switch2: !prevState.switch2,
                         tempAnswer: prevState.tempAnswer===1?0:1,
                        }))} />
                </View>
                    
                <TouchableHighlight style={{backgroundColor: 'black', marginTop: 20, width: 120, height: 45, justifyContent: 'center', alignItems: 'center', borderRadius: 7, }}
                   onPress={this.addNextHandler } >
                    <Text style={{color: 'white', fontSize: 20,}} >
                        Add Next
                    </Text>
                </TouchableHighlight>
                <TouchableHighlight style={{marginTop: 5, width: 120, height: 45, justifyContent: 'center', alignItems: 'center', borderRadius: 7, borderColor: 'black', borderWidth: 2 }}
                    onPress={()=>{
                        AsyncStorage.setItem(this.state.title, JSON.stringify(this.state.questions), (err)=>{
                        (err) && alert('err');
                        navigate('Deck');
                    })
                    }} >
                    <Text style={{color: 'black', fontSize: 20,}}>
                        Submit
                    </Text>
                </TouchableHighlight>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    add_deck:{
        paddingRight: 10,
        paddingLeft: 10,
        fontSize: 40,
        textAlign: 'center',
    }
})

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