import {getTasks, insertTask} from "../utils/CRUD";
import Toast from "react-native-simple-toast";

export const GET_TASKS_REQUEST = 'GET_TASKS_REQUEST'
export const GET_TASKS_SUCCESS = 'GET_TASKS_SUCCESS'
export const getTaskRequest = () => {
    return {
        type: GET_TASKS_REQUEST,
    }
}
export const getTaskSuccess = (tasks) => {
    if (tasks) {
        return {
            type: GET_TASKS_SUCCESS,
            tasks: tasks
        }
    }
    return {
        type: GET_TASKS_SUCCESS,
        tasks: []
    }
}
export const getTasksAction = () => {
    return function (dispatch) {
        dispatch(getTaskRequest())
        getTasks().then((result) => {
            dispatch(getTaskSuccess(result.rows._array))
        }).catch((error) => {
            Toast.show('DataBase connexion failed !', Toast.LONG)
            throw error
        })
    }
}

export const ADD_TASKS_REQUEST = 'ADD_TASKS_REQUEST'
export const ADD_TASKS_SUCCESS = 'ADD_TASKS_SUCCESS'
export const addTaskRequest = () => {
    return {
        type: ADD_TASKS_REQUEST,
    }
}
export const addTaskSuccess = (task) => {
    return {
        type: ADD_TASKS_SUCCESS,
        task: task
    }
}
export const addTasksAction = (task, navigation) => {
    return function (dispatch) {
        dispatch(addTaskRequest())
        insertTask(task).then(() => {
            dispatch(addTaskSuccess(task))
            Toast.show('Tâche enregistré avec succès')
            navigation.navigate('Home')
        }).catch((error) => {
            Toast.show('DataBase insert failed !', Toast.LONG)
            throw error
        })
    }
}
