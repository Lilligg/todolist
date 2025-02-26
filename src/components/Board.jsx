import React, { useState } from "react";
import {
    TextField,
    List,
    ListItem,
    ListItemIcon,
    Checkbox,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    Box, Divider,
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { v4 as uuidv4 } from 'uuid';

const Board = () => {
    const [element, setElement] = useState("");
    const [arrayElements, setArrayElements] = useState([]);

    const deleteElement = (id) => {
        setArrayElements(arrayElements.filter(item => item.id !== id));
    };

    const handleToggle = (id) => () => {
        setArrayElements(arrayElements.map(item => {
            if (item.id === id) {
                return { ...item, checked: !item.checked }; // Инвертируем состояние checked
            }
            return item;
        }));
    };

    const addList = () => {
        if (element.trim() === "") {
            alert("Введите дело!");
            return;
        }

        setArrayElements([...arrayElements, { id: uuidv4(), text: element, checked: false }]);
        setElement("");
    };

    const handleKeyEnter = (event) => {
        if (event.key === 'Enter') {
            addList();
        }
    };

    return (
        <Box sx={{
            width: '90%',
        }}>
            <List sx = {{
                width: '100%',
            }}>
                {arrayElements.map((item) => (
                    <>
                        <ListItem key={item.id}>

                            <ListItemIcon>
                                <Checkbox
                                    edge="start"
                                    checked={item.checked}
                                    tabIndex={-1}
                                    disableRipple
                                    onChange={handleToggle(item.id)}
                                />
                            </ListItemIcon>
                            <ListItemText primary={item.text} />
                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="delete" onClick={() => deleteElement(item.id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                        <Divider />
                    </>
                ))}
            </List>

            <TextField
                value={element}
                onChange={(e) => setElement(e.target.value)}
                onKeyDown={handleKeyEnter}
                label="Введите задачу"
                variant="outlined"
                sx = {{
                    width: '100%',
                }}
            />
        </Box>
    );
};

export default Board;