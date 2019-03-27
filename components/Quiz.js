import React, { Component } from 'react';
import { Button, Text, View, TouchableHighlight, StyleSheet, AsyncStorage } from 'react-native'

class Quiz extends Component {
    state = {
        quest: 0,
        correct: 0,
        totQuest: 0,
    }
    componentDidMount() {
        const  data  = this.props.navigation.getParam('data');
        this.setState({
            totQuest: data.cards.length
        })
    }
    selectHandler = (option, data)=>{
        if(option===data.answer){
            alert('correct');
            this.setState((prevState)=>({
                quest: prevState.quest+1,
                correct: prevState.correct+1,
            }))
        }
        else {   
            alert('incorrect');
            this.setState((prevState)=>({
                quest: prevState.quest+1,
            }))
        }
    }
    flipHandler = (data)=>{
        const ans = 'option'+(data.answer+1)
        alert('correct answer is: '+data[ans]);
        this.setState((prevState)=>({
            quest: prevState.quest+1,
        }))
    }
    render() {
        const  data  = this.props.navigation.getParam('data');
        const { quest, totQuest } = this.state;
        return (
            <View style={{ flex: 1 }}>
                {(quest < totQuest) ?
                    <View style={{ flex: 1, alignItems: 'center', flexDirection: 'column'}}>
                        <View style={{alignItems: 'flex-end', justifyContent: 'flex-start', flexDirection: 'row' }} >
                            <Text style={{fontSize: 20, color: 'grey', flex: 0.9}} >
                                {quest+1}/{totQuest}
                            </Text>
                        </View>
                        <View style={{flex: 1 ,justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{ fontSize: 50, textAlign: "center" }}>
                                {data.cards[quest].question}
                            </Text>
                            <Text style={{ fontSize: 20, textAlign: "center" }}>
                                Option 1:  {data.cards[quest].option1}
                            </Text>
                            <Text style={{ fontSize: 20, textAlign: "center" }}>
                                Option 2:  {data.cards[quest].option2}
                            </Text>

                            <TouchableHighlight style={[styles.button, { backgroundColor: 'green', borderWidth: 0 }]}
                                onPress={() => this.selectHandler(0, data.cards[quest])} >
                                <Text style={{ color: 'white' }}>
                                    Option 1
                            </Text>
                            </TouchableHighlight >
                            <TouchableHighlight style={[styles.button, { backgroundColor: 'green', borderWidth: 0, marginTop: 10 }]}
                                onPress={() => this.selectHandler(1, data.cards[quest])} >
                                <Text style={{ color: 'white' }}>
                                    Option 2
                                </Text>
                            </TouchableHighlight>
                            <TouchableHighlight style={[styles.button, {backgroundColor: 'red', marginTop: 10, borderWidth: 0,}]}
                                onPress={()=>this.flipHandler(data.cards[quest])} >
                                <Text style={{color: 'white'}}>
                                    Flip Card
                                </Text>
                            </TouchableHighlight>
                    </View>
            </View>:<View style={{flex: 1, justifyContent: 'center', alignItems: 'center', padding: 10}}>
                <Text style={{fontSize: 40, textAlign: "center"}}>
                    You Completed the Quiz
                </Text>   
                <Text style={{fontSize: 20}}>
                    Total Questions: {totQuest}
                </Text>
                <Text style={{fontSize: 20}}>
                    Correct Answers: {this.state.correct}
                </Text>
                <Text style={{fontSize: 20}}>
                    Correct Percentage: {(this.state.correct/totQuest)*100}
                </Text>
                <TouchableHighlight style={[styles.button, {backgroundColor: 'black'}]}
                   onPress={()=>this.props.navigation.navigate('DeckList')} >
                    <Text style={{color: 'white'}}>
                        Goto Home
                    </Text>
                </TouchableHighlight>
            </View>}
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

export default Quiz;