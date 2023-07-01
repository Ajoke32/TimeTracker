import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout, Home } from './pages';
import { Login } from './pages/LoginPage/Login';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />

                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
