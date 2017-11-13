import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DeckListItem = ({ deckTitle, cardsTotal, fontSize }) => (
    <View style={styles.container}>
        <Text style={[styles.item, { fontSize }]}>{deckTitle}</Text>
        <Text style={[styles.item, styles.cardsTotal, { fontSize: fontSize - 3 }]}>{`${cardsTotal} card(s)`}</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
        paddingBottom: 10,
    },
    item: {
        padding: 5,
        alignSelf: 'center'
    },
    cardsTotal: {
        color: 'grey',
    } 
})

export default DeckListItem;