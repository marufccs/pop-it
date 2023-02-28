import React, { useContext, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import UserFinder from '../../APIs/UserFinder';
import { AuthContext } from '../../context/UserContext/UserContext';
import AccessDenied from '../ErrorPage/AccessDenied';
import ErrorPage from '../ErrorPage/ErrorPage';
import Loader from '../Shared/Loader/Loader';

const AdminRoute = ({children}) => {

    const {users, setUsers, isLoading, user} = useContext(AuthContext);
    const location = useLocation();

    useEffect(() => {
        const fetchData = async () => {
        try {
           const response = await UserFinder.get('/');
           setUsers(response.data.data.users)
        } catch (err) {
           console.log(err);
        }};
        fetchData();
    }, []);

    if(isLoading){
        return <Loader/>
    }

    const isAdmin = user && user.email && users.some(us => us.email === user.email && us.role === "Admin" );
    console.log(isAdmin);
    console.log(user);

    if (isAdmin) {
        return children;
      } else {
        return <AccessDenied/>;
      }
};

export default AdminRoute;