import React,{useState} from "react";
import {View, Text} from 'react-native'
import Styles from "./Styles";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import {TouchableOpacity} from "react-native-gesture-handler";



const Settings = () => {

    return (
        <View style={Styles.containerView}>
            <View style={Styles.headerView}>
                <Text style={Styles.headerTxt}>Paramètres</Text>
            </View>
            <View style={Styles.bodyView}>
                <View style={Styles.importView}>
                    <Text>Import data</Text>
                </View>
                <View style={Styles.exportView}>
                    <TouchableOpacity style={Styles.exportBtn}>
                        <Text style={Styles.exportTxt}>Export data</Text>
                        <FontAwesome5 name={'file-download'} size={24} color={'#fff'} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default Settings
