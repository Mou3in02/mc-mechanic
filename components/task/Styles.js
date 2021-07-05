import * as React from 'react'
import {StyleSheet} from 'react-native';

const Styles = StyleSheet.create({
    taskView: {
        marginBottom: 1,
        padding: 10,
    },
    model: {
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 15,
        color: '#14274E',
        textAlign: 'center',
        marginBottom: 8,
    },
    taskDetailsView:{
        flexDirection: 'row',
        marginBottom: 10
    },
    _50A:{
        width: '50%'
    },
    _50B:{
        width: '50%',
        alignContent: 'flex-end'
    },
    telView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 2
    },
    tel: {
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 14,
        color: '#333',
        marginLeft: 5,
        marginTop: 2
    },
    dateView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 2,
        alignSelf: 'flex-end'
    },
    date: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 14,
        color: '#333',
        marginRight: 5,
    },
    moneyView: {
        flexDirection: "row",
        alignItems: 'center',
    },
    earn: {
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 14,
        color: '#14274E',
    },
    spent: {
        fontFamily: 'Poppins_600SemiBold',
        color: '#900D0D',
        fontSize: 14,
    },
    description: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 13,
        color: '#555',
    },
    status: {
        textAlign: 'right',
    },
    statusView:{
        flexDirection: 'row',
        alignSelf: 'flex-end',
        marginBottom: 5,
        alignItems: 'center'
    },
    trueStatusTxt:{
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 13,
        color: '#444',
        marginRight: 5,
    },
    falseStatusTxt:{
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 13,
        color: '#444',
        marginRight: 5,
    },
    earnText:{
        fontSize: 14,
        fontFamily: 'Poppins_400Regular',
        color: '#444',
    },
    spentText:{
        fontSize: 14,
        fontFamily: 'Poppins_400Regular',
        color: '#444',
    }
})

export default Styles
