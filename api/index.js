import { AsyncStorage } from 'react-native';
import { Notifications, Permissions } from 'expo'
import uuid from 'uuid/v1';

const DECKS_STORAGE_KEY = '@MYCARDS:decks';
const NOTIFICATION_KEY = '@MYCARDS:notifications';

// getDecks: return all of the decks along with their titles, questions, and answers. 
export function getDecks() {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY)
        .then(result => JSON.parse(result));
}

// getDeck: take in a single id argument and return the deck associated with that id. 
export function getDeck(id) {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY)
        .then(result => {
            const decks = JSON.parse(result);

            return deck[id];
        });
}

// saveDeckTitle: take in a single title argument and add it to the decks and return the saved deck.
export function saveDeck(title) {
    const id = uuid();
    const newDeck = {
        [id]: {
            id,
            title,
            questions: [],
        }
    };

    return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify(newDeck))
        .then(() => newDeck);
}

// removeDeck: take in a single id argument then remove the deck object from the list and return the id of the deleted deck.
export function removeDeck(id) {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY)
        .then(results => {
            const decks = JSON.parse(results);
            decks[id] = undefined;
            delete decks[id];

            return AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decks))
                .then(() => id);
        })
}

// addCardToDeck: take in two arguments, id and card, and will add the card to the list of questions for the deck with the associated id and return the updated deck.
export function addCardToDeck(id, card) {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY)
        .then(result => {
            const decks = JSON.parse(result);

            decks[id].questions.push(card);

            return AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decks))
                .then(() => decks[id]);
        });
}

// notifications
export function clearLocalNotification () {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
        .then(Notifications.cancelAllScheduledNotificationsAsync)
}
  
function createNotification () {
    return {
        title: 'Time to study!',
        body: "👋 don't forget to study today!",
        ios: {
            sound: true,
        },
        android: {
            sound: true,
            priority: 'high',
            sticky: false,
            vibrate: true,
        }
    }
}
  
export function setLocalNotification () {
    AsyncStorage.getItem(NOTIFICATION_KEY)
        .then(JSON.parse)
        .then((data) => {
            if (data === null) {
                Permissions.askAsync(Permissions.NOTIFICATIONS)
                    .then(({ status }) => {
                        if (status === 'granted') {
                            Notifications.cancelAllScheduledNotificationsAsync()

                            let tomorrow = new Date()
                            tomorrow.setDate(tomorrow.getDate() + 1)
                            tomorrow.setHours(20)
                            tomorrow.setMinutes(0)

                            Notifications.scheduleLocalNotificationAsync(
                                createNotification(),
                                {
                                    time: tomorrow,
                                    repeat: 'day',
                                }
                            )

                            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
                        }
                    })
            }
        })
}