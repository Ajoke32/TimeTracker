import {AppRoutes} from "./pages";
import {BrowserRouter} from "react-router-dom";


function App() {


  return (
      <BrowserRouter basename="/">
        <AppRoutes />
      </BrowserRouter>
  )
}

export default App
