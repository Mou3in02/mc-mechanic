import React from "react";
import {View, Text, Modal, TouchableOpacity} from "react-native"
import Task from "../task/Task";
import Styles from "../../containers/list/Styles";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";


const Item = (props) => {

    return (
        <View key={props.item.id}
              style={props.index % 2 === 0 ? {backgroundColor: '#F1F6F9'} : {backgroundColor: '#fff'}}>
            <Task model={props.item.model} tel={props.item.tel} createdAt={props.item.createdAt} earn={props.item.earn} spent={props.item.spent}
                  description={props.item.description} status={props.item.status}/>
            {/*{showModal.status === true && showModal.id === item.id ?*/}
            {/*    <Modal*/}
            {/*        animationType="fade"*/}
            {/*        transparent={true}*/}
            {/*        visible={showModal.status}>*/}
            {/*        <View style={[Styles.centeredView, {backgroundColor: 'rgba(0, 0, 0, 0.7)'}]}>*/}
            {/*            <View style={Styles.modalView}>*/}
            {/*                <Text style={Styles.deleteModelText}>{item.model}</Text>*/}
            {/*                <Text style={Styles.modalText}>Voulez-vous supprimer cette tâche ?</Text>*/}
            {/*                <View style={Styles.buttonsView}>*/}
            {/*                    <View>*/}
            {/*                        <TouchableOpacity*/}
            {/*                            style={[Styles.deleteItems, Styles.button, Styles.buttonDelete]}*/}
            {/*                            onPress={() => {*/}
            {/*                                deleteTask(item.id)*/}
            {/*                            }}>*/}
            {/*                            <FontAwesome5 name="trash-alt" size={16} color={"#900D0D"}*/}
            {/*                                          style={{marginRight: 2}}/>*/}
            {/*                            <Text style={Styles.deleteStyle}>Supprimer</Text>*/}
            {/*                        </TouchableOpacity>*/}
            {/*                    </View>*/}
            {/*                    <View>*/}
            {/*                        <TouchableOpacity*/}
            {/*                            style={[Styles.button, Styles.buttonCancel]}*/}
            {/*                            onPress={() => setShowModal({status: false, id: null})}>*/}
            {/*                            <Text style={Styles.cancelStyle}>Anuuler</Text>*/}
            {/*                        </TouchableOpacity>*/}
            {/*                    </View>*/}
            {/*                </View>*/}
            {/*            </View>*/}
            {/*        </View>*/}
            {/*    </Modal>*/}
            {/*    :*/}
            {/*    null*/}
            {/*}*/}
        </View>
    )
}

export default Item
