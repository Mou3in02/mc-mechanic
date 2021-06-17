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
    }
})

export default Styles
