import React,{useState} from 'react'
import {Text, View, TextInput, TouchableOpacity, Pressable} from 'react-native'
import Styles from './Styles'
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import DateTimePicker from '@react-native-community/datetimepicker'


const TaskDetails = () => {

    // const {id} = props.route.params
    // console.log(new Date())
    const data = {
        id: 6,
        model: 'Megan 3',
        tel: 29284808,
        date: 190000,
        earn: 220,
        spent: 170,
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab assumenda eum quae.',
        status: true
    }
    const [editMode, setEditMode] = useState(false)
    const [show, setShow] = useState(false)
    const showDatePicker = () => {
        setShow(true)
    }
    const onPressDatePicker = () => {
        showDatePicker()
    }
    const onChange = (event, selectedDate) => {
        setShow(false)
        console.log(selectedDate)
    }
    const formatDate = (date) => {
        let y = date.getFullYear()
        let m = date.getMonth() + 1
        let d = date.getDate()
        let h = date.getUTCHours()
        let i = date.getMinutes()
        return y+'-'+m+'-'+d+'   '+h+':'+i
    }

    return (
        <KeyboardAwareScrollView style={{backgroundColor: '#fff'}}>
            <View style={Styles.taskDetails}>
                <View style={Styles.actionView}>
                    <View style={Styles.deleteView}>
                        <FontAwesome5 name="trash" size={18} color="#8b008b"/>
                        <Text style={Styles.deleteText}>Supprimer</Text>
                    </View>
                    <View style={Styles.editView}>
                        <FontAwesome5 name="edit" size={18} color="#17A2B8"/>
                        <Text style={Styles.editText}>Modifier</Text>
                    </View>
                </View>
                <View style={Styles.detailsView}>
                    <View style={Styles.fieldView}>
                        <View style={Styles._30}>
                            <FontAwesome5 name="car" size={16}/>
                            <Text style={Styles.modelText}>Modèle :</Text>
                        </View>
                        <View style={Styles._70}>
                            <TextInput style={Styles.modelInput} value={data.model.toString()} editable={editMode}/>
                        </View>
                    </View>
                    <View style={Styles.fieldView}>
                        <View style={Styles._30}>
                            <FontAwesome5 name="mobile-alt" size={16}/>
                            <Text style={Styles.modelText}>Téléphone :</Text>
                        </View>
                        <View style={Styles._70}>
                            <TextInput style={Styles.modelInput} value={data.tel.toString()} editable={editMode} />
                        </View>
                    </View>
                    <View style={Styles.fieldView}>
                        <View style={Styles._30}>
                            <FontAwesome5 name="euro-sign" size={16}/>
                            <Text style={Styles.modelText}>Dépensé :</Text>
                        </View>
                        <View style={Styles._70}>
                            <TextInput style={Styles.modelInput} value={data.spent.toString()} editable={editMode} />
                        </View>
                    </View>
                    <View style={Styles.fieldView}>
                        <View style={Styles._30}>
                            <FontAwesome5 name="euro-sign" size={16}/>
                            <Text style={Styles.modelText}>Gagner :</Text>
                        </View>
                        <View style={Styles._70}>
                            <TextInput style={Styles.modelInput} value={data.earn.toString()} editable={editMode} />
                        </View>
                    </View>
                    <View style={Styles.fieldView}>
                        <FontAwesome5 name="calendar-alt" size={16} />
                        <Text style={Styles.dateText}>Date :</Text>
                        <TouchableOpacity disabled={!editMode} onPress={() => onPressDatePicker()}>
                            <TextInput style={Styles.dateInput} editable={editMode} pointerEvents="none" value={formatDate(new Date())} />
                            {show && (
                                <DateTimePicker
                                    testID="dateTimePicker"
                                    value={new Date()}
                                    mode="datetime"
                                    is24Hour={true}
                                    display="spinner"
                                    onChange={onChange}
                                />
                            )}
                        </TouchableOpacity>
                    </View>
                    <View style={Styles.descriptionView}>
                        <View style={Styles.descriptionTextView}>
                            <Text style={Styles.modelText}>Déscription :</Text>
                        </View>
                        <View style={Styles.descriptionInputView}>
                            <TextInput style={Styles.descriptionInput} multiline={true} editable={editMode} value={data.description.toString()} />
                        </View>
                    </View>
                    <View style={Styles.saveView}>
                        <Pressable style={Styles.saveButton} onPress={() => {console.log('Pressed !')}}>
                            <View style={Styles.saveItems}>
                                <FontAwesome5 name="save" color="#fff" size={18} />
                                <Text style={Styles.saveText}>Enregistrer</Text>
                            </View>
                        </Pressable>
                    </View>
                </View>
            </View>
        </KeyboardAwareScrollView>
    )
}

export default TaskDetails
