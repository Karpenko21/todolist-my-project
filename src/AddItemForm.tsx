import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import styles from "./Todolist.module.css";
import AddCircleSharpIcon from '@mui/icons-material/AddCircleSharp';
import {IconButton, TextField} from "@mui/material";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm: React.FC<AddItemFormPropsType> = (props) => {

    const [title, setTitle] = useState("")
    const [error, setError] = useState<boolean>(false)



    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }

    const addItem = () => {
        if (title.trim()) {
            props.addItem(title.trim());
            setTitle("");
        } else {
            setError(true)
        }
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addItem();
        }
    }

    return (
        <div>

            <TextField
                variant={"outlined"}
                color={"secondary"}
                placeholder={"Please, enter title!"}
                size={"small"}
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                error={error}
                helperText={error && 'Title is required!'}
            />
            <IconButton
                size="small"
                color="primary"
                onClick={addItem}>
                <AddCircleSharpIcon/>
            </IconButton>
            <div className={error ? styles.errorMessage : ""}>
            </div>
        </div>
    );
};
