import React, {useState, useEffect} from 'react';
import {View, Pressable, Text, Modal, ActivityIndicator, TouchableOpacity} from 'react-native';
import Styles from "./Styles"
import Task from "../../components/task/Task";
import {getTasks, deleteTaskFromDatabase} from "../../utils/DatabaseConnection";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import {SwipeListView} from 'react-native-swipe-list-view';


const Lists = (props) => {

    const [isLoaded, setIsLoaded] = useState(false)
    const [data, setData] = useState([])
    const [showModal, setShowModal] = useState({status: false, id: null})

    useEffect(() => {
        getTasks()
            .then((result) => {
                setData(result.rows._array)
                setIsLoaded(true)
            })
            .catch((error) => console.log(error))
    }, [])

    const renderItem = ({item}) => {
        return (
            <Pressable key={item.id} onLongPress={() => {
                onPress(item.id, item.model)
            }} style={item.id % 2 === 0 ? {backgroundColor: '#f6f6f6'} : {backgroundColor: '#fff'}}>
                <Task model={item.model} tel={item.tel} date={item.createdAt} earn={item.earn} spent={item.spent}
                      description={item.description} status={item.status}/>
                {showModal.status === true && showModal.id === item.id ?
                        <Modal
                            animationType="fade"
                            transparent={true}
                            visible={showModal.status}>
                            <View style={[Styles.centeredView,{backgroundColor: 'rgba(0, 0, 0, 0.7)'}]}>
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
    const onPress = (id) => {
        setShowModal({
            status: true,
            id: id
        })
    }
    const deleteTask = (taskId) => {
        setShowModal({status: false, id: null})
        let taskIndex = data.findIndex(({id}) => {
            return taskId === id
        })
        if (taskIndex !== -1) {
            deleteTaskFromDatabase(taskId)
                .then(() => {
                    data.splice(taskIndex, 1)
                    setData(data)
                })
                .catch((error) => {
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

    return (
        <View style={[Styles.listsView]}>
            {isLoaded ?
                <View>
                    <View style={Styles.listsFilter}>
                    </View>
                    {data.length > 0 ?
                        <SwipeListView
                            contentContainerStyle={{paddingBottom: 150}}
                            data={data}
                            renderItem={renderItem}
                            keyExtractor={item => item.id.toString()}
                            leftOpenValue={70}
                            rightOpenValue={-70}
                            previewRowKey={'0'}
                            previewOpenValue={-40}
                            previewOpenDelay={2000}
                            renderHiddenItem={renderHiddenItem}
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
