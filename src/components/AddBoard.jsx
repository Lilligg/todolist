import React, { useState, useEffect } from "react";
import {
    Button,
    TextField,
    Box, Collapse,
} from "@mui/material";

import Board from "./Board";
import {v4 as uuidv4} from "uuid";
import {useParams} from "react-router-dom";


const AddBoard = () => {
    const { boardId } = useParams();

    const [listName, setListName] = useState("");
    const [arrayList, setArrayList] = useState(() => {
        const savedBoards = localStorage.getItem(`list_${boardId}`);
        return savedBoards ? JSON.parse(savedBoards) : [];
    });

    const [showMore, setShowMore] = useState(false);

    useEffect(() => {
        localStorage.setItem(`list_${boardId}`, JSON.stringify(arrayList));
    }, [arrayList, boardId]);

    const switchShowMore = () => {
        setShowMore(!showMore);
    }

    const cancelList = () => {
        setShowMore(false);
        setListName("")
    }

    const saveList = () => {
        setArrayList([...arrayList, { id: uuidv4(), name: listName}]);
        setShowMore(false);
        setListName("")
    }

    return (
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
                            <Button variant="contained" onClick={cancelList} color="error" sx={{width: '48%' }}>
                                Отмена
                            </Button>
                            <Button variant="contained" onClick={saveList} color="success" sx={{width: '48%' }}>
                                Сохранить
                            </Button>
                        </Box>
                    </Box>
                </Collapse>
            </Box>

            <Box sx={{
                width: '100%',
                height: '100vh',
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                flexDirection: 'row',
                flexWrap: 'wrap',

            }}>
                {arrayList.map((item) => (
                    <Box sx={{
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
                            <h2>{item.name}</h2>
                            <Board key={item.id} listID = {item.id}/>
                    </Box>
                ))}
            </Box>
        </Box>
    )
}

export default AddBoard;