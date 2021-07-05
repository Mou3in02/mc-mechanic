import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './containers/home/Home'
import TaskDetails from "./containers/taskDetails/TaskDetails";
import {initDatabase} from "./utils/CRUD";
import AddTask from './containers/add/AddTask.js'
import AppLoading from 'expo-app-loading';
import { useFonts, Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins';

const Stack = createStackNavigator()

const App = () => {

    initDatabase().then(() => {
        console.log('***    Connection is established   ***')
    }).catch((error) => {console.log(error)})

    let [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_600SemiBold
    });

    if (!fontsLoaded) {
        return <AppLoading />;
    }

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>
                <Stack.Screen name="TaskDetails" component={TaskDetails} options={({route}) => ({
                    title: route.params.name,
                    headerTitleStyle: {color: '#14274E',alignSelf: 'center'},
                    headerLeft: () => null,
                })}/>
                <Stack.Screen name="AddTask" component={AddTask} options={({route}) => ({
                    title: 'Nouveau Tâche',
                    headerTitleStyle: {color: '#14274E',alignSelf: 'center'},
                    headerLeft: () => null,
                })}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default App
