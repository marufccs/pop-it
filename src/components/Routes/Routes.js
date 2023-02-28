import { createBrowserRouter } from "react-router-dom";
import AllContents from "../AllContents/AllContents";
import AllUsers from "../AllUsers/AllUsers";
import UpdateUser from "../AllUsers/UpdateUser/UpdateUser";
import ErrorPage from "../ErrorPage/ErrorPage";
import Home from "../Home/Home";
import LogIn from "../LogIn/LogIn";
import Register from "../LogIn/Register";
import Main from "../Main/Main";
import Statistics from "../Statistics/Statistics";
import UploadContent from "../UploadContent/UploadContent";
import AdminRoute from "./AdminRoute";
import PrivateRoute from "./PrivateRoute";

export const router= createBrowserRouter([
    {
        path: '/',
        element: <Main/>,
        errorElement: <ErrorPage/>,
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
                element: 
                <AdminRoute>
                    <AllUsers/>
                    </AdminRoute>
            },
            {
                path: '/allcontents',
                element: <AllContents/>
            },
            {
                path: '/statistics',
                element: <Statistics/>
            },
            {
                path: '/users/:id/update',
                loader: ({params}) => 
                    fetch (`http://localhost:5000/users/${params.id}/update`),
                element: <UpdateUser/>
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