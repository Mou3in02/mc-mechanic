import React from 'react'
import {StyleSheet} from 'react-native'


const Styles = StyleSheet.create({
    taskDetails:{
        flex: 1,
        backgroundColor: '#fff',
    },
    actionView:{
        flexDirection: 'row',
        height: 60,
        backgroundColor: '#666',
        borderBottomWidth: 1,
        borderBottomColor: '#eee'
    },
    editView: {
        width: '50%',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    deleteView:{
        width: '50%',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        borderRightWidth: 1,
        borderRightColor: '#eee'
    },
    editText: {
        fontSize: 10,
        color: 'green'
    },
    deleteText: {
        fontSize: 10,
        color: 'darkred'
    },
    detailsView:{
        flex: 1,
        marginTop: 10,
    },
    modelView:{
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
        marginBottom: 10
    },
    modelText:{
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 10
    },
    modelInput:{
        height: 40,
        width: '50%',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        paddingHorizontal: 20,
        marginLeft: 10,
        color: '#47597e',
        fontSize: 16,
    },
    descriptionView:{
        marginTop: 10,
        flexDirection: 'column'
    },
    descriptionTextView:{
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 5
    },
    descriptionInputView:{
        alignItems: 'center'
    },
    descriptionInput:{
        height: 100,
        borderWidth: 1,
        borderColor: '#eee',
        width: '90%',
        marginTop: 20,
        textAlignVertical: 'top',
        paddingVertical: 10,
        paddingHorizontal: 20,
        fontSize: 16
    }
})

export default Styles
