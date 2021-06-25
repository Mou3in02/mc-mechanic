import React, {useState, useEffect} from 'react'
import {Text, View, TextInput, TouchableOpacity, ActivityIndicator} from 'react-native'
import Styles from './Styles'
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import DateTimePicker from '@react-native-community/datetimepicker'
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button'
import isEmpty from "validator/es/lib/isEmpty";
import Toast from "react-native-simple-toast";
import {getTaskById, updateTaskFromDatabase} from "../../utils/CRUD";


const TaskDetails = (props) => {

    const {id} = props.route.params
    const [isLoaded, setIsLoaded] = useState(false)
    const [data, setData] = useState({
        model: '',
        tel: '',
        createdAt: '',
        earn: '',
        spent: '',
        description: '',
        status: true
    })
    const [isValidData, setIsValidData] = useState(true)
    const [showDate, setShowDate] = useState(false)
    const [selectedRadio, setSelectedRadio] = useState(0)
    const radio_props = [
        {id: 0, label: 'Effectué', value: true},
        {id: 1, label: 'Non effectué', value: false}
    ]

    useEffect(() => {
        getTaskById(id)
            .then((result) => {
                setData(result.rows._array[0])
                if (!result.rows._array[0].status){
                    setSelectedRadio(1)
                }
                setIsLoaded(true)
            })
            .catch((error) => {
                Toast.show('Erreur, échec de l\'opération !', Toast.LONG)
                console.log(error)
            })
    }, [])

    const showDatePicker = () => {
        setShowDate(true)
    }
    const onPressDatePicker = () => {
        showDatePicker()
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
        let h = date.getUTCHours()
        let i = date.getMinutes()
        return d + '/' + m + '/' + y + '  ' + h + ':' + i
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
        if (isEmpty(data.model.trim()) === true) {
            setIsValidData(false)
            Toast.show('Le champ modéle est obligatoire !', Toast.LONG)
        } else {
            setIsValidData(true)
            updateTaskFromDatabase(data)
                .then(() => {
                    Toast.show('Tâche modifié avec succès')
                    props.navigation.push('Home')
                })
                .catch((error) => {
                    Toast.show('Erreur, échec de l\'opération !', Toast.LONG)
                    console.log(error)
                })
        }
    }

    return (
        <View style={{flex: 1}}>
            {isLoaded ?
                <KeyboardAwareScrollView style={{backgroundColor: '#fff'}}>
                    <View style={[Styles.taskDetails]}>
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
                                                onPress={(value) => {
                                                    onChangeStatus(value)
                                                }}
                                                borderWidth={2}
                                                buttonInnerColor={'#2196f3'}
                                                buttonOuterColor={selectedRadio === obj.id ? '#2196f3' : '#999'}
                                                buttonSize={12}
                                                buttonOuterSize={20}
                                                buttonStyle={{}}
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
                                                labelWrapStyle={{}}
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
                </KeyboardAwareScrollView>
                :
                <View style={Styles.spinnerView}>
                    <ActivityIndicator size="large" color={'#293b5f'}/>
                </View>
            }
        </View>
    )
}

export default TaskDetails
