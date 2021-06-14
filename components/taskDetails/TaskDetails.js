import React from 'react'
import {Text, View, TextInput} from 'react-native'
import Styles from './Styles'
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'

const TaskDetails = () => {

    // const {id} = props.route.params
    // console.log(id)

    return (
        <KeyboardAwareScrollView>
            <View style={Styles.taskDetails}>
                <View style={Styles.actionView}>
                    <View style={Styles.deleteView}>
                        <FontAwesome5 name="trash" size={18} color="darkred"/>
                        <Text style={Styles.deleteText}>Supprimer</Text>
                    </View>
                    <View style={Styles.editView}>
                        <FontAwesome5 name="edit" size={18} color="green"/>
                        <Text style={Styles.editText}>Modifier</Text>
                    </View>
                </View>
                <View style={Styles.detailsView}>
                    <View style={Styles.modelView}>
                        <FontAwesome5 name="car" size={16}/>
                        <Text style={Styles.modelText}>Modèle :</Text>
                        <TextInput style={Styles.modelInput}/>
                    </View>
                    <View style={Styles.modelView}>
                        <FontAwesome5 name="mobile-alt" size={16}/>
                        <Text style={Styles.modelText}>Téléphone :</Text>
                        <TextInput style={Styles.modelInput}/>
                    </View>
                    <View style={Styles.modelView}>
                        <FontAwesome5 name="calendar-alt" size={16}/>
                        <Text style={Styles.modelText}>Date :</Text>
                        <TextInput style={Styles.modelInput}/>
                    </View>
                    <View style={Styles.modelView}>
                        <FontAwesome5 name="euro-sign" size={16}/>
                        <Text style={Styles.modelText}>Dépensé :</Text>
                        <TextInput style={Styles.modelInput}/>
                    </View>
                    <View style={Styles.modelView}>
                        <FontAwesome5 name="euro-sign" size={16}/>
                        <Text style={Styles.modelText}>Gagner :</Text>
                        <TextInput style={Styles.modelInput}/>
                    </View>
                    <View style={Styles.descriptionView}>
                        <View style={Styles.descriptionTextView}>
                            <Text style={Styles.modelText}>Déscription :</Text>
                        </View>
                        <View style={Styles.descriptionInputView}>
                            <TextInput style={Styles.descriptionInput}/>
                        </View>
                    </View>
                </View>
            </View>
        </KeyboardAwareScrollView>
    )
}

export default TaskDetails
