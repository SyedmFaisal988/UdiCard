import React, { Component } from 'react';
import { Button, Text, View, TouchableHighlight, StyleSheet, AsyncStorage } from 'react-native'
import AddCard from './AddCard';

class DeckView extends Component {
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
                    onPress={() => navigation.navigate('Quiz', {data,})}
                >
                    <Text style={{ fontSize: 20, color: 'white' }}>
                        Start Quiz
                    </Text>
                </TouchableHighlight>
                <TouchableHighlight 
                   style={[{ backgroundColor: 'black', }, styles.button]}
                   onPress={()=>this.props.navigation.navigate('AddCard', {title:data})} >
                    <Text style={{color: 'white', fontSize: 20}}>
                        add Card
                    </Text>
                </TouchableHighlight>

                <TouchableHighlight style={[styles.button,]}
                    onPress={()=>this.props.navigation.goBack()}>
                    <Text style={{fontSize: 20}}>
                        Go Back
                    </Text>
                </TouchableHighlight>


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

export default DeckView;