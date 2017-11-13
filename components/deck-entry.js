import React, { PureComponent } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { startCreateDeck } from '../actions'; 
import { primary, white } from '../utils/colors';

class DeckEntry extends PureComponent {
    state = { 
        deckTitle : '',
    };

    createDeck = () => {
        const { deckTitle } = this.state;

        if (!deckTitle) {
            return;
        }

        this.props.startCreateDeck(deckTitle);
        this.props.navigation.navigate('Decks');
        this.setState({ deckTitle : '' });
    }

    render () {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>What is the title of your new deck?</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Deck Title"
                    defaultValue={this.state.deckTitle}
                    onChangeText={deckTitle => this.setState({ deckTitle })}
                />
                <TouchableOpacity onPress={this.createDeck} style={styles.submitBtn}>
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
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    input: {
        width: '90%',
        backgroundColor: white,
        padding: 10,
        marginTop: 20,
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
    null,
    // map dispatch to props
    dispatch => bindActionCreators({
        startCreateDeck,
    }, dispatch)
)(DeckEntry);