import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import DeckListItem from './deck-list-item';
import { containerViewStyles, buttonStyles } from '../styles';

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
            <View style={[containerViewStyles.container, containerViewStyles.containerAllCenter]}>
                <DeckListItem deckTitle={deck.title} cardsTotal={deck.questions.length} fontSize={30} />
                <TouchableOpacity 
                    style={[buttonStyles.btn, buttonStyles.primaryOutlineBtn]}
                    onPress={this.onAddCard}
                >
                    <Text style={buttonStyles.btnText}>Add Card</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[buttonStyles.btn, buttonStyles.primaryBtn]}
                    onPress={this.onStartQuiz}
                >
                    <Text style={buttonStyles.btnWhiteText}>Start Quiz</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default connect(
    // map state to props
    ({ decks, selectedDeckId }) => ({
        deck: decks[selectedDeckId],
    }),
    // map dispatch to props
    null
)(Deck)