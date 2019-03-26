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

class AddDeck extends Component {
    state = { 
        title: ""
    }
    render() { 
        return (
            <View style={styles.container}>
                <Text style={styles.add_deck}>
                    Add A new Deck to list
                </Text>
                <TextInput style={{ width: 340, borderWidth: 1, borderColor:'black', paddingLeft: 10 ,borderRadius: 10,}}
                    placeholder="Deck Title"
                    value={this.state.title}
                    onChangeText={(text)=>this.setState({title: text})} />
                <TouchableHighlight style={{backgroundColor: 'black', marginTop: 20, width: 120, height: 45, justifyContent: 'center', alignItems: 'center', borderRadius: 7, }}
                   onPress={()=>this.props.changeTitle(this.state.title, 1)}>
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
            </View>
          );
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
 
export default AddDeck;