import React from 'react';
import { Helmet } from 'react-helmet';
import UserContext, { AuthContext } from '../../context/UserContext/UserContext';
import Loader from '../Shared/Loader/Loader';
import Banner from './Banner/Banner';
import Intro from './Intro/Intro';
import Newsletter from './Newsletter/Newsletter';
import WorkWithUs from './Workwithus/Workwithus';

const Home = () => {

    const {isLoading} = UserContext(AuthContext);

    if(isLoading){
        return <Loader/>
    }

    return (
        <div>
            <Helmet>
                <title>Home</title>
            </Helmet>
            <Banner/>
            <Intro/>
            <Newsletter/>
            <WorkWithUs/>
        </div>
    );
};

export default Home;