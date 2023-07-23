import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/global.css'
import './styles/fonts.css'
import {Provider} from "react-redux";
import {store} from "./redux";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <Provider store={store}>
        <App />
    </Provider>
);

