import React, { useState, useEffect } from "react";
import { Button, TextField, Box, Collapse } from "@mui/material";
import Board from "./Board";
import { v4 as uuidv4 } from "uuid";
import { useParams } from "react-router-dom";
import checkingDuplicatesAndNull from "../function/checkingDuplicatesAndNull.js";
import { DragDropContext } from "react-beautiful-dnd";

const AddBoard = () => {
    const { boardId } = useParams();

    const [listName, setListName] = useState("");
    const [arrayList, setArrayList] = useState([]);
    const [showMore, setShowMore] = useState(false);

    const savedList = localStorage.getItem(`list_${boardId}`);

    useEffect(() => {
        if (savedList) {
            const parsedBoards = JSON.parse(savedList);
            const updatedBoards = parsedBoards.map((list) => ({
                ...list,
                elements: list.elements || [],
            }));
            setArrayList(updatedBoards);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(`list_${boardId}`, JSON.stringify(arrayList));
    }, [arrayList, boardId]);

    const switchShowMore = () => {
        setShowMore(!showMore);
    };

    const cancelList = () => {
        setShowMore(false);
        setListName("");
    };

    const saveList = () => {
        if (!checkingDuplicatesAndNull(listName, arrayList)) {
            return;
        }
        setArrayList([...arrayList, { id: uuidv4(), name: listName, elements: [] }]);
        setShowMore(false);
        setListName("");
    };

    const onDragEnd = (result) => {
        const { source, destination, draggableId } = result;

        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId && source.index === destination.index) {
            return;
        }

        const sourceListIndex = arrayList.findIndex((list) => list.id === source.droppableId);
        const destinationListIndex = arrayList.findIndex((list) => list.id === destination.droppableId);

        const newArrayList = [...arrayList];
        const sourceList = { ...newArrayList[sourceListIndex] };
        const destinationList = { ...newArrayList[destinationListIndex] };

        const [draggedElement] = sourceList.elements.splice(source.index, 1);
        destinationList.elements.splice(destination.index, 0, draggedElement);

        newArrayList[sourceListIndex] = sourceList;
        newArrayList[destinationListIndex] = destinationList;

        setArrayList(newArrayList);
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                height: '100%',
            }}>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    width: 'auto',
                    height: 62,
                }}>
                    <Button variant="contained" onClick={switchShowMore} sx={{
                        width: 'auto',
                        height: 'auto',
                        marginLeft: '16px',
                    }}>
                        Добавить список задач
                    </Button>

                    <Collapse in={showMore} sx={{
                        height: 62,
                        width: 'auto',
                        marginLeft: '16px',
                    }}>
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                        }}>
                            <TextField
                                value={listName}
                                onChange={(e) => setListName(e.target.value)}
                                label="Название списка задач"
                                variant="outlined"
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        bgcolor: 'grey.200',
                                    },
                                }}
                            />

                            <Box sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', marginLeft: '13px' }}>
                                <Button variant="contained" onClick={cancelList} color="error" sx={{ width: '48%' }}>
                                    Отмена
                                </Button>
                                <Button variant="contained" onClick={saveList} color="success" sx={{ width: '48%' }}>
                                    Сохранить
                                </Button>
                            </Box>
                        </Box>
                    </Collapse>
                </Box>

                <Box sx={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                }}>
                    {arrayList.map((list) => (
                        <Box key={list.id}
                             sx={{
                                 display: 'flex',
                                 justifyContent: 'center',
                                 alignItems: 'center',
                                 flexDirection: 'column',
                                 width: '30%',
                                 bgcolor: 'grey.200',
                                 margin: 3,
                                 borderRadius: 1,
                                 boxShadow: 3,
                                 paddingBottom: 2,
                             }}>
                            <h2>{list.name}</h2>
                            <Board
                                listID={list.id}
                                elements={list.elements}
                                setArrayList={setArrayList}
                            />
                        </Box>
                    ))}
                </Box>
            </Box>
        </DragDropContext>
    );
};

export default AddBoard;