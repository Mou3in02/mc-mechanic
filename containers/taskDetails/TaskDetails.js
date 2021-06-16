import React, {useState} from 'react'
import {Text, View, TextInput, TouchableOpacity, Pressable} from 'react-native'
import Styles from './Styles'
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import DateTimePicker from '@react-native-community/datetimepicker'
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button'



const TaskDetails = (props) => {

    // const {id} = props.route.params
    // console.log(new Date())
    const [data, setData] = useState({
        id: 6,
        model: 'Megan 3',
        tel: 29284808,
        date: 1,
        earn: 220,
        spent: 170,
        description: 'Lorem ipsum dolor sit amet, consectetur.',
        status: true
    })
    const [show, setShow] = useState(false)
    const showDatePicker = () => {
        setShow(true)
    }
    const onPressDatePicker = () => {
        showDatePicker()
    }
    const onChange = (event, selectedDate) => {
        setShow(false)
        if (selectedDate !== undefined) {
            setData({
                ...data,
                date: selectedDate.getTime()
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
    }
    const onClickSave = () => {
        console.log(data)
    }
    var radio_props = [
        {label: 'Effectué', value: true },
        {label: 'Non effectué', value: false }
    ]

    return (
        <KeyboardAwareScrollView style={{backgroundColor: '#fff'}}>
            <View style={Styles.taskDetails}>
                <View style={Styles.detailsView}>
                    <View style={Styles.fieldView}>
                        <View style={Styles._30}>
                            <FontAwesome5 name="car" size={16}/>
                            <Text style={Styles.modelText}>Modèle :</Text>
                        </View>
                        <View style={Styles._70}>
                            <TextInput style={Styles.modelInput} value={data.model.toString()}
                                       onChangeText={(text) => onChangeModel(text)}/>
                        </View>
                    </View>
                    <View style={Styles.fieldView}>
                        <View style={Styles._30}>
                            <FontAwesome5 name="mobile-alt" size={16}/>
                            <Text style={Styles.modelText}>Téléphone :</Text>
                        </View>
                        <View style={Styles._70}>
                            <TextInput style={Styles.modelInput} value={data.tel.toString()}
                                       onChangeText={(text) => onChangeTel(text)}/>
                        </View>
                    </View>
                    <View style={Styles.fieldView}>
                        <View style={Styles._30}>
                            <FontAwesome5 name="euro-sign" size={16}/>
                            <Text style={Styles.modelText}>Dépensé :</Text>
                        </View>
                        <View style={Styles._70}>
                            <TextInput style={Styles.modelInput} value={data.spent.toString()}
                                       onChangeText={(text) => onChangeSpent(text)}/>
                        </View>
                    </View>
                    <View style={Styles.fieldView}>
                        <View style={Styles._30}>
                            <FontAwesome5 name="euro-sign" size={16}/>
                            <Text style={Styles.modelText}>Gagner :</Text>
                        </View>
                        <View style={Styles._70}>
                            <TextInput style={Styles.modelInput} value={data.earn.toString()}
                                       onChangeText={(text) => onChangeEarn(text)}/>
                        </View>
                    </View>
                    <View style={Styles.fieldView}>
                        <View style={Styles._30}>
                            <FontAwesome5 name="calendar-alt" size={16}/>
                            <Text style={Styles.dateText}>Date :</Text>
                        </View>
                        <View style={Styles._70}>
                            <TouchableOpacity onPress={() => onPressDatePicker()}>
                                <Text style={Styles.dateInput}>
                                    {formatDate(data.date)}
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
                                style={{paddingHorizontal: 20}}
                                radio_props={radio_props}
                                initial={0}
                                formHorizontal={false}
                                labelHorizontal={true}
                                buttonColor={'#999'}
                                animation={true}
                                borderWidth={1}
                                buttonSize={10}
                                buttonOuterSize={20}
                                buttonWrapStyle={{marginLeft: 10}}
                                onPress={(value) => {onChangeStatus(value)}}
                            />
                        </View>
                    </View>
                    <View style={Styles.descriptionView}>
                        <View style={Styles.descriptionTextView}>
                            <Text style={Styles.modelText}>Déscription :</Text>
                        </View>
                        <View style={Styles.descriptionInputView}>
                            <TextInput style={Styles.descriptionInput} multiline={true}
                                       value={data.description.toString()}
                                       onChangeText={(text) => onChangeDescription(text)}/>
                        </View>
                    </View>
                    <View style={Styles.saveView}>
                        <Pressable style={Styles.saveButton} onPress={onClickSave}>
                            <View style={Styles.saveItems}>
                                <FontAwesome5 name="save" color="#fff" size={18}/>
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
