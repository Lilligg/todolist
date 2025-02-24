import React from "react";
import {Box, Button} from "@mui/material";
import {Link} from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home'
const GoBackHome = () => {
    return (
        <Box sx={{ position: 'absolute', top: 16, right: 16 }}>
            <Link to="/">
                <Button variant="contained" color="primary" startIcon={<HomeIcon />}>
                    На главную
                </Button>
            </Link>
        </Box>
    );
}

export default GoBackHome;