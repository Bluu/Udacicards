import { StackNavigator } from 'react-navigation';

import { primary, white } from '../utils/colors';
import TabNav from './tab-navigator'
import Deck from '../components/deck';
import CardEntry from '../components/card-entry';
import Quiz from '../components/quiz';

const MainNav = StackNavigator({
    Home: {
      screen: TabNav,
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

export default MainNav;