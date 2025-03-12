import React, { useEffect, useState } from "react";
import {
    TextField,
    List,
    ListItem,
    ListItemIcon,
    Checkbox,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    Box,
    Divider,
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { v4 as uuidv4 } from 'uuid';
import checkingDuplicatesAndNull from "../function/checkingDuplicatesAndNull.js";
import { Draggable, Droppable } from "react-beautiful-dnd";

const Board = ({ listID, elements, setArrayList }) => {

    const [element, setElement] = useState("");

    const addList = () => {
        if (!checkingDuplicatesAndNull(element, elements)) {
            return;
        }
        const newElement = { id: uuidv4(), name: element, checked: false };
        setArrayList((prev) =>
            prev.map((list) =>
                list.id === listID
                    ? { ...list, elements: [...list.elements, newElement] }
                    : list
            )
        );
        setElement("");
    };

    const handleKeyEnter = (event) => {
        if (event.key === 'Enter') {
            addList();
        }
    };

    const deleteElement = (id) => {
        setArrayList((prev) =>
            prev.map((list) =>
                list.id === listID
                    ? { ...list, elements: list.elements.filter((item) => item.id !== id) }
                    : list
            )
        );
    };

    const handleToggle = (id) => () => {
        setArrayList((prev) =>
            prev.map((list) =>
                list.id === listID
                    ? {
                        ...list,
                        elements: list.elements.map((item) =>
                            item.id === id ? { ...item, checked: !item.checked } : item
                        ),
                    }
                    : list
            )
        );
    };

    return (
        <Box sx={{ width: '90%' }}>
            <Droppable droppableId={listID}>
                {(provided) => (
                    <List
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        sx={{ width: '100%' }}
                    >
                        {elements.map((item, index) => (
                            <Draggable key={item.id} draggableId={item.id} index={index}>
                                {(provided) => (
                                    <Box
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                    >
                                        <ListItem>
                                            <ListItemIcon>
                                                <Checkbox
                                                    edge="start"
                                                    checked={item.checked}
                                                    tabIndex={-1}
                                                    disableRipple
                                                    onChange={handleToggle(item.id)}
                                                />
                                            </ListItemIcon>
                                            <ListItemText primary={item.name} />
                                            <ListItemSecondaryAction>
                                                <IconButton edge="end" aria-label="delete" onClick={() => deleteElement(item.id)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                        <Divider />
                                    </Box>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </List>
                )}
            </Droppable>

            <TextField
                value={element}
                onChange={(e) => setElement(e.target.value)}
                onKeyDown={handleKeyEnter}
                label="Введите задачу"
                variant="outlined"
                sx={{ width: '100%' }}
            />
        </Box>
    );
};

export default Board;