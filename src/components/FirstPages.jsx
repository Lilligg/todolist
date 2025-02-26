import React, {useState} from "react";
import {
    Button,
    Box,
    TextField,
    Collapse,
    List,
    ListItem,
    ListItemButton, Divider,
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
        <Box sx={{
            width: '100vw',
            height: '100vh',
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
        }}>
            <Box sx={{
                width: '45%',
                height: 'auto',
                color: 'black',
                padding: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                bgcolor: 'grey.200',
                borderRadius: 2,
                boxShadow: 1,
                marginLeft: '30px',
            }}>
                <Button variant="contained" onClick={switchShowMore} sx={{
                    width: '100%',
                    mb: 1,
                }}>
                    Добавить доску задач
                </Button>

                <Collapse in={showMore} sx={{ width: '100%' }}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        width: '100%',
                    }}>
                        <h2>Название доски</h2>
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
                                Отмена
                            </Button>
                            <Button variant="contained" onClick={saveBoard} color="success" sx={{
                                width: '48%',
                            }}>
                                Сохранить
                            </Button>
                        </Box>
                    </Box>
                </Collapse>
            </Box>

            <Collapse in={arrayBoard.length !== 0} sx={{ width: '45%' }}>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        padding: 3,
                        gap: 2,
                        width: '90%',
                        bgcolor: 'grey.200',
                        borderRadius: 2,
                        boxShadow: 1,
                    }}
                >
                    <h1 style={{ textAlign: 'center', marginTop: 0 }}>Мои доски</h1>

                    <List
                        sx={{
                            width: '90%',
                            bgcolor: 'background.paper',
                            margin: '0 auto',
                            borderRadius: 2,
                            boxShadow: 1,
                            height: '100%'
                        }}
                    >
                        {arrayBoard.map((item) => (
                            <div key={item.id}>
                                <ListItem disablePadding>
                                    <Link
                                        to={`/board/${item.id}`}
                                        style={{ textDecoration: 'none', color: 'inherit', display: 'block', width: '100%' }}
                                    >
                                        <ListItemButton sx={{ textAlign: 'center', height: '100%' }}>{item.name}</ListItemButton>
                                    </Link>
                                </ListItem>
                                <Divider />
                            </div>
                        ))}
                    </List>
                </Box>
            </Collapse>
        </Box>
    );
}

export default FirstPages;