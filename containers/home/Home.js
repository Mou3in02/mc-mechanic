import React from 'react'
import {SafeAreaView, StatusBar} from 'react-native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Styles from "./Styles"
import Lists from "../list/Lists";
import Charts from "../chart/Charts";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AddTask from "../add/AddTask";
import {insertTask} from "../../utils/DatabaseConnection";

const Tab = createBottomTabNavigator();

const Home = () => {

    const insert100 = () => {
        for (let i=1; i<=100; i++){
            const task = {
                model: 'Megan '+i,
                tel: '12345678',
                createdAt: new Date().getTime().toString(),
                spent: '210',
                earn: '65',
                description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis, voluptatum.',
                status: true
            }
            insertTask(task).then(() => console.log(i)).catch((error) => console.log(error))
        }
    }
    // insert100()

    return (
        <SafeAreaView style={Styles.homeView}>
            <StatusBar backgroundColor="#293b5f"/>
            <Tab.Navigator
                tabBarOptions={{
                    activeTintColor: '#fff',
                    activeBackgroundColor: '#293b5f',
                    inactiveBackgroundColor: '#fff',
                    labelStyle: {
                        fontSize: 12
                    }
                }}>
                <Tab.Screen name="Lists" component={Lists} options={{
                    tabBarLabel: 'Tâches',
                    tabBarIcon: ({color, size}) => (
                        <FontAwesome5 name="tools" color={color} size={size}/>
                    ),
                }}/>
                <Tab.Screen name="New" component={AddTask} options={{
                    tabBarLabel: 'Nouveau',
                    tabBarIcon: ({color, size}) => (
                        <FontAwesome5 name="plus-circle" color={color} size={size}/>
                    ),
                }}/>
                <Tab.Screen name="Charts" component={Charts} options={{
                    tabBarLabel: 'Stats',
                    tabBarIcon: ({color, size}) => (
                        <FontAwesome5 name="chart-pie" color={color} size={size}/>
                    )
                }}/>
                <Tab.Screen name="Settings" component={Charts} options={{
                    tabBarLabel: 'Info',
                    tabBarIcon: ({color, size}) => (
                        <FontAwesome5 name="info-circle" color={color} size={size}/>
                    )
                }}/>
            </Tab.Navigator>
        </SafeAreaView>
    )
}

export default Home
