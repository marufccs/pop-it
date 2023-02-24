import React from 'react';
import { Link } from 'react-router-dom';

const Intro = () => {
    return (
        <div className='mt-4 text-xl lg:text-5xl text-left ml-4'>
            <h1>
            Welcome to <span className='text-info'>Pop</span> IT! <br/> It is the perfect place to unleash your <span className='text-info'>creativity</span> and compete with other talented creators. <br/> Show off your <span className='text-info'>skills</span> and win big with our exciting image challenges. <br/> Join now and start uploading your <span className='text-info'>content!</span>
            </h1>
            <Link to='/uploadcontent'>
            <button className="btn btn-info text-white mt-3">Upload Your Content</button>
            </Link>
        </div>
    );
};

export default Intro;