import React, { PureComponent } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { startCreateCard } from '../actions'; 
import { primary, white } from '../utils/colors';

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
            return;
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
            <View style={styles.container}>
                <TextInput 
                    style={styles.input}
                    placeholder="Question" 
                    defaultValue={this.state.question}
                    onChangeText={question => this.setState({ question })}
                />
                <TextInput 
                    style={styles.input}
                    placeholder="Answer" 
                    defaultValue={this.state.answer}
                    onChangeText={answer => this.setState({ answer })}
                />
                <TouchableOpacity 
                    style={styles.submitBtn}
                    onPress={this.createCard}
                >
                    <Text style={styles.submitBtnText}>Submit</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: white,
    },
    input: {
        width: '90%',
        backgroundColor: white,
        padding: 10,
        marginBottom: 20,
        borderColor: primary,
        borderWidth: 1,
        borderRadius: 3,
    },
    submitBtn: {
        backgroundColor: primary,
        borderColor: primary,
        borderWidth: 1,
        borderRadius: 3,
        padding: 5,
        paddingLeft: 25,
        paddingRight: 25,
    },
    submitBtnText: {
        color: white,
    }
})

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