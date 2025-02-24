import React, { useState } from "react";
import {
    Button,
    TextField,
    Box, Collapse,
} from "@mui/material";

import Board from "./Board";
import {v4 as uuidv4} from "uuid";

const AddBoard = () => {
    const [listName, setListName] = useState("");
    const [arrayList, setArrayList] = useState([]);
    const [showMore, setShowMore] = useState(false);

    const switchShowMore = () => {
        setShowMore(!showMore);
    }

    const cancelList = () => {
        setShowMore(false);
    }

    const saveList = () => {
        setArrayList([...arrayList, { id: uuidv4(), name: listName}]);
        setShowMore(false);
    }

    return (
        <Box>
            <Button variant="contained" onClick={switchShowMore}>Добавить список задач</Button>
                <Collapse in={showMore}>
                    <Box>
                        <p>Название списка задач</p>
                            <TextField
                                value={listName}
                                onChange={(e) => setListName(e.target.value)}
                                label="Введите название списка задач"
                                variant="outlined"
                            />
                            <Button variant="contained" onClick={cancelList}>Отмена</Button>
                            <Button variant="contained" onClick={saveList}>Сохранить</Button>
                    </Box>
                </Collapse>

            {arrayList.map((item) => (
                <Box sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    bgcolor: 'grey.200',
                    marginTop: 3,
                    borderRadius: 1,
                    boxShadow: 1
                }}>
                    <h5>{item.name}</h5>
                    <Board key={item.id}/>
                </Box>
            ))}
        </Box>
    )
}

export default AddBoard;