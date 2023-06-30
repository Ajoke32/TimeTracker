import { BrowserRouter } from "react-router-dom";
import { AuthWrapper } from "./auth";

function App() {
    return (
        <BrowserRouter>
            <AuthWrapper />
        </BrowserRouter>
    );
}

export default App;
