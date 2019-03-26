import React, { Component } from 'react';
import { Button, Text, View, TouchableHighlight, StyleSheet, AsyncStorage } from 'react-native'

class DeckList extends Component {
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
                            onPress={()=>this.props.navigation.navigate('DeckView', {data,})} >
                            <Text style={{textAlign: 'center', fontSize: 40,}}>{data.name}</Text>
                        </TouchableHighlight>
                        <TouchableHighlight 
                           onPress={()=>this.props.navigation.navigate('DeckView', {data,})} >
                            <Text style={{textAlign: 'center', fontSize: 20, color: 'grey'}}>{data.cards.length} cards</Text>
                        </TouchableHighlight>
                    </View>
            ):<Text>Nothing</Text>
            }
        </View>
        );
    }
}
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

export default DeckList;