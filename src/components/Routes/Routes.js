import { createBrowserRouter } from "react-router-dom";
import AllContents from "../AllContents/AllContents";
import UpdateContent from "../AllContents/UpdateContent/UpdateContent";
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
import SellerRoute from "./SellerRoute";

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
                path: '/users/:id/update',
                loader: ({params}) => 
                    fetch (`http://localhost:5000/users/${params.id}/update`),
                element: <UpdateUser/>
            },
            {
                path: '/allcontents',
                element: <PrivateRoute><AllContents/></PrivateRoute>
            },
            {
                path: '/contents/:id/update',
                loader: ({params}) => 
                    fetch (`http://localhost:5000/contents/${params.id}/update`),
                element: <UpdateContent/>
            },
            {
                path: '/statistics',
                element: <PrivateRoute> <Statistics/> </PrivateRoute>
                      
            },
            {
                path: '/uploadcontent',
                element: <SellerRoute>
                    <UploadContent/>
                    </SellerRoute>
            }
        ]
    }
])