import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import UserFinder from '../../APIs/UserFinder';
import { AuthContext } from '../../context/UserContext/UserContext';
import AccessDenied from '../ErrorPage/AccessDenied';
import AccessDenied2 from '../ErrorPage/AccessDenied2';
import Loader from '../Shared/Loader/Loader';

const SellerRoute = ({children}) => {
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

    const isSeller = user && user.email && users.some(us => us.email === user.email && us.role === "User" );

    if (isSeller) {
        return children;
      } else {
        return <AccessDenied2/>;
      }
};


export default SellerRoute;