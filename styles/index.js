import { StyleSheet } from 'react-native';

import { primary, secondary, white } from '../utils/colors';

export const containerViewStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: white,
    },
    containerAllCenter: {
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export const labelStyles = StyleSheet.create({
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
})

export const inputStyles = StyleSheet.create({
    input: {
        width: '90%',
        backgroundColor: white,
        padding: 10,
        marginBottom: 20,
        borderColor: primary,
        borderWidth: 1,
        borderRadius: 3,
    },
});

export const buttonStyles = StyleSheet.create({
    btn: {
        borderWidth: 1,
        borderRadius: 3,
        padding: 5,
        paddingLeft: 25,
        paddingRight: 25,
        width: '40%',
        marginBottom: 20,
    },
    primaryBtn: {
        backgroundColor: primary,
        borderColor: primary,
    },
    primaryOutlineBtn: {
        borderColor: primary,
    },
    secondaryBtn: {
        backgroundColor: secondary,
        borderColor: secondary,
    },
    btnText: {
        textAlign: 'center',
    },
    btnWhiteText: {
        color: white,
        textAlign: 'center',
    }
});