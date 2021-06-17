import React, {useState, useEffect} from 'react';
import {View, FlatList, Pressable, Text, Modal} from 'react-native';
import Styles from "./Styles"
import Task from "../../components/task/Task";
import {getTasks} from "../../utils/DatabaseConnection";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";


const Lists = (props) => {

    const [data, setData] = useState([])
    const [showModal, setShowModal] = useState({
        status: false,
        id: null
    })
    const [refreshFlatlist, setRefreshFlatlist] = useState(false)

    useEffect(() => {
        getTasks()
            .then((result) => {
                setData(result.rows._array)
            })
            .catch((error) => console.log(error))
    }, [])

    const renderItem = ({item}) => {
        return (
            <Pressable onPress={() => {onPress(item.id, item.model)}} style={item.id % 2 === 0 ? {backgroundColor: '#f6f6f6'} : {backgroundColor: '#fff'}}>
                <Task model={item.model} tel={item.tel} date={item.createdAt} earn={item.earn} spent={item.spent}
                      description={item.description} status={item.status}/>
                {showModal.status === true && showModal.id === item.id ?
                    <View>
                        <Modal
                            animationType="fade"
                            transparent={true}
                            visible={showModal.status}>
                            <View style={Styles.centeredView}>
                                <View style={Styles.modalView}>
                                    <Text style={Styles.deleteModelText}>{item.model}</Text>
                                    <Text style={Styles.modalText}>Voulez-vous supprimer cette tâche ?</Text>
                                    <View style={Styles.buttonsView}>
                                        <View>
                                            <Pressable
                                                style={[Styles.deleteItems, Styles.button, Styles.buttonDelete]}
                                                onPress={() => {onPressDeleteTask(item.id)}}>
                                                <FontAwesome5 name="trash-alt" size={16} color={"#900"} style={{marginRight: 2}}/>
                                                <Text style={Styles.deleteStyle}>Supprimer</Text>
                                            </Pressable>
                                        </View>
                                        <View>
                                            <Pressable
                                                style={[Styles.button, Styles.buttonCancel]}
                                                onPress={() => setShowModal({status: false,id:null})}>
                                                <Text style={Styles.cancelStyle}>Anuuler</Text>
                                            </Pressable>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </Modal>
                    </View>
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
        // props.navigation.navigate('TaskDetails', {
        //     id: id,
        //     name: model
        // })
    }
    const onPressDeleteTask = (taskId) => {
        let taskIndex = data.findIndex(({id}) => {
            return taskId === id
        })
        if (taskIndex !== -1){
            let taskToDelete = data.splice(0,1,taskIndex)
            setData(data)
            setRefreshFlatlist(true)
            console.log(data)
        }
    }
    // const onRefreshFlatList = () => {
    //     setRefreshFlatlist(true)
    //     getTasks()
    //         .then((result) => {
    //             setData(result.rows._array)
    //         })
    //         .catch((error) => console.log(error))
    // }

    return (

        <View style={Styles.listsView} opacity={showModal.status ? .1 : 1}>
            <View style={Styles.listsFilter}>
            </View>
            {data.length > 0 ?
                <View>
                    <FlatList
                        contentContainerStyle={{paddingBottom: 150}}
                        data={data}
                        renderItem={renderItem}
                        keyExtractor={item => item.id.toString()}
                        extraData={refreshFlatlist}
                    />
                </View>
                :
                <View style={Styles.noRowsView}>
                    <Text style={Styles.noRowsText}>Aucune tâche trouvée </Text>
                    <FontAwesome5 name="frown-open" color={'#999'} size={22}/>
                </View>
            }
        </View>
    )
}

export default Lists
