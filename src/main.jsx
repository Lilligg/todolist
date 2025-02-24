import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route} from 'react-router-dom';

import AddBoard from './components/AddBoard.jsx'
import FirstPages from "./components/FirstPages.jsx";
import GoBackHome from "./components/GoBackHome.jsx";

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <StrictMode>
        <BrowserRouter>
            <GoBackHome/>
            <Routes>
                <Route path="/" element={ <FirstPages />} />
                <Route path="/board/:boardId" element={<AddBoard/>} />
            </Routes>
        </BrowserRouter>
    </StrictMode>,
);

