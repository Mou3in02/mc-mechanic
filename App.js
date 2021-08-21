import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './containers/home/Home'
import TaskDetails from "./containers/taskDetails/TaskDetails";
import {deleteAllTasks, initDatabase} from "./utils/CRUD";
import AddTask from './containers/add/AddTask.js'
import AppLoading from 'expo-app-loading';
import { useFonts, Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import { Provider } from 'react-redux';
import {createStore, applyMiddleware } from 'redux'
import TaskReducer from "./store/TaskReducer";
import thunk from 'redux-thunk';
import Toast from "react-native-simple-toast";
import {useState} from "react";

const Stack = createStackNavigator()

const App = () => {

    const [isLoaded, setIsLoaded] = useState(false)

    const store = createStore(TaskReducer,applyMiddleware(thunk))

    initDatabase().then(() => {
        setIsLoaded(true)
    }).catch((error) => {
        Toast.show('DataBase connexion failed !',Toast.LONG)
        throw error
    })

    let [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_600SemiBold
    });

    if (!isLoaded || !fontsLoaded) {
        return <AppLoading />;
    }

    return (
        <Provider store={store}>
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
        </Provider>
    )
}

export default App
