import React from 'react';
import { Platform } from 'react-native';
import { TabNavigator } from 'react-navigation';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'; 

import { primary, white } from '../utils/colors';
import Decks from '../components/decks';
import DeckEntry from '../components/deck-entry';

const TabNav = TabNavigator({
    Decks: {
        screen: Decks,
        navigationOptions: {
            title: 'Decks',
                tabBarLabel: 'DECKS',
                tabBarIcon: ({tintColor}) => <MaterialCommunityIcons name="cards" size={30} color={tintColor} />,
        }
    },
    NewDeck: {
        screen: DeckEntry,
        navigationOptions: {
            title: 'New Deck',
                tabBarLabel: 'NEW DECK',
                tabBarIcon: ({tintColor}) => <MaterialIcons name='library-add' size={30} color={tintColor} />
        }
    },
}, {
    navigationOptions: {
        headerTintColor: white,
        headerStyle: {
            backgroundColor: primary,
        }
    },
    tabBarOptions: {
        activeTintColor: Platform.OS === 'ios' ? primary : white,
        style: {
            height: 56,
            backgroundColor: Platform.OS === 'ios' ? white : primary,
            shadowColor: 'rgba(0, 0, 0, 0.24)',
            shadowOffset: {
            width: 0,
            height: 3,
            },
            shadowRadius: 6,
            shadowOpacity: 1
        }
    }
});

export default TabNav;