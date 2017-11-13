import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Swipeout from 'react-native-swipeout';

import { 
    selectDeck,
    startFetchDecks,
    startDeleteDeck,
} from '../actions'; 
import DeckListItem from './deck-list-item';
import { primary, white } from '../utils/colors';

class Decks extends PureComponent {
    onDeckItemPress = (deck) => {
        this.props.selectDeck(deck.id);
        this.props.navigation.navigate('Deck', { deckTitle: deck.title });
    };

    onDeckDelete = (deckID) => {
        this.props.startDeleteDeck(deckID);
    } 

    deckKeyExtractor = (item, index) => index

    renderDeckItem = ({item}) => (
        <Swipeout 
            right={[{ text: 'DELETE', onPress: () => this.onDeckDelete(item.id), type: 'delete' }]}
            backgroundColor={white}
            autoClose
        >
            <TouchableOpacity onPress={() => this.onDeckItemPress(item)}>
                <DeckListItem deckTitle={item.title} cardsTotal={item.questions.length} fontSize={18} />
            </TouchableOpacity>
        </Swipeout>
    );

    renderSeparator = () => <View style={styles.separator} />

    componentDidMount () {
        this.props.startFetchDecks();
    }

    render () {
        const decks = Object.values(this.props.decks);

        decks.sort((a, b) => a.title == b.title ? 0 : +(a.title > b.title) || -1);

        return (
            <View style={styles.container}>
                <FlatList
                    data={decks}
                    renderItem={this.renderDeckItem}
                    keyExtractor={this.deckKeyExtractor}
                    ItemSeparatorComponent={this.renderSeparator}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    separator: {
        height: 1,
        backgroundColor: primary,
    }
})

export default connect(
    // map state to props
    ({ decks }) => ({
        decks,
    }),
    // map dispatch to props
    dispatch => bindActionCreators({
        selectDeck,
        startFetchDecks,
        startDeleteDeck,
    }, dispatch)
)(Decks)