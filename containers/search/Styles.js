import {StyleSheet} from 'react-native'

const Styles = StyleSheet.create({
    containerView:{
        flex: 1,
        backgroundColor: '#fff'
    },
    headerView: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: 50,
        alignItems: 'center',
        paddingHorizontal: 12,
        backgroundColor: '#14274E'
    },
    searchInput:{
        height: 40,
        width: '75%',
        borderWidth: 2,
        borderColor: '#fff',
        borderRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 10,
        fontSize: 16,
        backgroundColor: '#fff',
        color: '#14274E'
    },
    countView:{
        marginTop: 6,
        height: 30,
    },
    countText:{
        fontSize: 15,
        // fontWeight: 'bold',
        color: '#394867',
        textAlign: 'right',
        marginRight: 10
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
    button: {
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 20
        // elevation: 2
    },
    buttonDelete: {
        borderWidth: 1,
        borderColor: "#900D0D",
    },
    buttonCancel: {
        backgroundColor: "#14274E",
    },
    deleteStyle: {
        color: "#900D0D",
        textAlign: "center"
    },
    cancelStyle:{
        color: "#fff",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        fontSize: 15,
        marginBottom: 25,
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
        color: '#900D0D',
        fontSize: 16,
        marginLeft: 5
    },
    deleteModelText:{
        marginBottom: 10,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        color: '#900D0D'
    },
    spinnerView:{
        flex: 1,
        justifyContent: 'center'
    },
    // swipe list
    backTextWhite: {
        color: '#FFF',
        fontSize: 10,
        fontWeight: 'bold'
    },
    rowFront: {
        alignItems: 'center',
        backgroundColor: '#fff',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        justifyContent: 'center',
        height: 50,
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#fff',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
    },
    backLeftBtn:{
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 70,
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 70,
    },
    backLeftBtnLeft: {
        backgroundColor: '#14274E',
        left: 0,
    },
    backRightBtnRight: {
        backgroundColor: '#900D0D',
        right: 0,
    },
    noRowsView:{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    noRowsText:{
        fontSize: 18,
        color: '#999',
        fontFamily: 'Poppins_400Regular',
    },
})

export default Styles
