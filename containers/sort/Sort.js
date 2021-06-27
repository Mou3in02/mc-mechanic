'use strict'
import React, {useState} from "react"
import {View, Text, TouchableOpacity, Pressable, Modal, ActivityIndicator} from 'react-native'
import Styles from './Styles'
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import {countSortTasksByDate, deleteTaskFromDatabase, sortTasksByDate} from "../../utils/CRUD";
import Toast from "react-native-simple-toast";
import Task from "../../components/task/Task";
import {SwipeListView} from "react-native-swipe-list-view";
import DateTimePicker from "@react-native-community/datetimepicker";


const Sort = (props) => {

    //  pagination
    const limit = 10
    const [listNumber, setListNumber] = useState(0)
    const [isReachedEnd, setIsReachedEnd] = useState(false)
    //  data
    const [date, setDate] = useState({
        start: new Date().getTime().toString(),
        end: new Date().getTime().toString()
    })
    const [data, setData] = useState([])
    const [showDateStart, setShowDateStart] = useState(false)
    const [showDateEnd, setShowDateEnd] = useState(false)
    const [showModal, setShowModal] = useState({status: false, id: null})
    const [emptyData, setEmptyData] = useState(true)
    const [numberOfTasks, setNumberOfTasks] = useState(0)


    const onPressDateStart = () => {
        setShowDateStart(true)
    }
    const onChangeDateStart = (event, selectedDate) => {
        setShowDateStart(false)
        if (selectedDate !== undefined) {
            setDate({
                ...date,
                start: selectedDate.getTime().toString()
            })
        }
    }
    const onPressDateEnd = () => {
        setShowDateEnd(true)
    }
    const onChangeDateEnd = (event, selectedDate) => {
        setShowDateEnd(false)
        if (selectedDate !== undefined) {
            setDate({
                ...date,
                end: selectedDate.getTime().toString()
            })
        }
    }
    const formatDate = (dateTime) => {
        const date = new Date(parseInt(dateTime))
        let y = date.getFullYear()
        let m = date.getMonth() + 1
        let d = date.getDate()
        return d + '/' + m + '/' + y
    }
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
                                        <Pressable
                                            style={[Styles.deleteItems, Styles.button, Styles.buttonDelete]}
                                            onPress={() => {
                                                deleteTask(item.id)
                                            }}>
                                            <FontAwesome5 name="trash-alt" size={16} color={"#900D0D"}
                                                          style={{marginRight: 2}}/>
                                            <Text style={Styles.deleteStyle}>Supprimer</Text>
                                        </Pressable>
                                    </View>
                                    <View>
                                        <Pressable
                                            style={[Styles.button, Styles.buttonCancel]}
                                            onPress={() => setShowModal({status: false, id: null})}>
                                            <Text style={Styles.cancelStyle}>Anuuler</Text>
                                        </Pressable>
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
    const renderHiddenItem = (data, rowMap) => {
        return (
            <View style={Styles.rowBack}>
                <TouchableOpacity style={[Styles.backLeftBtn, Styles.backLeftBtnLeft]}
                                  onPress={() => onClickModify(rowMap, data.item.id, data.item.model)}
                >
                    <FontAwesome5 name={"edit"} size={18} color={'#fff'}/>
                    <Text style={Styles.backTextWhite}>Modifier</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[Styles.backRightBtn, Styles.backRightBtnRight]}
                                  onPress={() => onClickSwipeDelete(rowMap, data.item.id)}
                >
                    <FontAwesome5 name={"trash"} size={18} color={'#fff'}/>
                    <Text style={Styles.backTextWhite}>Supprimer</Text>
                </TouchableOpacity>
            </View>
        )
    }
    const renderFooter = () => {
        return (
            <View style={Styles.footerListView}>
                {isReachedEnd ?
                    <Text style={Styles.noMore}>Aucune tâche trouvée !</Text>
                    :
                    <ActivityIndicator color={'#999'} size="large"/>
                }
            </View>
        )
    }
    const closeRow = (rowMap, rowKey) => {
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        }
    }
    const deleteTask = (taskId) => {
        setShowModal({status: false, id: null})
        let taskIndex = data.findIndex(({id}) => {
            return taskId === id
        })
        if (taskIndex !== -1) {
            deleteTaskFromDatabase(taskId)
                .then(() => {
                    let newData = [...data]
                    newData.splice(taskIndex, 1)
                    setData(newData)
                    Toast.show('Tâche supprimé avec succès')
                })
                .catch((error) => {
                    Toast.show('Erreur, échec de l\'opération !', Toast.LONG)
                    console.log(error)
                })
        }
    }
    const onClickSwipeDelete = (rowMap, id) => {
        closeRow(rowMap, id)
        setShowModal({
            status: true,
            id: id
        })
    }
    const onClickModify = (rowMap, id, model) => {
        closeRow(rowMap, id)
        props.navigation.push('TaskDetails', {
            'id': id,
            'name': model
        })
    }
    const onClickSearch = () => {
        setData([])
        setListNumber(0)
        setEmptyData(false)
        setIsReachedEnd(false)
        countSortTasksByDate(date.start, date.end)
            .then((result) => {
                let {numbers} = result.rows._array[0]
                setNumberOfTasks(numbers)
                if (numbers === 0) {
                    setEmptyData(true)
                } else {
                    sortTasksByDate(date.start, date.end, limit, listNumber)
                        .then((result) => {
                            setListNumber(listNumber + limit)
                            setEmptyData(false)
                            setData(result.rows._array)
                        })
                        .catch((error) => {
                            Toast.show('Erreur, échec de l\'opération !', Toast.LONG)
                            console.log(error)
                        })
                }
            })
            .catch((error) => {
                Toast.show('Erreur, échec de l\'opération !', Toast.LONG)
                console.log(error)
            })
    }
    const loadMore = () => {
        sortTasksByDate(date.start, date.end, limit, listNumber)
            .then((result) => {
                setListNumber(listNumber + limit)
                if (result.rows._array.length > 0) {
                    result.rows._array.map((task) => {
                        return data.push(task)
                    })
                    setData(data)
                } else {
                    setIsReachedEnd(true)
                }
            })
            .catch((error) => {
                Toast.show('Erreur, échec de l\'opération !', Toast.LONG)
                console.log(error)
            })
    }
    const endOfListReached = () => {
        if (!isReachedEnd) {
            loadMore()
        } else {
            setIsReachedEnd(true)
        }
    }

    return (
        <View style={Styles.containerView}>
            <View style={Styles.headerView}>
                <View style={Styles.dateView}>
                    <FontAwesome5 name={'clock'} size={20} color={'#fff'}/>
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
                    <FontAwesome5 name={'caret-right'} size={20} color={'#fff'}/>
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
                    <FontAwesome5 name={"search"} size={28} color={'#fff'}/>
                </TouchableOpacity>
            </View>
            <View style={{flex: 1}}>
                <View style={Styles.countView}>
                    <Text style={Styles.countText}>Taches : {numberOfTasks}</Text>
                </View>
                {emptyData ?
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{fontSize: 17, color: '#999'}}>Aucune tâche trouvée !</Text>
                    </View>
                    :
                    <SwipeListView
                        contentContainerStyle={{paddingBottom: 80}}
                        data={data}
                        extraData={true}
                        renderItem={renderItem}
                        keyExtractor={item => item.id.toString()}
                        leftOpenValue={70}
                        rightOpenValue={-70}
                        previewOpenValue={-40}
                        previewOpenDelay={2000}
                        renderHiddenItem={renderHiddenItem}
                        ListFooterComponent={renderFooter}
                        onEndReached={endOfListReached}
                        onEndReachedThreshold={.8}
                    />
                }
            </View>
        </View>
    )
}

export default Sort
