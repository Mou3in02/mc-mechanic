import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './containers/home/Home'
import TaskDetails from "./components/taskDetails/TaskDetails";

const Stack = createStackNavigator()

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>
                <Stack.Screen name="TaskDetails" component={TaskDetails}
                              options={({route}) => ({
                                  title: route.params.name,
                                  headerTitleStyle: {color: '#47597e'}
                              })}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default App
