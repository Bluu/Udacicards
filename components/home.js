import React, { Component } from 'react';
import { View, Platform, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Constants } from 'expo';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'; 

import { primary, white } from '../utils/colors';
import Decks from './decks';
import DeckEntry from './deck-entry';
import Deck from './deck';
import CardEntry from './card-entry';
import Quiz from './quiz';
import { setLocalNotification } from '../api'

const Tabs = TabNavigator({
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

  const MainNavigator = StackNavigator({
    Home: {
      screen: Tabs,
    },
    Deck: {
        screen: Deck,
        navigationOptions: {
            headerTintColor: white,
            headerStyle: {
                backgroundColor: primary,
            }
        }
    },
    NewCard: {
        screen: CardEntry,
        navigationOptions: {
            headerTitle: 'Add Card',
            headerTintColor: white,
            headerStyle: {
                backgroundColor: primary,
            }
        }
    },
    Quiz: {
        screen: Quiz,
        navigationOptions: {
            headerTitle: 'Quiz',
            headerTintColor: white,
            headerStyle: {
                backgroundColor: primary,
            }
        }
    }
  });

class Home  extends Component {
    componentDidMount () {
        setLocalNotification();
    }

    render () {
        return (
            <View style={styles.container}>
                <View style={styles.statusBar}>
                    <StatusBar translucent backgroundColor={primary} barStyle='light-content' />
                </View>
                <MainNavigator />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    statusBar: {
        backgroundColor: primary,
        height: Constants.statusBarHeight,
    },
});

export default Home;
  