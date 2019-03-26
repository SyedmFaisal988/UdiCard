import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    TextInput,
    TouchableHighlight,
    AsyncStorage,
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


class Decker extends Component {
    render() {
        return (
            <View style={{justifyContent: "center", alignItems: 'center', flex: 1}} >
                <Text >
                    This is home screen
               </Text>
               <Deck />
            </View>
        );
    }
}

class Deck extends Component{
    state = {
        hellow: [],
    }
    componentDidMount() {
        AsyncStorage.getAllKeys()
                .then(v =>{
                    AsyncStorage.multiGet((v), (err,data)=>{
                        if(!err){
                            let hellow = [];
                            data.map((rec)=>hellow.push(rec[0]+':'+rec[1]));
                            this.setState({hellow,})
                        }
                    })
                })
    }
    render(){
        return(
        <View style={{width: 350, justifyContent: 'center', }}>
            {
                this.state.hellow.length>=1?this.state.hellow.map(data =>
                    <View style={{borderBottomColor: 'black', borderBottomWidth: 2,}}>
                        <Text style={{textAlign: 'center'}}>{data}</Text>
                        <Text style={{textAlign: 'center'}}>Hello</Text>
                    </View>
            ):<Text>Nothing</Text>
            }
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
        question: [],
        view: 0,
        tempQuestion: "",
        tempAnswer: "",
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
                <Text style={{fontSize: 20}}>
                    Add Cards to Deck: {this.state.title}
                </Text>
                <Text style={{fontSize: 15, alignSelf: 'flex-start' }}>
                    Question
                </Text>
                <View style={{flexDirection: 'row'}}>
                <TextInput style={{  flex: 1 ,borderWidth: 1, borderColor:'black', borderRadius: 7}}
                    onChangeText={(text)=>this.setState({tempQuestion: text})}
                    value={this.state.tempQuestion} />
                </View>
                
                <Text style={{fontSize: 15, alignSelf:'flex-start'}}>
                    Answer
                </Text>
                <View style={{flexDirection: 'row'}}>
                <TextInput style={{ flex: 1 ,borderWidth: 1, borderColor:'black', borderRadius: 7}}
                    onChangeText={(text)=>this.setState({tempAnswer: text})}
                    value={this.state.tempAnswer} />
                </View>
                <TouchableHighlight style={{backgroundColor: 'black', marginTop: 20, width: 120, height: 45, justifyContent: 'center', alignItems: 'center', borderRadius: 7, }}>
                    <Text style={{color: 'white', fontSize: 20,}} >
                        Add Next
                    </Text>
                </TouchableHighlight>
            </View>
        )
    }
}

class AddCards extends Component{
    render(){
        return(
            <View style={{flex:1}}>
                <Text>
                    Hello
                </Text>
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
            screen: Decker,
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
        initialRouteName: "NewDeck",
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