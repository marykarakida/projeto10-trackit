import { BrowserRouter, Routes, Route } from "react-router-dom";
import HabitsPage from "./pages/HabitsPage";
import HistoryPage from "./pages/HistoryPage";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import TodayPage from "./pages/TodayPage";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />}></Route>
                <Route path="/cadastro" element={<SignUpPage />}></Route>
                <Route path="/habitos" element={<HabitsPage />}></Route>
                <Route path="/hoje" element={<TodayPage />}></Route>
                <Route path="/historico" element={<HistoryPage />}></Route>
            </Routes>
        </BrowserRouter>
    )
}

//maryjane@email.com
//Zanahoria3000