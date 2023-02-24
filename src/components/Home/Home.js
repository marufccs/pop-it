import React from 'react';
import Banner from './Banner/Banner';
import Intro from './Intro/Intro';
import Newsletter from './Newsletter/Newsletter';
import WorkWithUs from './Workwithus/Workwithus';

const Home = () => {
    return (
        <div>
            <Banner/>
            <Intro/>
            <Newsletter/>
            <WorkWithUs/>
        </div>
    );
};

export default Home;