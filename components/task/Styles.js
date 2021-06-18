import * as React from 'react'
import {StyleSheet} from 'react-native';


const Styles = StyleSheet.create({
    taskView: {
        marginBottom: 1,
        padding: 10,
        // backgroundColor: '#fff',
        // borderRadius: 20
    },
    model: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#293b5f',
        textAlign: 'center',
        marginBottom: 10
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
        fontSize: 16,
        color: '#333',
        marginLeft: 5
    },
    dateView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 2,
        alignSelf: 'flex-end'
    },
    date: {
        fontSize: 16,
        color: '#333',
        marginRight: 5
    },
    moneyView: {
        flexDirection: "row",
        alignItems: 'center',
    },
    earn: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#444',
        marginLeft: 10
    },
    spent: {
        fontWeight: 'bold',
        color: '#444',
        fontSize: 16,
        marginLeft: 10
    },
    description: {
        fontSize: 14,
        color: '#555',
    },
    status: {
        textAlign: 'right'
    },
    statusView:{
        flexDirection: 'row',
        alignSelf: 'flex-end',
        marginBottom: 5,
        alignItems: 'center'
    },
    trueStatusTxt:{
        fontSize: 14,
        color: '#151965',
        fontWeight: 'bold',
        marginRight: 5
    },
    falseStatusTxt:{
        fontSize: 14,
        color: '#900D0D',
        fontWeight: 'bold'
    },
    earnText:{
        color: '#444'
    },
    spentText:{
        color: '#444'
    }
})

export default Styles
