import {
    addTodolistAC, changeTodolistFilterAC, ChangeTodolistFilterACType, changeTodolistTitleAC, ChangeTodolistTitleACType,
    removeTodolistAC,
    todolistsReducer
} from "./todolistsReducer";
import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

let todolistId1: string
let todolistId2: string
let startState: Array<TodolistType>
let newTodolistTitle: string

beforeEach(() => {
        todolistId1 = v1()
        todolistId2 = v1()
        startState = [
            {id: todolistId1, title: "What to learn", filter: "all"},
            {id: todolistId2, title: "What to buy", filter: "all"}
        ]
        newTodolistTitle = "New Todolist"
    }
)


test('correct todolist should be removed', () => {

    const endState = todolistsReducer(startState, removeTodolistAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {

    const endState =
        todolistsReducer(
            startState,
            addTodolistAC(newTodolistTitle)
        )

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodolistTitle);
});

test('correct todolist should change its name', () => {

    const action: ChangeTodolistTitleACType = changeTodolistTitleAC(todolistId2, newTodolistTitle)

    const endState = todolistsReducer(startState, action);

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {

    let newFilter: FilterValuesType = "completed";

    const action: ChangeTodolistFilterACType = changeTodolistFilterAC(todolistId2, newFilter)


    const endState = todolistsReducer(startState, action);

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});