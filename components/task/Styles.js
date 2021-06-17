import * as React from 'react'
import {StyleSheet} from 'react-native';


const Styles = StyleSheet.create({
    taskView: {
        // borderBottomWidth: 1,
        // borderBottomColor: '#999',
        margin: 2,
        padding: 10
    },
    model: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#47597e',
        textAlign: 'center'
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
        marginBottom: 2
    },
    date: {
        fontSize: 16,
        color: '#333',
        marginLeft: 5
    },
    moneyView: {
        flexDirection: "row",
        alignItems: 'center',
    },
    earn: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#138496',
        marginLeft: 10
    },
    spent: {
        fontWeight: 'bold',
        color: '#d33682',
        fontSize: 16,
        marginLeft: 10
    },
    description: {
        fontSize: 14,
        color: '#555',
    },
    status: {
        textAlign: 'right'
    }
})

export default Styles
