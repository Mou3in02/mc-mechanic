import React from 'react'
import {SafeAreaView, StatusBar} from 'react-native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Styles from "./Styles"
import Lists from "../list/Lists";
import Chart from "../chart/Chart";
import Search from "../search/Search";
import {insertTask} from "../../utils/CRUD";
import Sort from "../sort/Sort";
import AddTask from "../add/AddTask";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

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
                        fontSize: 10,
                        fontFamily: 'Poppins_400Regular',
                    }
                }}>
                <Tab.Screen name="Lists" component={Lists} options={{
                    tabBarLabel: 'Taches',
                    tabBarIcon: ({color}) => (
                        <MaterialIcons name="electric-car" color={color} size={30}/>
                    ),
                }}/>
                <Tab.Screen name="Search" component={Search} options={{
                    tabBarLabel: 'Rechercher',
                    tabBarIcon: ({color}) => (
                        <MaterialIcons name="search" color={color} size={30}/>
                    )
                }}/>
                <Tab.Screen name="Add" component={AddTask} options={{
                    tabBarLabel:() => {return null},
                    tabBarIcon: ({color}) => (
                        <MaterialIcons name={'add-circle-outline'} color={color} size={40} />
                    )
                }}/>
                <Tab.Screen name="Sort" component={Sort} options={{
                    tabBarLabel: 'Date',
                    tabBarIcon: ({color}) => (
                        <MaterialIcons name="event-note" color={color} size={30}/>
                    )
                }}/>
                <Tab.Screen name="Chart" component={Chart} options={{
                    tabBarLabel: 'Graph',
                    tabBarIcon: ({color}) => (
                        <MaterialIcons name="signal-cellular-alt" color={color} size={30}/>
                    )
                }}/>
            </Tab.Navigator>
        </SafeAreaView>
    )
}

export default Home
