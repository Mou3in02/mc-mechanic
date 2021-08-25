import * as React from 'react'
import {StyleSheet} from 'react-native'

const Styles = StyleSheet.create({
    chartsContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    headerView: {
        backgroundColor: '#14274E',
        flexDirection: 'column',
        alignItems: 'center',
        paddingVertical: 10,
    },
    yearView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    yearTxt: {
        color: '#fff',
        fontSize: 20,
        marginLeft: 8,
        letterSpacing: 1,
        fontFamily: 'Poppins_600SemiBold',
        marginTop: 5
    },
    countView: {
        height: 30,
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    countText: {
        fontSize: 14,
        color: '#14274e',
        marginRight: 10,
        fontFamily: 'Poppins_400Regular'
    },
    lineChartView: {
        height: '55%',
    },
    lineChartTxt: {
        fontSize: 14,
        color: '#14274E',
        marginVertical: 10,
        alignSelf: 'center'
    },
    PieChartView: {
        height: '45%',
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
    modalTxt: {
        fontSize: 16,
        color: '#999',
        marginBottom: 10,
        alignSelf: 'center',
        fontFamily: 'Poppins_400Regular',
    },
    inputText: {
        width: 200,
        borderWidth: 1,
        borderColor: '#eee',
        backgroundColor: '#eee',
        paddingVertical: 10,
        paddingHorizontal: 20,
        fontSize: 20,
        marginBottom: 25,
        color: '#14274E',
        borderRadius: 30,
        fontWeight: 'bold'
    },
    buttonsView: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    OK: {
        backgroundColor: '#14274E',
        paddingTop: 10,
        paddingBottom: 6,
        paddingHorizontal: 40,
        borderRadius: 30,
        fontFamily: 'Poppins_400Regular',
    },
    cancel: {
        backgroundColor: '#fff',
        paddingTop: 10,
        paddingBottom: 6,
        paddingHorizontal: 20,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: '#900D0D'
    },
    OKButton: {
        color: '#fff',
    },
    cancelButton: {
        color: '#900D0D',
        fontFamily: 'Poppins_400Regular',
    },
    noRows: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 17,
        color: '#999',
        alignSelf: 'center'
    }
})

export default Styles
