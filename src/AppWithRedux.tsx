import './App.css';
import {TaskType, TodolistWithRedux} from './TodolistWithRedux';
import {AddItemForm} from "./AddItemForm";
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Button,
    Container, Grid, Paper, ThemeProvider, createTheme
} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {addTodolistAC,} from "./state/todolistsReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";


export  type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type FilterValuesType = "all" | "active" | "completed";


function AppWithRedux() {

    const dispatch = useDispatch()
    const todolists = useSelector<AppRootStateType, Array<TodolistType>>( state => state.todolists)


    const addTodolist = (title: string)  => {
        dispatch(addTodolistAC(title))
    }

    const todolistComponents: Array<JSX.Element> = todolists.map(tl => {

            return (
                <Grid item key={tl.id}>
                    <Paper sx={{"p": "15px"}} elevation={5}>
                        <TodolistWithRedux
                            todolist={tl}
                            />
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

export default AppWithRedux;
