import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import DeckListItem from './deck-list-item';
import { primary, white } from '../utils/colors';

class Deck extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.deckTitle}`,
    });

    onAddCard = () => this.props.navigation.navigate('NewCard')

    onStartQuiz = () => {
        const {
            deck,
            navigation,
        } = this.props;

        if (deck.questions.length) {
            navigation.navigate('Quiz');
        }
    }

    render () {
        const { deck } = this.props;

        return (
            <View style={styles.container}>
                <DeckListItem deckTitle={deck.title} cardsTotal={deck.questions.length} fontSize={30} />
                <TouchableOpacity 
                    style={styles.btn}
                    onPress={this.onAddCard}
                >
                    <Text style={styles.btnText}>Add Card</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.btn, styles.startBtn]}
                    onPress={this.onStartQuiz}
                >
                    <Text style={[styles.btnText, styles.startBtnText]}>Start Quiz</Text>
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
    btn: {
        borderColor: primary,
        borderWidth: 1,
        borderRadius: 3,
        padding: 5,
        paddingLeft: 25,
        paddingRight: 25,
        marginTop: 20,
        width: '40%',
        
    },
    btnText: {
        textAlign: 'center',
    },
    startBtn: {
        backgroundColor: primary,
    },
    startBtnText: {
        color: white,
    }
})

export default connect(
    // map state to props
    ({ decks, selectedDeckId }) => ({
        deck: decks[selectedDeckId],
    }),
    // map dispatch to props
    null
)(Deck)