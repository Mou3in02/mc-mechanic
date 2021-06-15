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
        color: '#17A2B8'
    },
    deleteText: {
        fontSize: 10,
        color: '#8b008b'
    },
    detailsView:{
        flex: 1,
        marginTop: 12,
    },
    fieldView:{
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
        marginBottom: 10
    },
    _30:{
        flexDirection: 'row',
        alignItems: 'center',
        width: '30%'
    },
    _70:{
      width: '70%'
    },
    modelText:{
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 10
    },
    modelInput:{
        height: 40,
        marginRight: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        paddingHorizontal: 20,
        marginLeft: 10,
        color: '#47597e',
        fontSize: 16,
    },
    dateText:{
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 5
    },
    dateInput:{
        height: 40,
        width: '100%',
        borderWidth: 1,
        borderColor: '#eee',
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
        height: 120,
        borderWidth: 1,
        borderColor: '#eee',
        width: '90%',
        marginTop: 10,
        textAlignVertical: 'top',
        paddingVertical: 10,
        paddingHorizontal: 20,
        fontSize: 15,
        color: '#47597e',
        lineHeight: 25
    },
    saveView:{
        marginTop: 20,
        marginHorizontal: 20,
        width: '90%',
    },
    saveButton:{
        height: 45,
        backgroundColor: '#47597e',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30
    },
    saveText:{
        color: '#fff',
        fontSize: 16,
        marginLeft: 5
    },
    saveItems:{
        flexDirection: 'row',
        alignItems: 'center',
    }
})

export default Styles
