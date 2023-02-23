import { createBrowserRouter } from "react-router-dom";
import Home from "../Home/Home";
import LogIn from "../LogIn/LogIn";
import Register from "../LogIn/Register";
import Main from "../Main/Main";

export const router= createBrowserRouter([
    {
        path: '/',
        element: <Main/>,
        children: [
            {
                path: '/',
                element: <Home/>
            },
            {
                path: '/login',
                element: <LogIn/>
            },
            {
                path: '/register',
                element: <Register/>
            },
        ]
    }
])