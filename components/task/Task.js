import React from 'react'
import {Text, View} from 'react-native';
import Styles from './Styles'
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import moment from 'moment'

const Task = (props) => {

    const formatDate = (dateTime) => {
        const date = new Date(parseInt(dateTime))
        let y = date.getFullYear()
        let m = date.getMonth() + 1
        let d = date.getDate()
        let h = date.getUTCHours()
        let i = date.getMinutes()
        return d + '/' + m + '/' + y + '  ' + h + ':' + i
    }

    return (
        <View style={Styles.taskView}>
            <Text style={Styles.model}>{props.model}</Text>
            <View style={Styles.telView}>
                <FontAwesome5 name="phone-square-alt" color="#444" size={15}/>
                <Text style={Styles.tel}>{props.tel}</Text>
            </View>
            <View style={Styles.dateView}>
                <FontAwesome5 name="calendar-alt" color="#444" size={15}/>
                <Text style={Styles.date}>{formatDate(props.date)}</Text>
            </View>
            <View style={Styles.moneyView}>
                <FontAwesome5 style={Styles.euro} name="euro-sign" color={'#444'} size={15} />
                <Text style={Styles.earn}>{props.earn}</Text>
                <Text style={Styles.spent}>{props.spent}</Text>
            </View>
            <Text style={Styles.description}>
                {props.description}
            </Text>
            <FontAwesome5 style={Styles.status} name={props.status ? "check-circle" : "times-circle"}
                          color={props.status ? "#00b8a9" : "#e23e57"} size={17}/>
        </View>
    )
}

export default Task
