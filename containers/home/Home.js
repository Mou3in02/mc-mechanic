import * as React from 'react'
import {SafeAreaView, StatusBar} from 'react-native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Styles from "./Styles"
import Lists from "../list/Lists";
import Charts from "../chart/Charts";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Tab = createBottomTabNavigator();

const Home = () => {

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
                }}
            >
                <Tab.Screen name="Lists" component={Lists} options={{
                    tabBarLabel: 'Tâches',
                    tabBarIcon: ({color, size}) => (
                        <FontAwesome5 name="list" color={color} size={size}/>
                    ),
                    tabBarBadge: '+9'
                }}
                />
                <Tab.Screen name="Charts" component={Charts} options={{
                    tabBarLabel: 'Stats',
                    tabBarIcon: ({color, size}) => (
                        <FontAwesome5 name="chart-pie" color={color} size={size}/>
                    )
                }}
                />
                <Tab.Screen name="Settings" component={Charts} options={{
                    tabBarLabel: 'Paramètres',
                    tabBarIcon: ({color, size}) => (
                        <FontAwesome5 name="cog" color={color} size={size}/>
                    )
                }}
                />
            </Tab.Navigator>
        </SafeAreaView>
    )
}

export default Home
