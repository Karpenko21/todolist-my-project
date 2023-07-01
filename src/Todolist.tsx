import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import styles from './Todolist.module.css'
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, Checkbox, IconButton, List, ListItem, Typography} from "@mui/material";
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    todolistID: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType

    removeTask: (taskId: string, todoListID: string) => void
    addTask: (title: string, todoListID: string) => void
    changeTasksStatus: (taskId: string, checkedValue: boolean, todoListID: string) => void
    changeTasksTitle: (taskId: string, newTitle: string, todoListID: string) => void

    removeToDoList: (toDoListID: string) => void
    changeTodoListFilter: (value: FilterValuesType, todoListID: string) => void
    changeTodolistTitle: (title: string, todoListID: string) => void
}


export function Todolist(props: TodolistPropsType) {


    const [buttonName, setButtonName] = useState<FilterValuesType>('all')


    const onButtonClickHandler = (value: FilterValuesType) => {
        props.changeTodoListFilter(value, props.todolistID);
        setButtonName(value)
    }

    const removeTodolist = () => {
        props.removeToDoList(props.todolistID)
    }

    const addNewTask = (title: string) => props.addTask(title, props.todolistID)

    const changeTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle(newTitle, props.todolistID)
    }


    return (
        <div>
            <Typography
                variant={"h5"}
                align={"center"}
                fontWeight={"bold"}
            >
                <EditableSpan title={props.title} changeTitle={changeTodolistTitle}/>
                <IconButton
                    size="small"
                    color={"primary"}
                    onClick={removeTodolist}>
                    <CancelPresentationIcon/>
                </IconButton>
            </Typography>
            <AddItemForm addItem={addNewTask}/>
            <List>
                {
                    props.tasks.map(t => {

                        const onClickHandler = () => props.removeTask(t.id, props.todolistID)

                        const onChangeCheckedHandler = (taskId: string, checkedValue: boolean, todoListID: string) => props.changeTasksStatus(taskId, checkedValue, todoListID)
                        const changeTaskTitle = (newTitle: string) => {
                            props.changeTasksTitle(t.id, newTitle, props.todolistID)
                        }
                        return <ListItem
                            disablePadding
                            divider
                            secondaryAction={
                                <IconButton
                                    color={"primary"}
                                    size="small"
                                    onClick={onClickHandler}>
                                    <CancelPresentationIcon/>
                                </IconButton>
                            }
                            key={t.id}>
                            <Checkbox
                                size="small"
                                onChange={(e) => onChangeCheckedHandler(t.id, e.currentTarget.checked, props.todolistID)}
                                checked={t.isDone}
                            />
                            <span className={t.isDone ? styles.isDone : ""}>
                                <EditableSpan title={t.title} changeTitle={changeTaskTitle}/>
                            </span>

                        </ListItem>
                    })
                }
            </List>
            <div>
                <Button

                    size="small"
                    variant="contained"
                    disableElevation
                    color={props.filter === 'all' ? "secondary" : "primary"}
                    onClick={() => onButtonClickHandler('all')}>All
                </Button>
                <Button
                    sx={{"ml": "3px"}}
                    size="small"
                    variant="contained"
                    disableElevation
                    color={props.filter === 'active' ? "secondary" : "primary"}
                    onClick={() => onButtonClickHandler('active')}>Active
                </Button>
                <Button sx={{"ml": "3px"}}
                        size="small"
                        variant="contained"
                        disableElevation
                        color={props.filter === 'completed' ? "secondary" : "primary"}
                        onClick={() => onButtonClickHandler('completed')}>Completed
                </Button>
            </div>
        </div>
    )
}