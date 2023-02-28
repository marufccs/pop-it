import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <div>
             <div className="mt-28 rounded">
            <div className="bg-slate-200 mx-56 py-24 rounded">
                <h1 className="text-6xl font-semibold">404</h1>
                <p className="text-2xl"> <span className="">Oops!</span> <br /> Page not found.</p>
                <p className="text-2xl">
                    The page you're looking for doesn't exist.
                  </p>
                <Link to="/" className="btn btn-info text-white mt-6">Go Home</Link>
            </div>
            </div>
        </div>
    );
};

export default ErrorPage;