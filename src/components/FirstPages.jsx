import React, {useState} from "react";
import {
    Button,
    Box,
    TextField,
    Collapse,
    List,
    ListItem,
    ListItemButton,
} from "@mui/material";
import {Link} from 'react-router-dom';
import {v4 as uuidv4} from "uuid";


const FirstPages = () => {

const [showMore, setShowMore] = useState(false);
const [nameBoard, setNameBoard] = useState("");
const [arrayBoard, setArrayBoard] = useState([]);

const switchShowMore = () => {
    setShowMore(!showMore);
}

const saveBoard = () => {
    setArrayBoard([...arrayBoard, { id: uuidv4(), name: nameBoard }]);
    setNameBoard("");
    setShowMore(false);
}

const cancelBoard = () => {
    setShowMore(false);
    setNameBoard("");
}

    return(
        <Box>
            <Box sx={{
                width: '100%',
                maxWidth: 400,
                margin: '0 auto',
                height: 'auto',
                color: 'white',
                padding: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                bgcolor: 'grey.200',
                borderRadius: 2,
                boxShadow: 1,
                mb: 2,
            }}>
                <Button variant="contained" onClick={switchShowMore} sx={{
                    width: '100%',
                    mb: 1,
                }}>Добавить доску задач</Button>

                <Collapse in={showMore} sx={{ width: '100%' }}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        width: '100%',
                    }}>
                        <p>Название доски</p>
                        <TextField
                            value={nameBoard}
                            onChange={(e) => setNameBoard(e.target.value)}
                            label="Введите название доски задач"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                        />
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            width: '100%',
                            mt: 2,
                        }}>
                            <Button variant="contained" onClick={cancelBoard}
                                    sx={{
                                        width: '48%',
                                    }}
                                    color="error"
                            >
                                Отмена</Button>
                            <Button variant="contained" onClick={saveBoard} sx={{
                                width: '48%',
                            }}
                                    color="success"
                            >Сохранить</Button>
                        </Box>

                    </Box>
                </Collapse>
            </Box>
            <Collapse in={arrayBoard.length!==0} sx={{ width: '100%' }}>
            <Box>
                <Box>
                    <List sx={{ width: '100%', maxWidth: 400, bgcolor: 'background.paper', margin: '0 auto', borderRadius: 2, boxShadow: 1 }}>
                        {arrayBoard.map((item) => (
                            <ListItem key={item.id} disablePadding>
                                <Link to={`/board/${item.id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block', width: '100%' }}>
                                    <ListItemButton sx={{ textAlign: 'center' }}>
                                        {item.name}
                                    </ListItemButton>
                                </Link>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Box>
            </Collapse>
        </Box>
    );
}

export default FirstPages;