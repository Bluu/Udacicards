import {
    FETCH_DECKS,
    CREATE_DECK,
    SELECT_DECK,
    CREATE_CARD,
    DELETE_DECK,
} from '../actions/types';

const initialState = {
    decks: {},
    selectedDeckId: null,
}

export default function decksReducer (state = initialState, action) {
    switch (action.type) {
        case FETCH_DECKS:
            return {
                ...state,
                decks: action.decks ? action.decks : state.decks,
            }
        case CREATE_DECK:
            return {
                ...state,
                decks: Object.assign({}, state.decks, action.deck),
            }
        case SELECT_DECK:
            console.log('select change', action.selectedDeckId)
            return {
                ...state,
                selectedDeckId: action.selectedDeckId,
            }
        case DELETE_DECK:
            const decks = Object.assign({}, state.decks);
            delete decks[action.id];
            
            return {
                ...state,
                decks
            }
        case CREATE_CARD:
            return {
                ...state,
                decks: {
                    ...state.decks,
                    [action.deck.id]: action.deck,
                }
            }
        default:
            return state;
    }
}