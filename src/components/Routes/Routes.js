import { createBrowserRouter } from "react-router-dom";
import AllUsers from "../AllUsers/AllUsers";
import Home from "../Home/Home";
import LogIn from "../LogIn/LogIn";
import Register from "../LogIn/Register";
import Main from "../Main/Main";
import UploadContent from "../UploadContent/UploadContent";
import PrivateRoute from "./PrivateRoute";

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
            {
                path: '/allusers',
                element: <AllUsers/>
            },
            {
                path: '/uploadcontent',
                element: <PrivateRoute>
                    <UploadContent/>
                </PrivateRoute>
            }
        ]
    }
])