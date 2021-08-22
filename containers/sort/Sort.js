import React, {useEffect, useState} from "react"
import {View, Text, TouchableOpacity, Modal, ActivityIndicator} from 'react-native'
import Styles from './Styles'
import Task from "../../components/task/Task";
import {SwipeListView} from "react-native-swipe-list-view";
import DateTimePicker from "@react-native-community/datetimepicker";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {deleteTasksAction} from "../../store/TaskActions";
import {connect} from "react-redux";


const Sort = (props) => {

    const [isLoaded, setIsLoaded] = useState(false)
    const [isReachedEnd, setIsReachedEnd] = useState(false)
    const [date, setDate] = useState({
        start: null,
        end: null
    })
    const [data, setData] = useState([])
    const [showDateStart, setShowDateStart] = useState(false)
    const [showDateEnd, setShowDateEnd] = useState(false)
    const [showModal, setShowModal] = useState({status: false, id: null})


    useEffect(() => {
        let date = new Date()
        let y = date.getFullYear()
        let m = date.getMonth()
        let d = date.getDay()
        setDate({
            start: new Date(y,m,d).getTime().toString(),
            end: new Date(y,m,d).getTime().toString()
        })
        setData(props.tasks)
        setIsLoaded(true)
    }, [])

    const renderItem = ({item, index}) => {
        return (
            <View key={item.id}
                  style={index % 2 === 0 ? {backgroundColor: '#F1F6F9'} : {backgroundColor: '#fff'}}>
                <Task model={item.model} tel={item.tel} createdAt={item.createdAt} earn={item.earn} spent={item.spent}
                      description={item.description} status={item.status}/>
                {showModal.status === true && showModal.id === item.id ?
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={showModal.status}>
                        <View style={[Styles.centeredView, {backgroundColor: 'rgba(0, 0, 0, 0.7)'}]}>
                            <View style={Styles.modalView}>
                                <Text style={Styles.deleteModelText}>{item.model}</Text>
                                <Text style={Styles.modalText}>Voulez-vous supprimer cette tâche ?</Text>
                                <View style={Styles.buttonsView}>
                                    <View>
                                        <TouchableOpacity
                                            style={[Styles.deleteItems, Styles.button, Styles.buttonDelete]}
                                            onPress={() => {
                                                props.onClickDelete(item.id)
                                            }}>
                                            <Text style={Styles.deleteStyle}>Supprimer</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View>
                                        <TouchableOpacity
                                            style={[Styles.button, Styles.buttonCancel]}
                                            onPress={() => setShowModal({status: false, id: null})}>
                                            <Text style={Styles.cancelStyle}>Annuler</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </Modal>
                    :
                    null
                }
            </View>
        )
    }
    const onClickSwipeDelete = (rowMap, id) => {
        closeRow(rowMap, id)
        setShowModal({
            status: true,
            id: id
        })
    }
    const renderHiddenItem = (data, rowMap) => {
        return (
            <View style={Styles.rowBack}>
                <TouchableOpacity style={[Styles.backLeftBtn, Styles.backLeftBtnLeft]}
                                  onPress={() => onClickModify(rowMap, data.item.id, data.item.model)}>
                    <MaterialIcons name="drive-file-rename-outline" size={25} color={'#fff'}/>
                    <Text style={Styles.backTextWhite}>Modifier</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[Styles.backRightBtn, Styles.backRightBtnRight]}
                                  onPress={() => onClickSwipeDelete(rowMap, data.item.id)}>
                    <MaterialIcons name="delete-outline" size={25} color={'#fff'}/>
                    <Text style={Styles.backTextWhite}>Supprimer</Text>
                </TouchableOpacity>
            </View>
        )
    }
    const closeRow = (rowMap, rowKey) => {
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        }
    }
    const onClickModify = (rowMap, id, model) => {
        closeRow(rowMap, id)
        props.navigation.push('TaskDetails', {
            'id': id,
            'name': model
        })
    }
    const renderFooter = () => {
        return (
            <View style={Styles.footerView}>
                {isReachedEnd ?
                    <Text style={Styles.noMore}>Rien d'autres !</Text>
                    :
                    <ActivityIndicator color={'#999'} size="large"/>
                }
            </View>
        )
    }
    const onPressDateStart = () => {
        setShowDateStart(true)
    }
    const onChangeDateStart = (event, selectedDate) => {
        setShowDateStart(false)
        if (selectedDate !== undefined) {
            let y = selectedDate.getFullYear()
            let m = selectedDate.getMonth()
            let d = selectedDate.getDay()
            setDate({
                ...date,
                start: new Date(y,m,d).getTime().toString()
            })
        }
    }
    const onPressDateEnd = () => {
        setShowDateEnd(true)
    }
    const onChangeDateEnd = (event, selectedDate) => {
        setShowDateEnd(false)
        let y = selectedDate.getFullYear()
        let m = selectedDate.getMonth()
        let d = selectedDate.getDay()
        setDate({
            ...date,
            end: new Date(y,m,d).getTime().toString()
        })
    }
    const formatDate = (dateTime) => {
        const date = new Date(parseInt(dateTime))
        let y = date.getFullYear()
        let m = date.getMonth() + 1
        let d = date.getDate()
        return d + '/' + m + '/' + y
    }
    const onClickSearch = () => {
        console.log(date)
    }

    return (
        <View style={Styles.containerView}>
            <View style={Styles.headerView}>
                <View style={Styles.dateView}>
                    <MaterialIcons name={'schedule'} size={30} color={'#fff'}/>
                </View>
                <View style={Styles.dateView}>
                    <TouchableOpacity onPress={onPressDateStart}>
                        <Text style={Styles.dateValue}>
                            {formatDate(date.start)}
                            {showDateStart && (
                                <DateTimePicker
                                    testID="dateTimePicker"
                                    value={new Date(parseInt(date.start))}
                                    mode="date"
                                    is24Hour={true}
                                    display="spinner"
                                    onChange={onChangeDateStart}
                                />
                            )}
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={Styles.dateView}>
                    <MaterialIcons name={'arrow-right'} size={30} color={'#fff'}/>
                </View>
                <View style={Styles.dateView}>
                    <TouchableOpacity onPress={onPressDateEnd}>
                        <Text style={Styles.dateValue}>
                            {formatDate(date.end)}
                            {showDateEnd && (
                                <DateTimePicker
                                    testID="dateTimePicker"
                                    value={new Date(parseInt(date.end))}
                                    mode="date"
                                    is24Hour={true}
                                    display="spinner"
                                    onChange={onChangeDateEnd}
                                />
                            )}
                        </Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={onClickSearch}>
                    <MaterialIcons name={"search"} size={35} color={'#fff'}/>
                </TouchableOpacity>
            </View>
            <View style={Styles.tasksNumberView}>
                <Text style={Styles.numberTxt}>{data.length}</Text>
            </View>
            <View style={{flex: 1}}>
                {isLoaded ?
                    data.length <= 0 ?
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{fontFamily: 'Poppins_400Regular', fontSize: 17, color: '#999'}}>Aucune tâche
                                trouvée !</Text>
                        </View>
                        :
                        <SwipeListView
                            contentContainerStyle={{paddingBottom: 80}}
                            data={data}
                            renderItem={renderItem}
                            keyExtractor={item => item.id.toString()}
                            leftOpenValue={70}
                            rightOpenValue={-70}
                            previewOpenValue={-40}
                            previewOpenDelay={2000}
                            renderHiddenItem={renderHiddenItem}
                            ListFooterComponent={renderFooter}
                            onEndReached={() => setIsReachedEnd(true)}
                        />
                    :
                    <View style={Styles.spinnerView}>
                        <ActivityIndicator size="large" color={'#47597e'}/>
                    </View>
                }
            </View>
        </View>
    )
}

const mapStateToProps = state => {
    return {
        tasks: state.tasks
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onClickDelete: (id) => dispatch(deleteTasksAction(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sort)
