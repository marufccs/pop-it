import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { AiOutlineLike } from "react-icons/ai";
import UserContext, { AuthContext } from '../../context/UserContext/UserContext';
import Loader from '../Shared/Loader/Loader';

const AllContent = ({content}) => {
    const {id, title, user_name, published_date, image_url, content_tag, content_description, user_id} = content;
    const [numLikes, setNumLikes] = useState(0);

    const {isLoading} = UserContext(AuthContext);


    

        // Fetch the number of likes for this content
        const fetchLikes = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/like-content?content_id=${id}&random=${Math.random()}`);
                setNumLikes(response.data.numLikes);
                console.log(`Number of likes for content with id ${id}:`, response.data.numLikes);
            } catch (error) {
                console.error(error);
            }
        };


          // Fetch the number of likes for this content on component mount
          useEffect(() => {
            fetchLikes();
        }, [id]);

        if(isLoading){
            return <Loader/>
        }

        
    //Handle the like function
    const handleLike = async () => {
        try {
            const response = await axios.post('http://localhost:5000/like-content', {
                user_id: user_id, 
                content_id: id
            });
            if (response.data.success) {
                setNumLikes(prevNumLikes => prevNumLikes + 1);
                console.log('Content liked!');
                fetchLikes();
                window.location.reload(true);
            } else {
                console.error('Failed to like content');
            }
        } catch (error) {
            console.error(error);
        }
    };




    return (
        <div className="card card-compact w-96 bg-base-100 shadow-xl mt-3">
        <figure><img className='h-72 w-full' src={image_url} alt='' /></figure>
        <div className="card-body">
          <h2 className="card-title justify-center text-2xl">{title}</h2>
          <div className='text-left'>
          <p><span className='font-medium text-lg'>Description: </span>{content_description}</p>
          <p><span className='font-medium text-lg'>Content Tag: </span>{content_tag}</p>
          <p><span className='font-medium text-lg'>User Name: </span>{user_name} </p>
          <p><span className='font-medium text-lg'>Published Date: </span> {String(published_date).substring(0, 10)}</p>
          <button onClick={() => handleLike()} className='text-2xl btn btn-info text-white mt-2 flex items-center gap-2'> <span className='text-xl'>Like </span><AiOutlineLike></AiOutlineLike></button>
          <p><span className='font-medium text-lg'>Number of Likes: </span>{numLikes}</p>
          </div>
        </div>
      </div>
    );
};

export default AllContent;