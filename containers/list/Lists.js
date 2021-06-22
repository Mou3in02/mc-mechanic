import React, {useState, useEffect} from 'react';
import {View, Pressable, Text, Modal, ActivityIndicator, TouchableOpacity} from 'react-native';
import Styles from "./Styles"
import Task from "../../components/task/Task";
import {getTasks, countTasks, deleteTaskFromDatabase} from "../../utils/DatabaseConnection";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import {SwipeListView} from 'react-native-swipe-list-view';
import Toast from "react-native-simple-toast";


const Lists = (props) => {

    const [isLoaded, setIsLoaded] = useState(false)
    const [numberOfTasks, setNumberOfTasks] = useState(0)
    const [listNumber, setListNumber] = useState(0)
    const limit = 10
    const [data, setData] = useState([])
    const [dataIsEmpty, setDataIsEmpty] = useState(false)
    const [hiddenLoadMore, setHiddenLoadMore] = useState(true)
    const [showModal, setShowModal] = useState({status: false, id: null})
    const [isScrollLoading, setIsScrollLoading] = useState(false)

    useEffect(() => {
        countTasks()
            .then((result) => {
                let {numbers} = result.rows._array[0]
                setNumberOfTasks(numbers)
                if (numbers === 0) {
                    setDataIsEmpty(true)
                    setIsLoaded(true)
                } else {
                    getTasks(limit, listNumber)
                        .then((result) => {
                            setData(result.rows._array)
                            setIsLoaded(true)
                            setListNumber(listNumber + limit)
                        })
                        .catch((error) => {
                            Toast.show('Erreur, échec de l\'opération !', Toast.LONG)
                            console.log(error)
                        })
                }
            }).catch((error) => {
                Toast.show('Erreur, échec de l\'opération !', Toast.LONG)
                console.log(error)
            })
    }, [])

    const renderItem = ({item}) => {
        return (
            <Pressable key={item.id}
                       style={item.id % 2 === 0 ? {backgroundColor: '#f6f6f6'} : {backgroundColor: '#fff'}}>
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
            </Pressable>
        )
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
                    setNumberOfTasks(numberOfTasks - 1)
                    setListNumber(listNumber - 1)
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
    const closeRow = (rowMap, rowKey) => {
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        }
    }
    const onClickModify = (rowMap, id, model) => {
        closeRow(rowMap, id)
        props.navigation.navigate('TaskDetails', {
            'id': id,
            'name': model
        })
    }
    const renderFooter = () => {
        return (
            <View>
                {hiddenLoadMore ?
                    <Pressable style={{marginTop: 30}} onPress={loadMore}>
                        <View style={{
                            paddingVertical: 10,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderWidth: 1,
                            borderColor: '#293b5f',
                            marginHorizontal: 50,
                            borderRadius: 20
                        }}>
                            {isScrollLoading ? <ActivityIndicator color={'#293b5f'} size="small"/> : null}
                            <Text style={{fontSize: 14, color: '#293b5f', marginLeft: 5}}>
                                afficher plus ...
                            </Text>
                        </View>
                    </Pressable>
                    :
                    null
                }
            </View>
        )
    }
    const loadMore = () => {
        setIsScrollLoading(true)
        getTasks(limit, listNumber)
            .then((result) => {
                setIsScrollLoading(false)
                if (result.rows._array.length === 0) {
                    setHiddenLoadMore(false)
                } else {
                    result.rows._array.map((task) => {
                        return data.push(task)
                    })
                    setData(data)
                    setListNumber(listNumber + limit)
                }
            })
            .catch((error) => {
                setIsScrollLoading(false)
                Toast.show('Erreur, échec de l\'opération !', Toast.LONG)
                console.log(error)
            })
    }

    return (
        <View style={Styles.listsView}>
            {isLoaded ?
                <View style={{flex: 1}}>
                    <View style={Styles.headerView}>
                        <View style={Styles.headerContent}>
                            <FontAwesome5 name={"toolbox"} size={15} color={'#333'}/>
                            <Text style={Styles.tasksTxt}>Tâches : </Text>
                            <Text style={Styles.numberTxt}>{numberOfTasks}</Text>
                        </View>
                        <View style={Styles.addView}>
                            <Pressable onPress={() => props.navigation.navigate('AddTask')}>
                                <FontAwesome5 name={"plus-circle"} color={'#293b5f'} size={32}/>
                            </Pressable>
                        </View>
                    </View>
                    {!dataIsEmpty ?
                        <SwipeListView
                            contentContainerStyle={{paddingBottom: 40}}
                            data={data}
                            extraData={true}
                            renderItem={renderItem}
                            keyExtractor={item => item.id.toString()}
                            leftOpenValue={70}
                            rightOpenValue={-70}
                            previewRowKey={'0'}
                            previewOpenValue={-40}
                            previewOpenDelay={2000}
                            renderHiddenItem={renderHiddenItem}
                            ListFooterComponent={renderFooter}
                        />
                        :
                        <View style={Styles.noRowsView}>
                            <Text style={Styles.noRowsText}>Aucune tâche trouvée </Text>
                            <FontAwesome5 name="frown-open" color={'#999'} size={22}/>
                        </View>
                    }
                </View>
                :
                <View style={Styles.spinnerView}>
                    <ActivityIndicator size="large" color={'#47597e'}/>
                </View>
            }
        </View>
    )
}

export default Lists
