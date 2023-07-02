import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout, Home, Login, AddUser } from './pages';


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/addUser" element={<AddUser />} />

                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
