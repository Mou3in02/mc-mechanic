'use strict'
import React, {useState} from "react"
import {View, Text, TextInput, TouchableOpacity, Pressable, Modal, Keyboard} from 'react-native'
import Styles from './Styles'
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import {deleteTaskFromDatabase, searchTasksByModel} from "../../utils/DatabaseConnection";
import Toast from "react-native-simple-toast";
import Task from "../../components/task/Task";
import {SwipeListView} from "react-native-swipe-list-view";
import isEmpty from 'validator/es/lib/isEmpty'


const Search = (props) => {

    const [data, setData] = useState([])
    const [numberRows, setNumberRows] = useState(0)
    const [searchInput, setSearchInput] = useState('')
    const [isEmptyInput, setIsEmptyInput] = useState(false)
    const [showModal, setShowModal] = useState({status: false, id: null})

    const onChangeText = (text) => {
        setSearchInput(text)
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
        Keyboard.dismiss()
        if (!isEmpty(searchInput.trim())) {
            setIsEmptyInput(false)
            searchTasksByModel(searchInput.trim())
                .then((result) => {
                    setNumberRows(result.rows._array.length)
                    setData(result.rows._array)
                })
                .catch((error) => {
                    Toast.show('Erreur, échec de l\'opération !', Toast.LONG)
                    console.log(error)
                })
        } else {
            setSearchInput('')
            setIsEmptyInput(true)
            Toast.show('Le champs est obligatoire !', Toast.LONG)
        }
    }


    return (
        <View style={Styles.containerView}>
            <View style={Styles.headerView}>
                <TextInput style={[Styles.searchInput, {borderColor: isEmptyInput ? '#900D0D' : '#999'}]}
                           placeholder="rechercher ..." value={searchInput} onChangeText={(text) => onChangeText(text)}/>
                <TouchableOpacity onPress={onClickSearch}>
                    <FontAwesome5 name={"search"} size={28} color={'#14274E'}/>
                </TouchableOpacity>
            </View>
            <View style={Styles.countView}>
                <Text style={Styles.countText}>Lignes : {numberRows}</Text>
            </View>
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
            />
        </View>
    )
}

export default Search
