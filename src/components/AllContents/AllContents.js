import React, { useContext, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import ContentFinder from '../../APIs/ContentFinder';
import { AuthContext } from '../../context/UserContext/UserContext';
import AllContent from './AllContent';

const AllContents = ({props}) => {

    const {contents, setContents} = useContext(AuthContext);

    useEffect(() => {
        const fetchData = async () => {
        try {
           const response = await ContentFinder.get('/');
           setContents(response.data.data.contents)
        } catch (err) {
           console.log(err);
        }};
        fetchData();
    }, []);

    console.log(contents);

    return (
        <div>
            <Helmet>
                <title>All Contents</title>
            </Helmet>
            <h1 className='text-3xl mt-3 lg:text-4xl font-semibold'>
                All <span className='text-info'>Contents</span> 
            </h1>
            <p className='text-justify mx-4 mt-4 lg:text-xl sm:text-sm'>
            Welcome to the "All Contents" page! Here, you can find a collection of all the latest photos uploaded by users on our platform. Scroll through and explore the stunning visual imagery our community has to offer - from landscapes to portraits to still life, there's a world of photographic creativity waiting for you. You can like the photos that catch your eye and leave comments to show your appreciation or start a conversation with the photographer. Keep uploading your own photos to see them featured here too. Don't forget to check out the ongoing challenges to participate and climb up the rankings. Get inspired and start exploring the world through the lens of our talented photographers now!
            </p>
            <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-auto lg:ml-20 sm:ml-12 my-20'>
                {
                    contents.map(content => <AllContent key={content.id} content={content}></AllContent>)
                }
            </div>
        </div>
    );
};

export default AllContents;