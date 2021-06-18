import React from 'react'
import {Text, View} from 'react-native';
import Styles from './Styles'
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const Task = (props) => {

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

    return (
        <View style={Styles.taskView}>
            <Text style={Styles.model}>{props.model}</Text>
            <View style={Styles.taskDetailsView}>
                <View style={Styles._50A}>
                    <View style={Styles.telView}>
                        <FontAwesome5 name="phone-square-alt" color="#444" size={15}/>
                        <Text style={Styles.tel}>{props.tel}</Text>
                    </View>
                    <View style={Styles.moneyView}>
                        <Text style={Styles.earnText}>Gagner   </Text>
                        <Text style={Styles.earn}>{props.earn}</Text>
                    </View>
                    <View style={Styles.moneyView}>
                        <Text style={Styles.spentText}>Dépensé</Text>
                        <Text style={Styles.spent}>{props.spent}</Text>
                    </View>
                </View>
                <View style={Styles._50B}>
                    {props.status ?
                        <View style={Styles.statusView}>
                            <Text style={Styles.trueStatusTxt}>Effectué</Text>
                            <FontAwesome5 name="check-square" color="#151965" size={15}/>
                        </View>
                        :
                        <View style={Styles.statusView}>
                            <Text style={Styles.falseStatusTxt}>Non effectué</Text>
                        </View>
                    }
                    <View style={Styles.dateView}>
                        <Text style={Styles.date}>{formatTime(props.date)}</Text>
                        <FontAwesome5 name="clock" color="#444" size={15}/>
                    </View>
                    <View style={Styles.dateView}>
                        <Text style={Styles.date}>{formatDate(props.date)}</Text>
                        <FontAwesome5 name="calendar-alt" color="#444" size={15}/>
                    </View>
                </View>
            </View>
            <Text style={Styles.description}>
                {props.description}
            </Text>
        </View>
    )
}

export default Task
