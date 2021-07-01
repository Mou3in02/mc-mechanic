import * as React from 'react'
import {StyleSheet} from 'react-native'

const Styles = StyleSheet.create({
    chartsContainer: {
        flex: 1,
        backgroundColor: '#fff',
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
    lineChartView:{
      marginBottom: 10
    },
    lineChartTxt:{
        fontSize: 14,
        color: '#14274E',
        marginVertical: 15,
        alignSelf: 'center'
    },
    PieChartView:{
        marginBottom: 10
    },
    spinnerView: {
        flex: 1,
        justifyContent: 'center'
    },
    // modal style
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        // marginTop: 22
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
    inputText:{
        width: 150,
        borderWidth: 1,
        borderRightColor: '#000',
        paddingVertical: 10,
        paddingHorizontal: 20,
        fontSize: 17,
        fontWeight: 'bold'
    }
})

export default Styles
