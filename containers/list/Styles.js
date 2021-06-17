import * as React from 'react'
import {StyleSheet} from 'react-native'

const Styles = StyleSheet.create({
    listsView: {
        flex: 1,
        backgroundColor: '#fff',
    },
    listsFilter: {
        flexDirection: 'row',
        backgroundColor: '#eee',
        height: '10%',
        borderWidth: 1,
        borderColor: '#999',
    },
    noRowsView:{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    noRowsText:{
        fontSize: 18,
        color: '#999'
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
    deleteModelText:{
        marginBottom: 20,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        color: '#900'
    }
})

export default Styles
