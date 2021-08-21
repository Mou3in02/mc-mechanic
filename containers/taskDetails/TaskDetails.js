import React, {useState, useEffect} from 'react'
import {Text, View, TextInput, TouchableOpacity, ActivityIndicator, ScrollView, Modal} from 'react-native'
import Styles from './Styles'
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import DateTimePicker from '@react-native-community/datetimepicker'
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button'
import isEmpty from "validator/es/lib/isEmpty";
import Toast from "react-native-simple-toast";
import {editTasksAction} from "../../store/TaskActions";
import {connect} from "react-redux";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";


const TaskDetails = (props) => {

    const {id} = props.route.params
    const [isLoaded, setIsLoaded] = useState(false)
    const [data, setData] = useState(null)
    const [isValidData, setIsValidData] = useState(true)
    const [showDate, setShowDate] = useState(false)
    const [selectedRadio, setSelectedRadio] = useState(0)
    const radio_props = [
        {id: 0, label: 'Payé', value: true},
        {id: 1, label: 'Non Payé', value: false}
    ]
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        let task = props.tasks.find((task) => {
            return task.id === id
        })
        setData(task)
        setIsLoaded(true)
    }, [])

    const onPressDatePicker = () => {
        setShowDate(true)
    }
    const onChangeDate = (event, selectedDate) => {
        setShowDate(false)
        if (selectedDate !== undefined) {
            setData({
                ...data,
                createdAt: selectedDate.getTime().toString()
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
    const onChangeModel = (text) => {
        setData({
            ...data,
            model: text
        })
    }
    const onChangeTel = (text) => {
        setData({
            ...data,
            tel: text
        })
    }
    const onChangeSpent = (text) => {
        setData({
            ...data,
            spent: text
        })
    }
    const onChangeEarn = (text) => {
        setData({
            ...data,
            earn: text
        })
    }
    const onChangeDescription = (text) => {
        setData({
            ...data,
            description: text
        })
    }
    const onChangeStatus = (value) => {
        setData({
            ...data,
            status: value
        })
        value ? setSelectedRadio(0) : setSelectedRadio(1)
    }
    const onClickSave = () => {
        if (isEmpty(data.model) || isEmpty(data.model.trim())) {
            setIsValidData(false)
            Toast.show('Le champ modéle est obligatoire !', Toast.LONG)
        } else {
            setIsValidData(true)
            setShowModal(true)
            setTimeout(() => {
                setShowModal(false)
                props.navigation.push('Home')
            },1500)
            props.onClickUpdate(data)
        }
    }

    return (
        <View style={{flex: 1}}>
            {isLoaded ?
                <ScrollView keyboardShouldPersistTaps='always' style={{backgroundColor: '#fff'}}>
                    {showModal &&
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={showModal}>
                        <View style={[Styles.centeredView, {backgroundColor: 'rgba(0, 0, 0, 0.7)'}]}>
                            <View style={Styles.modalView}>
                                <MaterialIcons name={'check'} color={'#1D9741'} size={40} style={{alignSelf: 'center'}}/>
                                <Text style={Styles.modalText}>Le tâche est modifié avec succès</Text>
                            </View>
                        </View>
                    </Modal>
                    }
                    <View style={Styles.taskDetails}>
                        <View style={Styles.fieldView}>
                            <View style={Styles._30}>
                                <FontAwesome5 name="car" size={16}/>
                                <Text style={Styles.modelText}>Modèle <Text style={{color: 'red'}}>*</Text></Text>
                            </View>
                            <View style={Styles._70}>
                                <TextInput style={[Styles.modelInput, !isValidData ? Styles.invalidModelInput : null]}
                                           value={data.model.toString()}
                                           onChangeText={(text) => onChangeModel(text)}/>
                            </View>
                        </View>
                        <View style={Styles.fieldView}>
                            <View style={Styles._30}>
                                <FontAwesome5 name="mobile-alt" size={16}/>
                                <Text style={Styles.modelText}>Téléphone</Text>
                            </View>
                            <View style={Styles._70}>
                                <TextInput style={Styles.modelInput} value={data.tel.toString()}
                                           keyboardType="numeric" onChangeText={(text) => onChangeTel(text)}/>
                            </View>
                        </View>
                        <View style={Styles.fieldView}>
                            <View style={Styles._30}>
                                <FontAwesome5 name="euro-sign" size={16}/>
                                <Text style={Styles.modelText}>Gagner</Text>
                            </View>
                            <View style={Styles._70}>
                                <TextInput style={Styles.modelInput} value={data.earn.toString()}
                                           keyboardType="numeric" onChangeText={(text) => onChangeEarn(text)}/>
                            </View>
                        </View>
                        <View style={Styles.fieldView}>
                            <View style={Styles._30}>
                                <FontAwesome5 name="euro-sign" size={16}/>
                                <Text style={Styles.modelText}>Dépensé</Text>
                            </View>
                            <View style={Styles._70}>
                                <TextInput style={Styles.modelInput} value={data.spent.toString()}
                                           keyboardType="numeric" onChangeText={(text) => onChangeSpent(text)}/>
                            </View>
                        </View>
                        <View style={Styles.fieldView}>
                            <View style={Styles._30}>
                                <FontAwesome5 name="calendar-alt" size={16}/>
                                <Text style={Styles.dateText}>Date </Text>
                            </View>
                            <View style={Styles._70}>
                                <TouchableOpacity onPress={() => onPressDatePicker()}>
                                    <Text style={Styles.dateInput}>
                                        {formatDate(data.createdAt)}
                                        {showDate && (
                                            <DateTimePicker
                                                testID="dateTimePicker"
                                                value={new Date()}
                                                mode="datetime"
                                                is24Hour={true}
                                                display="spinner"
                                                onChange={onChangeDate}
                                            />
                                        )}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={Styles.statusView}>
                            <View style={Styles._30}>
                                <Text style={Styles.statusText}>État :</Text>
                            </View>
                            <View style={Styles._70}>
                                <RadioForm
                                    formHorizontal={true}
                                    animation={true}>
                                    {radio_props.map((obj) => (
                                        <RadioButton labelHorizontal={true} key={obj.id}>
                                            <RadioButtonInput
                                                obj={obj}
                                                index={obj.id}
                                                isSelected={selectedRadio === obj.id}
                                                onPress={(value) => {onChangeStatus(value)}}
                                                borderWidth={2}
                                                buttonInnerColor={'#2196f3'}
                                                buttonOuterColor={selectedRadio === obj.id ? '#2196f3' : '#999'}
                                                buttonSize={12}
                                                buttonOuterSize={20}
                                                buttonWrapStyle={{marginLeft: 5}}
                                            />
                                            <RadioButtonLabel
                                                obj={obj}
                                                index={obj.id}
                                                labelHorizontal={false}
                                                onPress={(value) => {
                                                    onChangeStatus(value)
                                                }}
                                                labelStyle={{
                                                    fontSize: 14,
                                                    color: '#47597e',
                                                    paddingLeft: 5,
                                                    marginRight: 10
                                                }}
                                            />
                                        </RadioButton>
                                    ))}
                                </RadioForm>
                            </View>
                        </View>
                        <View style={Styles.descriptionView}>
                            <View style={Styles.descriptionTextView}>
                                <Text style={Styles.modelText}>Déscription</Text>
                            </View>
                            <View style={Styles.descriptionInputView}>
                                <TextInput style={Styles.descriptionInput} multiline={true}
                                           value={data.description.toString()}
                                           onChangeText={(text) => onChangeDescription(text)}/>
                            </View>
                        </View>
                        <View style={Styles.saveView}>
                            <TouchableOpacity style={Styles.saveButton} onPress={onClickSave}>
                                <View style={Styles.saveItems}>
                                    <Text style={Styles.saveText}>Mettre à jour</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={Styles.cancelView}>
                            <TouchableOpacity style={Styles.cancelButton} onPress={() => props.navigation.navigate('Home')}>
                                <View style={Styles.cancelItems}>
                                    <Text style={Styles.cancelText}>Annuler</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
                :
                <View style={Styles.spinnerView}>
                    <ActivityIndicator size="large" color={'#293b5f'}/>
                </View>
            }
        </View>
    )
}

const mapStateToProps = (state) => {
    return {
        tasks: state.tasks
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onClickUpdate: (task) => dispatch(editTasksAction(task))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskDetails)
