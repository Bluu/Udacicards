import {
    FETCH_DECKS,
    CREATE_DECK,
    SELECT_DECK,
    DELETE_DECK,
    CREATE_CARD,
} from './types';
import {
    getDecks,
    saveDeck,
    removeDeck,
    addCardToDeck,
} from '../api';

const fetchDecks = (decks) => (
    {
        type: FETCH_DECKS,
        decks,
    }
);

const createDeck = (deck) => (
    {
        type: CREATE_DECK,
        deck,
    }
)

const createCard = (deck) => (
    {
        type: CREATE_CARD,
        deck,
    }
)

export const selectDeck = (selectedDeckId) => (
    {
        type: SELECT_DECK,
        selectedDeckId
    }
)

export const deleteDeck = (id) => (
    {
        type: DELETE_DECK,
        id
    }
)

export const startFetchDecks = () => {
    return dispatch => (
        getDecks().then(decks => dispatch(fetchDecks(decks)))
    )
}

export const startCreateDeck = (title) => {
    return dispatch => (
        saveDeck(title).then(deck => {
            const deckId = Object.keys(deck)[0];
            
            dispatch(createDeck(deck));
            dispatch(selectDeck(deckId))
        })
    )
}

export const startDeleteDeck = (id) => {
    return dispatch => (
        removeDeck(id).then(deckId => dispatch(deleteDeck(deckId)))
    )
}

export const startCreateCard = (deckID, card) => {
    return dispatch => (
        addCardToDeck(deckID, card).then(deck => dispatch(createCard(deck)))
    )
}