import { Home, Login } from '../../pages'

export const routes = [
    { path: "/", name: "Home", element: <Home />, isMenu: true, isPrivate: false },
    { path: "/login", name: "Login", element: <Login />, isMenu: false, isPrivate: false },
]