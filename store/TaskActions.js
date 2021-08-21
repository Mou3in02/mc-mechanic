import {deleteTaskFromDatabase, getTasks, insertTask, updateTaskFromDatabase} from "../utils/CRUD";
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
export const addTasksAction = (task) => {
    return function (dispatch) {
        dispatch(addTaskRequest())
        insertTask(task).then(() => {
            dispatch(addTaskSuccess(task))
        }).catch((error) => {
            Toast.show('DataBase insert failed !', Toast.LONG)
            throw error
        })
    }
}

export const DELETE_TASK_REQUEST = 'DELETE_TASK_REQUEST'
export const DELETE_TASK_SUCCESS = 'DELETE_TASK_SUCCESS'
export const deleteTaskRequest = () => {
    return {
        type: DELETE_TASK_REQUEST,
    }
}
export const deleteTaskSuccess = (id) => {
    return {
        type: DELETE_TASK_SUCCESS,
        taskId: id
    }
}
export const deleteTasksAction = (id) => {
    return function (dispatch) {
        dispatch(deleteTaskRequest())
        deleteTaskFromDatabase(id)
            .then(() => {
                dispatch(deleteTaskSuccess(id))
            })
            .catch((error) => {
                Toast.show('DataBase delete failed !', Toast.LONG)
                throw error
            })
    }
}

export const EDIT_TASK_REQUEST = 'EDIT_TASK_REQUEST'
export const EDIT_TASK_SUCCESS = 'EDIT_TASK_SUCCESS'
export const editTaskRequest = () => {
    return {
        type: EDIT_TASK_REQUEST,
    }
}
export const editTaskSuccess = (task) => {
    return {
        type: EDIT_TASK_SUCCESS,
        editTask: task
    }
}
export const editTasksAction = (task) => {
    return function (dispatch) {
        dispatch(editTaskRequest())
        updateTaskFromDatabase(task)
            .then(() => {
                dispatch(editTaskSuccess(task))
            })
            .catch((error) => {
                Toast.show('DataBase delete failed !', Toast.LONG)
                throw error
            })
    }
}
