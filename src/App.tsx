import React, {useReducer, useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import AddItemForm from "./AddItemForm";
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Button,
    Container, Grid, Paper, ThemeProvider, createTheme
} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    tasksReducer
} from "./reducers/tasksReducer";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./reducers/todolistsReducer";


export  type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type FilterValuesType = "all" | "active" | "completed";
export type TasksStateType = {
    [todolistId: string]: Array<TaskType>
}


function App() {

    const toDoListId_1 = v1()
    const toDoListId_2 = v1()

    const [todoLists, dispatchTodolists] = useReducer(todolistsReducer, [
        {id: toDoListId_1, title: "What to learn", filter: "all"},
        {id: toDoListId_2, title: "What to buy", filter: "all"},
    ])


    const [tasks, dispatchTasks] = useReducer(tasksReducer, {
        [toDoListId_1]:
            [{id: v1(), title: "HTML&CSS", isDone: true},
                {id: v1(), title: "JS", isDone: true},
                {id: v1(), title: "ReactJS", isDone: false},
                {id: v1(), title: "Rest API", isDone: false},
                {id: v1(), title: "GraphQL", isDone: false},
            ],
        [toDoListId_2]:
            [{id: v1(), title: "Meat", isDone: true},
                {id: v1(), title: "Milk", isDone: true},
                {id: v1(), title: "Bread", isDone: false},
                {id: v1(), title: "Pasta", isDone: false},
                {id: v1(), title: "A bottle of water", isDone: false},
            ],
    })


    const removeTask = (id: string, todoListID: string) => {
        /*const tasksArrayAfterRemove: Array<TaskType> = tasks[toDoListID].filter(t => t.id != id);
        const copyTasks = {...tasks}
        copyTasks[toDoListID] = tasksArrayAfterRemove
        setTasks(copyTasks) */
        //setTasks({...tasks, [todoListID]: tasks[todoListID].filter(t => t.id !== id)})
        dispatchTasks(removeTaskAC(id, todoListID))
    }
    const addTask = (title: string, todoListID: string) => {

        /*     const newTask: TaskType = {id: v1(), title: title.trim(), isDone: false}
             setTasks({...tasks, [todoListID]: [newTask, ...tasks[todoListID]]});*/

        dispatchTasks(addTaskAC(title, todoListID))
    }
    const changeTasksStatus = (taskId: string, checkedValue: boolean, todoListID: string) => {
        /* setTasks({
             ...tasks,
             [todoListID]: tasks[todoListID].map(el => el.id === taskId ? {...el, isDone: checkedValue} : el)
         })*/
        dispatchTasks(changeTaskStatusAC(taskId, checkedValue, todoListID))
    }
    const changeTasksTitle = (taskId: string, newTitle: string, todoListID: string) => {
        /* setTasks({
             ...tasks,
             [todoListID]: tasks[todoListID].map(el => el.id === taskId ? {...el, title: newTitle} : el)
         })*/

        dispatchTasks(changeTaskTitleAC(taskId, newTitle, todoListID))
    }


    const changeTodolistFilter = (value: FilterValuesType, todoListID: string) => {
        //setTodoLists(todoLists.map(tl => tl.id === todoListID ? {...tl, filter: value} : tl));
        dispatchTodolists(changeTodolistFilterAC(todoListID, value))
    }
    const changeTodolistTitle = (title: string, todoListID: string) => {
        //setTodoLists(todoLists.map(tl => tl.id === todoListID ? {...tl, title} : tl));
        dispatchTodolists(changeTodolistTitleAC(title,todoListID))
    }
    const removeToDoList = (toDoListID: string) => {
        //setTodoLists(todoLists.filter(tl => tl.id !== toDoListID))
        const action = removeTodolistAC(toDoListID)
        dispatchTodolists(action)
        dispatchTasks(action)
    }
    function addTodolist(title: string) {
       /* const newTodolistID = v1()*/
      /*  const newTodolistID = v1()
        const newTodolist: TodolistType = {id: newTodolistID, title: title, filter: 'all'}
        setTodoLists([newTodolist, ...todoLists])
       setTasks({...tasks, [newTodolistID]: []})*/
        //const action = addTodolistAC(v1(), title)
        const action = addTodolistAC(title)
        dispatchTodolists(action)
        dispatchTasks(action)
    }




    const todolistComponents: Array<JSX.Element> = todoLists.map(tl => {


            let tasksForTodolist = tasks[tl.id];

            if (tl.filter === "active") {
                tasksForTodolist = tasks[tl.id].filter(t => !t.isDone)
            }
            if (tl.filter === "completed") {
                tasksForTodolist = tasks[tl.id].filter(t => t.isDone);
            }


            /*  const filteredTasks: TaskType = () => {

                  let tasksForTodolist = tasks[tl.id];

                  if (tl.filter === "active") {
                      return tasksForTodolist = tasks[tl.id].filter(t => !t.isDone);
                  } else if (tl.filter === "completed") {
                      return tasksForTodolist = tasks[tl.id].filter(t => t.isDone);
                  }
                  return tasksForTodolist
              }
  */
            return (
                <Grid item key={tl.id}>
                    <Paper sx={{"p": "15px"}} elevation={5}>
                        <Todolist
                            todolistID={tl.id}
                            title={tl.title}
                            filter={tl.filter}

                            tasks={tasksForTodolist}

                            removeTask={removeTask}
                            removeToDoList={removeToDoList}
                            changeTasksTitle={changeTasksTitle}
                            changeTodolistTitle={changeTodolistTitle}

                            changeTodoListFilter={changeTodolistFilter}
                            addTask={addTask}
                            changeTasksStatus={changeTasksStatus}/>
                    </Paper>
                </Grid>
            )
        }
    )

    const myTheme = createTheme({
            palette: {
                primary: {
                    main: '#00695c',
                },
                secondary: {
                    main: '#ba68c8',
                },
                mode: "light",
            }
        }
    )

    return (
        <ThemeProvider theme={myTheme}>
            <div className={"App"}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{mr: 2}}
                        >
                            <Menu/>
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            TodoLists
                        </Typography>
                 {/*       <FormGroup>
                        <FormControlLabel
                            control={<Checkbox
                                onChange={(e) => setDarkMode(e.currentTarget.checked)}/>}
                            label={isDarkMode
                                ? "Dark mode off"
                                : "Dark mode on"}
                        />
                    </FormGroup>*/}
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
                <Container fixed>
                    <Grid container
                          sx={{"p": "10px 0 10px 0"}}>
                        <AddItemForm addItem={addTodolist}/>
                    </Grid>
                    <Grid container spacing={4}>
                        {todolistComponents}
                    </Grid>
                </Container>
            </div>
        </ThemeProvider>
    );
}

export default App;
