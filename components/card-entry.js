import React, { PureComponent } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { startCreateCard } from '../actions'; 
import { containerViewStyles, inputStyles, buttonStyles } from '../styles';

class CardEntry extends PureComponent {
    state = {
        question: '',
        answer: '',
    }

    createCard = () => {
        const {
            question,
            answer,
        } = this.state;

        if (!question || !answer) {
            return alert('Please enter a question and answer for your card!');
        }

        const {
            selectedDeckId,
            startCreateCard,
            navigation,
        } = this.props;

        startCreateCard(selectedDeckId, {
            question,
            answer,
        });

        navigation.goBack();
        
        this.setState({ 
            question: '',
            answer: '',
        });
    }

    render () {
        return (
            <View style={[containerViewStyles.container, containerViewStyles.containerAllCenter]}>
                <TextInput 
                    style={inputStyles.input}
                    placeholder="Question" 
                    defaultValue={this.state.question}
                    onChangeText={question => this.setState({ question })}
                />
                <TextInput 
                    style={inputStyles.input}
                    placeholder="Answer" 
                    defaultValue={this.state.answer}
                    onChangeText={answer => this.setState({ answer })}
                />
                <TouchableOpacity 
                    style={[buttonStyles.btn, buttonStyles.primaryBtn]}
                    onPress={this.createCard}
                >
                    <Text style={buttonStyles.btnWhiteText}>Submit</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default connect(
    // map state to props
    ({ selectedDeckId }) => ({
        selectedDeckId,
    }),
    // map dispatch to props
    dispatch => bindActionCreators({
        startCreateCard,
    }, dispatch)
)(CardEntry);