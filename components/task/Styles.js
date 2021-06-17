import * as React from 'react'
import { StyleSheet } from 'react-native';


const Styles = StyleSheet.create({
    taskView:{
        // borderBottomWidth: 1,
        // borderBottomColor: '#999',
        margin: 2,
        padding: 10
    },
    model:{
        fontSize: 16,
        fontWeight: 'bold',
        color: '#47597e',
        textAlign: 'center'
    },
    tel:{
        fontSize: 15,
        color: '#333',
        marginBottom: 2,
    },
    date:{
        fontSize: 15,
        color: '#333',
        marginBottom: 4,
    },
    earn:{
        fontWeight: 'bold',
        color: '#00b8a9'
    },
    spent:{
        fontWeight: 'bold',
        color: '#e23e57',
        paddingLeft: 10
    },
    description:{
        fontSize: 14,
        color: '#555',
    },
    status:{
        textAlign: 'right'
    }
})

export default Styles
