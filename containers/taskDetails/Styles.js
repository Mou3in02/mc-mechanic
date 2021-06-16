import React from 'react'
import {StyleSheet} from 'react-native'


const Styles = StyleSheet.create({
    taskDetails:{
        flex: 1,
        backgroundColor: '#fff',
        marginVertical: 20,
        marginHorizontal: 10
    },
    fieldView:{
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
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
        marginRight: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        paddingHorizontal: 20,
        marginLeft: 10,
        color: '#47597e',
        fontSize: 16,
        paddingTop: 10
    },
    descriptionView:{
        marginVertical: 5,
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
        fontSize: 15,
        color: '#47597e',
        lineHeight: 25
    },
    statusView:{
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginLeft: 10,
        marginBottom: 10,
        marginTop: 10
    },
    statusText:{
        fontSize: 16,
        fontWeight: 'bold',
    },
    saveView:{
        marginTop: 10,
        marginHorizontal: 20,
        width: '90%',
    },
    saveButton:{
        height: 40,
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
    },
    deleteView:{
        marginTop: 10,
        marginHorizontal: 20,
        width: '90%',
    },
    deleteButton:{
        height: 40,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        // borderWidth: 1,
        // borderColor: '#900'
    },
    deleteItems:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    deleteText:{
        color: '#900',
        fontSize: 16,
        marginLeft: 5
    },
    invalidModelInput:{
        borderBottomColor: '#f00'
    },
    // modal style
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 30,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 20
        // elevation: 2
    },
    buttonDelete: {
        borderWidth: 1,
        borderColor: "#900",
    },
    buttonCancel: {
        backgroundColor: "#2196F3",
    },
    deleteStyle: {
        color: "#900",
        textAlign: "center"
    },
    cancelStyle:{
        color: "#fff",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        fontSize: 15,
        marginBottom: 15,
        textAlign: "center"
    },
    buttonsView:{
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-around'
    }
})

export default Styles
