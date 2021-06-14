import React, {useState} from 'react'
import {Text, View} from 'react-native';
import Styles from './Styles'
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import moment from 'moment'

const Task = (props) => {

    return (
        <View style={Styles.taskView}>
            <Text style={Styles.model}>{props.model}</Text>
            <Text style={Styles.tel}>
                <FontAwesome5 name="phone-square-alt" color="#444" size={15}/> {props.tel}
            </Text>
            <Text style={Styles.date}>
                <FontAwesome5 name="calendar-alt" color="#444"
                              size={15}/> {moment(new Date(props.date), 'YYYYMMDD').fromNow()}
            </Text>
            <View style={{flexDirection: 'row'}}>
                <Text style={Styles.earn}>
                    {props.earn}$
                </Text>
                <Text style={Styles.spent}>
                    {props.spent}$
                </Text>
            </View>
            <Text style={Styles.description}>
                {props.description}
            </Text>
            <FontAwesome5 style={Styles.status} name={props.status ? "check-circle" : "times-circle"}
                          color={props.status ? "#00b8a9" : "#e23e57"} size={16}/>
        </View>
    )
}

export default Task
