import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
    resetQuiz,
} from '../actions'
import {
    clearLocalNotification,
    setLocalNotification,
} from '../api';
import { primary, secondary } from '../utils/colors';
import { containerViewStyles, labelStyles, buttonStyles } from '../styles';

class Quiz extends Component {
    state = {
        quizCardIndex: 0,
        quizCorrectScore: 0,
        displayAnswer: false,
    }

    onFlipCard= () => {
        const {
            displayAnswer,
        } = this.state;

        this.setState({
            displayAnswer: !displayAnswer,
        })
    }

    onNextCard = (answerCorrect) => {
        let {
            quizCardIndex,
            quizCorrectScore,
        } = this.state;

        quizCardIndex = quizCardIndex + 1;
        quizCorrectScore = quizCorrectScore + (answerCorrect ? 1 : 0);

        this.setState({
            quizCardIndex,
            quizCorrectScore,
            displayAnswer: false,
        })
    }

    onRestartQuiz = () => {
        this.setState({
            quizCardIndex: 0,
            quizCorrectScore: 0,
            displayAnswer: false,
        });
    }

    onBackToDeck = () => {
        clearLocalNotification()
            .then(setLocalNotification);

        this.props.navigation.goBack();
    }

    render () {
        const { deck } = this.props;
        const {
            quizCardIndex,
            quizCorrectScore,
            quizComplete,
            displayAnswer,
        } = this.state;

        const card = deck.questions[quizCardIndex];

        if (quizCardIndex === deck.questions.length) {
            const score = Math.round((quizCorrectScore / deck.questions.length) * 100);

            return (
                <View style={[containerViewStyles.container, containerViewStyles.containerAllCenter]}>
                    <Text style={labelStyles.title}>SCORE</Text>
                    <Text style={[labelStyles.title, { fontSize: 50, color: score > 60 ? primary : secondary }]}>
                        {score}%
                    </Text>
                    <TouchableOpacity 
                        style={[buttonStyles.btn, buttonStyles.primaryOutlineBtn]}
                        onPress={this.onRestartQuiz}
                    >
                        <Text style={buttonStyles.btnText}>Restart Quiz</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[buttonStyles.btn, buttonStyles.primaryBtn]}
                        onPress={this.onBackToDeck}
                    >
                        <Text style={buttonStyles.btnWhiteText}>Back to Deck</Text>
                    </TouchableOpacity>
                </View>
            );
        } else {
            return (
                <View style={containerViewStyles.container}>
                    <Text style={styles.counter}>
                        {`${quizCardIndex + 1}/${deck.questions.length}`}
                    </Text>
                    <View style={[containerViewStyles.container, containerViewStyles.containerAllCenter]}>
                        <Text style={labelStyles.title}>
                            {displayAnswer ? card.answer : card.question }
                        </Text>
                        <TouchableOpacity onPress={this.onFlipCard}>
                            <Text style={styles.flipBtnText}>
                                {displayAnswer ? 'Question' : 'Answer' }
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={[buttonStyles.btn, buttonStyles.primaryBtn]}
                            onPress={() => this.onNextCard(true)}
                        >
                            <Text style={buttonStyles.btnWhiteText}>Correct</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={[buttonStyles.btn, buttonStyles.secondaryBtn]}
                            onPress={() => this.onNextCard(false)}
                        >
                            <Text style={buttonStyles.btnWhiteText}>Incorrect</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    counter: {
        letterSpacing: 3,
        fontWeight: 'bold',
        padding: 5,
    },
    flipBtnText: {
        color: secondary,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 50,
    },
})

export default connect(
    // map state to props
    ({ decks, selectedDeckId,  }) => ({
        deck: decks[selectedDeckId],
    }),
    // map dispatch to props
    dispatch => bindActionCreators({
        resetQuiz,
    }, dispatch)
)(Quiz)