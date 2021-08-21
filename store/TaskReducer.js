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
        default:
            return state
    }
}
export default TaskReducer
