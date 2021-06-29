import * as React from 'react'
import {StyleSheet} from 'react-native'

const Styles = StyleSheet.create({
    chartsContainer: {
        flex: 1,
        backgroundColor: '#fff',
        // paddingHorizontal: 10,
        // justifyItems: 'center'
    },
    headerView: {
        height: 50,
        backgroundColor: '#14274E',
        paddingVertical: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    yearView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    yearTxt: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 5
    },
    spinnerView: {
        flex: 1,
        justifyContent: 'center'
    },
})

export default Styles
