import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Modal, Text, TouchableOpacity, View} from 'react-native';
import Styles from "./Styles"
import Task from "../../components/task/Task";
import {SwipeListView} from 'react-native-swipe-list-view';
import {connect} from "react-redux";
import {deleteTasksAction, getTasksAction} from "../../store/TaskActions";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";


const Lists = (props) => {

    const [isReachedEnd, setIsReachedEnd] = useState(false)
    const [showModal, setShowModal] = useState({status: false, id: null, model: null})

    useEffect(() => {
        props.onLoadHome()
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
    const onClickDeleteBtn = (id) => {
        props.onClickDelete(id)
        setShowModal({status: false, id: null, model: null})
    }

    return (
        <View style={Styles.listsView}>
            {props.isLoaded ?
                <View style={{flex: 1}}>
                    <View style={Styles.headerView}>
                        <View style={Styles.headerContent}>
                            <MaterialIcons name={"handyman"} size={20} color={'#fff'}/>
                            <Text style={Styles.tasksTxt}>Tâches : </Text>
                            <Text style={Styles.numberTxt}>{props.tasks.length}</Text>
                        </View>
                    </View>
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
    )
}

const mapStateToProps = (state) => {
    return {
        tasks: state.tasks,
        isLoaded: state.isLoaded
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onLoadHome: () => dispatch(getTasksAction()),
        onClickDelete: (id) => dispatch(deleteTasksAction(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Lists)
