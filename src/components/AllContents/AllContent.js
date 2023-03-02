import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { AiOutlineLike } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import ContentFinder from '../../APIs/ContentFinder';
import UserContext, { AuthContext } from '../../context/UserContext/UserContext';
import Loader from '../Shared/Loader/Loader';

const AllContent = ({content}) => {
    const {id, title, user_name, published_date, image_url, content_tag, content_description, user_id} = content;
    const [numLikes, setNumLikes] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    const navigate = useNavigate();

    const {isLoading, contents, setContents} = useContext(AuthContext);

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
            setIsLiked(true); // Set isLiked to true when the request is successful
            console.log('Content liked!');
            fetchLikes();
          } else {
            console.error('Failed to like content');
          }
        } catch (error) {
          console.error(error);
        }
      };

    //To update the content
    const handleUpdate = (id) => {
        navigate(`/contents/${id}/update`);
    }
      

    //To delete the content
    const handleDelete = async (id) => {
        try {
            const response = await ContentFinder.delete(`/${id}`);
            const remaining = contents.filter(content => content.id !== id);
            setContents(remaining);
            Swal.fire(
                'Good job!',
                'You deleted the content successfully!',
                'success'
              )
        } catch(err){
            console.error(err)
        }
    }

    return (
        <div className="card card-compact w-96 bg-base-100 shadow-xl mt-4">
        <figure><img className='h-72 w-full' src={image_url} alt='' /></figure>
        <div className="card-body">
          <h2 className="card-title justify-center text-2xl">{title}</h2>
          <div className='text-left'>
          <p><span className='font-medium text-lg'>Description: </span>{content_description}</p>
          <p><span className='font-medium text-lg'>Content Tag: </span>{content_tag}</p>
          <p><span className='font-medium text-lg'>User Name: </span>{user_name} </p>
          <p><span className='font-medium text-lg'>Published Date: </span> {String(published_date).substring(0, 10)}</p>
          <button onClick={() => handleLike()} className='text-2xl btn btn-info text-white mt-2 flex items-center gap-2' disabled={isLiked}> <span className='text-xl'>Like </span><AiOutlineLike></AiOutlineLike></button>
          <p><span className='font-medium text-lg'>Number of Likes: </span>{numLikes}</p>
          <div className='flex justify-between mt-2'>
            <button onClick={() => handleUpdate(id)} className='btn btn-success text-white'>Update</button>
            <button onClick={() => handleDelete(id)} className='btn btn-error text-white'>Delete</button>
          </div>
          </div>
        </div>
      </div>
    );
};

export default AllContent;