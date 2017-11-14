import React, { Component } from 'react';
import { View, StatusBar, StyleSheet } from 'react-native';
import { Constants } from 'expo';

import { primary, white } from '../utils/colors';
import { setLocalNotification } from '../api'
import MainNav from '../navigators/main-navigator';

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
                <MainNav />
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
  