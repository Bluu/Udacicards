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
import { primary, secondary, white } from '../utils/colors';

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

    onFinish = () => {
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
                <View style={styles.contentContainer}>
                    <Text style={styles.questionAndAnswer}>SCORE</Text>
                    <Text style={[styles.score, { color: score > 60 ? primary : secondary }]}>
                        {score}%
                    </Text>
                    <TouchableOpacity 
                        style={[styles.btn, styles.btnCorrect]}
                        onPress={this.onFinish}
                    >
                        <Text style={styles.btnText}>Finish</Text>
                    </TouchableOpacity>
                </View>
            );
        } else {
            return (
                <View style={styles.container}>
                    <Text style={styles.counter}>
                        {`${quizCardIndex + 1}/${deck.questions.length}`}
                    </Text>
                    <View style={styles.contentContainer}>
                        <Text style={styles.questionAndAnswer}>
                            {displayAnswer ? card.answer : card.question }
                        </Text>
                        <TouchableOpacity onPress={this.onFlipCard}>
                            <Text style={styles.flipBtnText}>
                                {displayAnswer ? 'Question' : 'Answer' }
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={[styles.btn, styles.btnCorrect]}
                            onPress={() => this.onNextCard(true)}
                        >
                            <Text style={styles.btnText}>Correct</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={[styles.btn, styles.btnIncorrect]}
                            onPress={() => this.onNextCard(false)}
                        >
                            <Text style={styles.btnText}>Incorrect</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: white,
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: white,
    },
    counter: {
        letterSpacing: 3,
        fontWeight: 'bold',
        padding: 5,
    },
    questionAndAnswer: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    score: {
        fontSize: 50,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 20,
    },
    flipBtnText: {
        color: secondary,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 50,
    },
    btn: {
        borderWidth: 1,
        borderRadius: 3,
        padding: 5,
        paddingLeft: 25,
        paddingRight: 25,
        width: '40%',
        marginBottom: 20,
    },
    btnCorrect: {
        backgroundColor: primary,
        borderColor: primary,
    },
    btnIncorrect: {
        backgroundColor: secondary,
        borderColor: secondary,
    },
    btnText: {
        color: white,
        textAlign: 'center',
    }
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