import {StyleSheet} from 'react-native'

const Styles = StyleSheet.create({
    containerView:{
        backgroundColor: '#fff',
        flex: 1,
    },
    headerView: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: 50,
        alignItems: 'center',
        paddingHorizontal: 12,
        backgroundColor: '#14274E'
    },
    headerTxt:{
        color: '#fff',
        fontSize: 18,
        fontFamily: 'Poppins_400Regular',
    },
    bodyView:{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    exportView:{
        // backgroundColor: '#f00',
        width: '100%',
        height: '50%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    importView:{
        // backgroundColor: '#0f0',
        width: '100%',
        height: '50%'
    },
    exportBtn:{
        flexDirection: 'row',
        // justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-start',
        backgroundColor: '#14274E',
        paddingHorizontal: 40,
        paddingVertical: 8,
        borderRadius: 50
    },
    exportTxt:{
        color: '#fff',
        fontSize: 14,
        fontFamily: 'Poppins_400Regular',
        marginRight: 10
    }

})

export default Styles
