import { createContext, useContext, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RenderPage } from "../components";


// const AuthContext;
// export const AuthData = () => useContext(AuthContext);

export const AuthWrapper = () => {

    const [user, setUser] = useState({ name: "", isAuthenticated: false })

    const login = (userName: string, password: string) => {

        // Make a call to the authentication API to check the username

        return new Promise((resolve, reject) => {

            if (password === "password") {
                setUser({ name: userName, isAuthenticated: true })
                resolve("success")
            } else {
                reject("Incorrect password")
            }
        })


    }
    const logout = () => {

        setUser({ ...user, isAuthenticated: false })
    }


    return (

        // <AuthContext.Provider value={{ user, login, logout }}>
            <RenderPage />
        // </AuthContext.Provider> 

    )

}