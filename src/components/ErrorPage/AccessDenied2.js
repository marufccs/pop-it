import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/UserContext/UserContext';
import Loader from '../Shared/Loader/Loader';

const AccessDenied2 = () => {

    const {isLoading} = useContext(AuthContext);
    
    if(isLoading){
        return <Loader/>
    }

    return (
        <div>
             <div className="mt-28 rounded">
            <div className="bg-slate-200 mx-56 py-24 rounded">
                <h1 className="text-6xl font-semibold">403</h1>
                <p className="text-2xl"> <span className="">Access Denied</span> <br /> You must be a Seller to enter this page</p>
                <Link to="/" className="btn btn-info text-white mt-6">Go Home</Link>
            </div>
            </div>
        </div>
    );
};

export default AccessDenied2;