import React from 'react'
import {StyleSheet} from 'react-native'


const Styles = StyleSheet.create({
    taskDetails:{
        flex: 1,
        backgroundColor: '#fff',
        marginTop: 10,
        marginBottom: 20,
        marginHorizontal: 10
    },
    fieldView:{
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 5,
        marginBottom: 10,
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
        fontFamily: 'Poppins_400Regular',
        fontSize: 14,
        marginLeft: 5,
        marginTop: 2
    },
    modelInput:{
        height: 40,
        marginRight: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        paddingHorizontal: 20,
        marginLeft: 10,
        color: '#14274E',
        fontSize: 15,
        fontFamily: 'Poppins_400Regular'
    },
    dateText:{
        fontSize: 15,
        marginLeft: 5,
        fontFamily: 'Poppins_400Regular',
        marginTop: 2
    },
    dateInput:{
        height: 40,
        marginRight: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        paddingHorizontal: 20,
        marginLeft: 10,
        color: '#14274E',
        fontSize: 15,
        paddingTop: 15,
        fontFamily: 'Poppins_400Regular'
    },
    descriptionView:{
        marginTop: 10,
        flexDirection: 'column',
    },
    descriptionTextView:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    descriptionInputView:{
        alignItems: 'center'
    },
    descriptionInput:{
        height: 80,
        borderWidth: 1,
        borderColor: '#eee',
        width: '90%',
        marginTop: 10,
        textAlignVertical: 'top',
        paddingVertical: 10,
        paddingHorizontal: 20,
        fontSize: 14,
        color: '#14274E',
        lineHeight: 25,
        fontFamily: 'Poppins_400Regular'
    },
    statusView:{
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginLeft: 5,
        marginBottom: 10,
        marginTop: 20
    },
    statusText:{
        fontSize: 15,
        fontFamily: 'Poppins_400Regular',
    },
    saveView:{
        marginTop: 10,
        marginHorizontal: 20,
        width: '90%',
    },
    saveButton:{
        height: 40,
        backgroundColor: '#14274E',
        borderWidth: 1,
        borderColor: '#14274E',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },
    saveText:{
        color: '#fff',
        fontSize: 14,
        fontFamily: 'Poppins_400Regular',
    },
    saveItems:{
        flexDirection: 'row',
        // alignItems: 'center',
    },
    cancelView: {
        marginTop: 10,
        marginHorizontal: 20,
        width: '90%',
    },
    cancelButton: {
        height: 40,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5
    },
    cancelText: {
        color: '#900D0D',
        fontSize: 16,
        fontFamily: 'Poppins_400Regular',
    },
    cancelItems: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    invalidModelInput:{
        borderBottomColor: '#f00'
    },
    spinnerView: {
        flex: 1,
        justifyContent: 'center', //Centered vertically
        alignItems: 'center', // Centered horizontally
    },
})

export default Styles
