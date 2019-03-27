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

class AddCard extends Component {
    state = { 
        title: this.props.title,
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
        state.switch1 = false;
        state.switch2 = false;
        this.setState({...state});
    }
    // componentDidUpdate(prevProps, prevState) {
    //     const title = this.props.navigation.getParam('title');
    //     alert(title);
    //     if(title!==null&&title!==undefined){
    //         this.setState({title,})
    //     }
    // }
    componentDidMount() {
        const title = this.props.navigation.getParam('title');
        if(title!==null&&title!==undefined){
            this.setState({title: title.name,
                questions: title.cards
            })
        }
    }
    render() {
        const { navigation } = this.props;
        return (
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

                <Text style={{fontSize: 16, alignSelf:'flex-start'}}>
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
                   onPress={()=>this.addNextHandler()} >
                    <Text style={{color: 'white', fontSize: 20,}} >
                        Add Next
                    </Text>
                </TouchableHighlight>
                <TouchableHighlight style={{marginTop: 5, width: 120, height: 45, justifyContent: 'center', alignItems: 'center', borderRadius: 7, borderColor: 'black', borderWidth: 2 }}
                    onPress={()=>{
                        AsyncStorage.setItem(this.state.title, JSON.stringify(this.state.questions), (err)=>{
                        (err) && alert('err'); 
                        if(this.props.changeTitle!==null && this.props.changeTitle!==undefined){
                            this.props.changeTitle("",0);
                        }
                        navigation.navigate('DeckList'); 
                        navigation.navigate('Deck');
                    })
                    }} >
                    <Text style={{color: 'black', fontSize: 20,}}>
                        Submit
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
 
export default AddCard;