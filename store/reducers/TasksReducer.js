const initData = {
    tasks: []
}

export const tasksReducer = (state = initData , action) => {
    switch (action.type) {
        case 'GET_TASKS':
            console.log('GET_TASKS')
            return {}
        case 'GET_TASK_BY_ID':
            console.log('GET_TASKS')
            return {}
        case 'ADD_TASK':
            console.log('ADD_TASK')
            return {}
        case 'DELETE_TASK':
            console.log('DELETE_TASK')
            return {}
        default:
            return state
    }
}
