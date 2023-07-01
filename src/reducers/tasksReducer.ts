import {TasksStateType} from "../App";
import {TaskType} from "../Todolist";
import {v1} from "uuid";
import {AddTodolistACType, RemoveTodolistACType} from "./todolistsReducer";


export const tasksReducer = (state: TasksStateType, action: MainTasksType) => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {
                ...state,
                [action.payload.todolistID]: state[action.payload.todolistID].filter(t => t.id !== action.payload.id)
            }
        }
        case 'ADD-TASK': {
            const newTask: TaskType = {id: v1(), title: action.payload.title.trim(), isDone: false}
            return {...state, [action.payload.todolistID]: [newTask, ...state[action.payload.todolistID]]}
        }
        case 'CHANGE-TASK-TITLE': {
            return {
                ...state,
                [action.payload.todoListID]: state[action.payload.todoListID].map(el =>
                    el.id === action.payload.taskId ? {...el, title: action.payload.newTitle} : el)
            }
        }
        case "CHANGE-TASK-STATUS" : {
            return {
                ...state,
                [action.payload.todoListID]: state[action.payload.todoListID].map(el =>
                    el.id === action.payload.taskId ? {...el, isDone: action.payload.checkedValue} : el)
            }
        }
        case "ADD-TODOLIST" : {
            return {...state, [action.payload.newTodolistID]: []}
        }
        case 'REMOVE-TODOLIST': {
            const copyState = {...state}
            delete copyState[action.payload.todolistID]
            return copyState

          /*  const {[action.payload.todolistID]: [], ...rest} = state
            return rest*/
        }
        default:
            return state
    }
}

type MainTasksType = RemoveTaskACType | AddTaskACType
    | ChangeTasksTitleACType | ChangeTasksStatusACType
    | AddTodolistACType | RemoveTodolistACType


type RemoveTaskACType = ReturnType<typeof removeTaskAC>

export const removeTaskAC = (id: string, todolistID: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {id, todolistID}
    } as const
}

type AddTaskACType = ReturnType<typeof addTaskAC>

export const addTaskAC = (title: string, todolistID: string) => {
    return {
        type: 'ADD-TASK',
        payload: {title, todolistID}
    } as const
}


type ChangeTasksTitleACType = ReturnType<typeof changeTaskTitleAC>

export const changeTaskTitleAC = (taskId: string, newTitle: string, todoListID: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        payload: {taskId, newTitle, todoListID}
    } as const
}


type ChangeTasksStatusACType = ReturnType<typeof changeTaskStatusAC>

export const changeTaskStatusAC = (taskId: string, checkedValue: boolean, todoListID: string) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        payload: {taskId, checkedValue, todoListID}
    } as const
}


