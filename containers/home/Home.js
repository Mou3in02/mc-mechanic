import React from 'react'
import {SafeAreaView, StatusBar} from 'react-native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Styles from "./Styles"
import Lists from "../list/Lists";
import Chart from "../chart/Chart";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Search from "../search/Search";
import {insertTask} from "../../utils/CRUD";
import Sort from "../sort/Sort";

const Tab = createBottomTabNavigator();

const Home = () => {

    const insert100 = () => {
        for (let i=1; i<=100; i++){
            let task = {
                model: 'Véhicule '+i,
                tel: Math.floor(Math.random() * 10000000).toString(),
                earn: Math.floor(Math.random() * 1000).toString(),
                spent: Math.floor(Math.random() * 1000).toString(),
                createdAt: new Date(getRandomInt(946681200000,new Date().getTime().toString())).getTime().toString(),
                description: 'Hello world !',
                status: Math.floor(Math.random() * 10) % 2 === 0
            }
            insertTask(task)
                .then(() => {
                    console.log(i)
                })
                .catch((error) => console.log(error))
        }
    }
    const getRandomInt = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    return (
        <SafeAreaView style={Styles.homeView}>
            <StatusBar backgroundColor={'#14274E'}/>
            <Tab.Navigator
                tabBarOptions={{
                    activeTintColor: '#fff',
                    activeBackgroundColor: '#14274E',
                    inactiveBackgroundColor: '#fff',
                    labelStyle: {
                        fontSize: 12,
                        fontFamily: 'Poppins_400Regular'
                    }
                }}>
                <Tab.Screen name="Lists" component={Lists} options={{
                    tabBarLabel: 'Tâches',
                    tabBarIcon: ({color, size}) => (
                        <FontAwesome5 name="car-crash" color={color} size={size}/>
                    ),
                }}/>
                <Tab.Screen name="Search" component={Search} options={{
                    tabBarLabel: 'Rechercher',
                    tabBarIcon: ({color, size}) => (
                        <FontAwesome5 name="search" color={color} size={size}/>
                    )
                }}/>
                <Tab.Screen name="Sort" component={Sort} options={{
                    tabBarLabel: 'Date',
                    tabBarIcon: ({color, size}) => (
                        <FontAwesome5 name="calendar-alt" color={color} size={size}/>
                    )
                }}/>
                <Tab.Screen name="Chart" component={Chart} options={{
                    tabBarLabel: 'Stats',
                    tabBarIcon: ({color, size}) => (
                        <FontAwesome5 name="chart-pie" color={color} size={size}/>
                    )
                }}/>
            </Tab.Navigator>
        </SafeAreaView>
    )
}

export default Home
