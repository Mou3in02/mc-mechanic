import * as actions from './TaskActions'

const initState = {
    tasks: [],
    isLoaded: false
}

const TaskReducer = (state = initState, action) => {
    switch (action.type) {
        case (actions.GET_TASKS_REQUEST):
            return state
        case (actions.GET_TASKS_SUCCESS):
            return {
                ...state,
                tasks: action.tasks,
                isLoaded: true
            }
        case (actions.ADD_TASKS_REQUEST):
            return state
        case (actions.ADD_TASKS_SUCCESS):
            let task = action.task
            let tasks = [...state.tasks]
            tasks.unshift(task)
            return {
                ...state,
                tasks: tasks
            }
        case (actions.DELETE_TASK_REQUEST):
            return state
        case (actions.DELETE_TASK_SUCCESS):
            let id = action.taskId
            let taskIndex = state.tasks.findIndex((task) => {
                return task.id === id
            })
            if (taskIndex !== -1) {
                let newTasks = [...state.tasks]
                newTasks.splice(taskIndex,1)
                return {
                    ...state,
                    tasks: newTasks
                }
            }
            return state
        case (actions.EDIT_TASK_REQUEST):
            return state
        case (actions.EDIT_TASK_SUCCESS):
            let editTask = action.editTask
            let editTaskIndex = state.tasks.findIndex((task) => {
                return task.id === editTask.id
            })
            if (editTaskIndex !== -1) {
                let newTasks = [...state.tasks]
                newTasks.splice(editTaskIndex,1,editTask)
                return {
                    ...state,
                    tasks: newTasks
                }
            }
            return state
        default:
            return state
    }
}
export default TaskReducer
