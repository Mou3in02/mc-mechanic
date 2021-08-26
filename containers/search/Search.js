import React, {useEffect, useState} from "react"
import {View, Text, TextInput, TouchableOpacity, Modal, ActivityIndicator, Keyboard} from 'react-native'
import Styles from './Styles'
import Task from "../../components/task/Task";
import {SwipeListView} from "react-native-swipe-list-view";
import isEmpty from 'validator/es/lib/isEmpty'
import {connect} from "react-redux";
import {deleteTasksAction} from "../../store/TaskActions";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import CheckBox from '@react-native-community/checkbox'


const Search = (props) => {

    const [isLoaded, setIsLoaded] = useState(false)
    const [data, setData] = useState([])
    const [searchInput, setSearchInput] = useState('')
    const [showModal, setShowModal] = useState({status: false, id: null, model: null})
    const [isReachedEnd, setIsReachedEnd] = useState(false)
    const [payedCheck, setPayedCheck] = useState(true)
    const [nonPayedCheck, setNonPayedCheck] = useState(true)


    useEffect(() => {
        setData(props.tasks)
        setIsLoaded(true)
    }, [])

    const renderItem = ({item, index}) => {
        return (
            <View key={item.id} style={index % 2 === 0 ? {backgroundColor: '#F1F6F9'} : {backgroundColor: '#fff'}}>
                <Task model={item.model} tel={item.tel} createdAt={item.createdAt} earn={item.earn} spent={item.spent}
                      description={item.description} status={item.status}/>
            </View>
        )
    }
    const onClickSwipeDelete = (rowMap, id, model) => {
        closeRow(rowMap, id)
        setShowModal({
            status: true,
            id: id,
            model: model
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
                                  onPress={() => onClickSwipeDelete(rowMap, data.item.id, data.item.model)}>
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
    const getTasksByStatus = (status) => {
        if (props.tasks.length > 0){
            return props.tasks.filter((task) => {
                return task.status === status
            })
        }
        else return []
    }
    const getTasksByInput = (tasks, input) => {
        if (isEmpty(input) && isEmpty(input.trim())) return tasks
        if (tasks.length > 0) {
            let filterTasksByModel = tasks.filter((task) => {
                return task.model.includes(input)
            })
            if (filterTasksByModel.length > 0) return filterTasksByModel
            else {
                return tasks.filter((task) => {
                    return task.tel.includes(input)
                })
            }
        }
        return []
    }
    const onClickDeleteBtn = (id) => {
        props.onClickDelete(id)
        setShowModal({status: false, id: null, model: null})
    }
    const onClickSearch = () => {
        Keyboard.dismiss()
        if (payedCheck && !nonPayedCheck) {
            let payedTasks = getTasksByStatus(1)
            let filterTasks = getTasksByInput(payedTasks,searchInput)
            setData(filterTasks)
        } else if (nonPayedCheck && !payedCheck) {
            let payedTasks = getTasksByStatus(0)
            let filterTasks = getTasksByInput(payedTasks,searchInput)
            setData(filterTasks)
        }
        else {
            let filterTasks = getTasksByInput(props.tasks,searchInput)
            setData(filterTasks)
        }
    }

    return (
        <View style={Styles.containerView}>
            <View style={Styles.headerView}>
                <TextInput style={Styles.searchInput} placeholder="model, tel ..." value={searchInput}
                           onChangeText={(text) => setSearchInput(text)}/>
                <TouchableOpacity onPress={onClickSearch}>
                    <MaterialIcons name={"search"} size={40} color={'#fff'}/>
                </TouchableOpacity>
            </View>
            <View style={Styles.optionView}>
                <View style={Styles.payedView}>
                    <Text style={Styles.checkboxLabel}>Payé</Text>
                    <CheckBox
                        tintColors={{true: '#3DB2FF', false: '#fff'}}
                        disabled={false}
                        value={payedCheck}
                        onValueChange={(newValue) => setPayedCheck(newValue)}
                    />
                </View>
                <View style={Styles.NonPayedView}>
                    <Text style={Styles.checkboxLabel}>Non payé</Text>
                    <CheckBox
                        tintColors={{true: '#3DB2FF', false: '#fff'}}
                        disabled={false}
                        value={nonPayedCheck}
                        onValueChange={(newValue) => setNonPayedCheck(newValue)}
                    />
                </View>
                <Text style={Styles.countText}>{data.length}</Text>
            </View>
            <View style={{flex: 1}}>
                {isLoaded ?
                    data.length <= 0 ?
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{fontFamily: 'Poppins_400Regular', fontSize: 17, color: '#999'}}>Aucune tâche
                                trouvée !</Text>
                        </View>
                        :
                        <View>
                            {showModal.status &&
                            <Modal
                                animationType="fade"
                                transparent={true}
                                visible={showModal.status}>
                                <View style={[Styles.centeredView, {backgroundColor: 'rgba(0, 0, 0, 0.7)'}]}>
                                    <View style={Styles.modalView}>
                                        <Text style={Styles.deleteModelText}>{showModal.model}</Text>
                                        <Text style={Styles.modalText}>Voulez-vous supprimer cette tâche ?</Text>
                                        <View style={Styles.buttonsView}>
                                            <View>
                                                <TouchableOpacity
                                                    style={[Styles.deleteItems, Styles.button, Styles.buttonDelete]}
                                                    onPress={() => {onClickDeleteBtn(showModal.id)}}>
                                                    <Text style={Styles.deleteStyle}>Supprimer</Text>
                                                </TouchableOpacity>
                                            </View>
                                            <View>
                                                <TouchableOpacity
                                                    style={[Styles.button, Styles.buttonCancel]}
                                                    onPress={() => setShowModal({status: false, id: null, model: null})}>
                                                    <Text style={Styles.cancelStyle}>Annuler</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </Modal>
                            }
                            {props.tasks.length > 0 ?
                                <SwipeListView
                                    contentContainerStyle={{paddingBottom: 80}}
                                    data={props.tasks}
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
                                <View style={Styles.noRowsView}>
                                    <Text style={Styles.noRowsText}>Aucune tâche trouvée</Text>
                                </View>
                            }
                        </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(Search)
