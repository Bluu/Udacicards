import React, { PureComponent } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { startCreateDeck, selectDeck } from '../actions'; 
import { containerViewStyles, labelStyles, inputStyles, buttonStyles } from '../styles';

class DeckEntry extends PureComponent {
    state = { 
        deckTitle : '',
    };

    createDeck = () => {
        const { deckTitle } = this.state;

        if (!deckTitle) {
            return alert('Please enter a title for your deck!');
        }

        this.props.startCreateDeck(deckTitle)
            .then(deck => {
                this.props.navigation.navigate('Deck', { deckTitle });
            })
            .catch(error => alert('Error ocurred when saving the Deck...'));
        
        this.setState({ deckTitle : '' });
    }

    render () {
        return (
            <View style={[containerViewStyles.container, containerViewStyles.containerAllCenter]}>
                <Text style={labelStyles.title}>What is the title of your new deck?</Text>
                <TextInput
                    style={inputStyles.input}
                    placeholder="Deck Title"
                    defaultValue={this.state.deckTitle}
                    onChangeText={deckTitle => this.setState({ deckTitle })}
                />
                <TouchableOpacity 
                    onPress={this.createDeck} 
                    style={[buttonStyles.btn, buttonStyles.primaryBtn]}
                >
                    <Text style={buttonStyles.btnWhiteText}>Submit</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default connect(
    // map state to props
    null,
    // map dispatch to props
    { startCreateDeck }
)(DeckEntry);