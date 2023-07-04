import React, {ChangeEvent, FC, useState} from 'react';
import {TextField} from "@mui/material";

type EditableSpanPropsType = {
    title: string
    changeTitle: (newTitle: string) => void
}

export const EditableSpan: FC<EditableSpanPropsType> = (props) => {
    const [isEditMode, setIsEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState(props.title)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onEditMode = () => {
        setIsEditMode(true)
    }

    const offEditMode = () => {
        props.changeTitle(title)
        setIsEditMode(false)
    }

    return (
        isEditMode
            ? <TextField
                size="small"
                variant="standard"
                autoFocus
                value={title}
                onChange={onChangeHandler}
                onBlur={offEditMode}/>
            : <span
                onDoubleClick={onEditMode}>
                {props.title}</span>
    );
};
