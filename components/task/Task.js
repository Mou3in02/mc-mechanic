import React from 'react'
import {Text, View} from 'react-native';
import Styles from './Styles'
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import isEmpty from "validator/es/lib/isEmpty";


const Task = (props) => {

    const formatModel = (model) => {
        if (model && !isEmpty(model)){
            return model.trim().toString()
        }
        return ''
    }
    const formatTel = (tel) => {
        if (tel && !isEmpty(tel)){
            let parts = tel.match(/.{1,3}/g);
            return  parts.join(" ");
        }
        return ''
    }
    const formatSpent = (spent) => {
        if (spent && !isEmpty(spent)){
            return spent.trim().toString()
        }
        return ''
    }
    const formatEarn = (earn) => {
        if (earn && !isEmpty(earn)){
            return earn.trim().toString()
        }
        return ''
    }
    const formatDate = (dateTime) => {
        const date = new Date(parseInt(dateTime))
        let y = date.getFullYear()
        let m = date.getMonth() + 1
        let d = date.getDate()
        return d + '/' + m + '/' + y
    }
    const formatTime = (dateTime) => {
        const date = new Date(parseInt(dateTime))
        let h = date.getUTCHours()
        let i = date.getMinutes()
        return h + ':' + i
    }
    const formatDescription = (desc) => {
        if (desc && !isEmpty(desc)){
            return desc.trim().toString()
        }
        return ''
    }

    return (
        <View style={Styles.taskView}>
            <Text style={Styles.model}>{formatModel(props.model)}</Text>
            <View style={Styles.taskDetailsView}>
                <View style={Styles._50A}>
                    <View style={Styles.telView}>
                        <FontAwesome5 name="phone-square-alt" color="#444" size={15}/>
                        <Text style={Styles.tel}>{formatTel(props.tel)}</Text>
                    </View>
                    <View style={Styles.moneyView}>
                        <Text style={Styles.earn}>{formatEarn(props.earn)} €</Text>
                    </View>
                    <View style={Styles.moneyView}>
                        <Text style={Styles.spent}>{formatSpent(props.spent)} €</Text>
                    </View>
                </View>
                <View style={Styles._50B}>
                    {props.status ?
                        <View style={Styles.statusView}>
                            <Text style={Styles.trueStatusTxt}>Effectué</Text>
                            <FontAwesome5 name="check-square" color={'#444'} size={15}/>
                        </View>
                        :
                        <View style={Styles.statusView}>
                            <Text style={Styles.falseStatusTxt}>Non effectué</Text>
                            <FontAwesome5 name="times-circle" color={'#444'} size={15}/>
                        </View>
                    }
                    <View style={Styles.dateView}>
                        <Text style={Styles.date}>{formatTime(props.createdAt)}</Text>
                        <FontAwesome5 name="clock" color="#444" size={15}/>
                    </View>
                    <View style={Styles.dateView}>
                        <Text style={Styles.date}>{formatDate(props.createdAt)}</Text>
                        <FontAwesome5 name="calendar-alt" color="#444" size={15}/>
                    </View>
                </View>
            </View>
            <Text style={Styles.description}>
                {formatDescription(props.description)}
            </Text>
        </View>
    )
}

export default Task
