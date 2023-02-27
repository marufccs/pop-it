import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';
import { FaTag } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import ContentFinder from '../../APIs/ContentFinder';
import UserFinder from '../../APIs/UserFinder';
import { AuthContext } from '../../context/UserContext/UserContext';

const UploadContent = () => {
    
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const {users, setUsers} = useContext(AuthContext);

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

    // console.log(users);
    const {user} = useContext(AuthContext);

    
    const userName = user?.displayName;
    const userEmail = user?.email;
    // console.log(userName);
    const userr = users.find(user => user.email === userEmail);

    const handleAddProducts = async (data) => {
        // console.log(data);
        const name= data.name;
        const tag= data.tag;
        const description= data.description;
        const now = new Date();
        const options = {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
        };
        const formattedDate = now.toLocaleString('en-US', options);
        const image = data.img[0];

        //upload image to imgbb
        const formData = new FormData();
        formData.append("image", image);
        const url = 'https://api.imgbb.com/1/upload?&key=6813c9d93b8cda65acb168cce85fe572';
        const response = await fetch(url, {
          method: "POST",
          body: formData,
        });
        const imgData = await response.json();
        // console.log(imgData);

       // Create new content using the Imgbb URL
        const responsePromise = ContentFinder.post('/', {
                user_id: userr.id,
                title: name,
                content_tag: tag,
                content_description: description,
                user_name:  userName,
                image_url: imgData.data.url,
                published_date: formattedDate,
            })
            responsePromise.then((response) => {
                console.log(response);
                Swal.fire(
                    'Awesome!',
                    'You have uploaded the content successfully!',
                    'success'
                  )
                  navigate('/allcontents')
            })

        }
        
      
    return (
        <div>
            <Helmet>
                <title>
                    Upload Content
                </title>
            </Helmet>
        <div className=' mx-6'>
        <h2 className='text-3xl font-semibold mt-12'>Upload Your <span className='text-info'>Content</span> Here</h2>
        <div className='lg:ml-16'>
        <form onSubmit={handleSubmit(handleAddProducts)} className='grid grid-cols-1 lg:ml-96 sm:mx-auto gap-3 mt-10'>
            
       <input type="text" {...register("name", { required: "Name is required" })}  placeholder="Content Name" className="input sm:w-3/4 lg:w-1/2 input-bordered" />

       <input type="text" {...register("tag", { required: "Tag is required" })}  placeholder="Content Tag" className="input sm:w-3/4 lg:w-1/2 input-bordered" />
      
       <input type="file"  {...register("img", { required: "Image is required" })}  placeholder="Product Image" className="sm:w-3/4 lg:w-1/2 input input-bordered" />   

       <textarea {...register("description")} className="textarea textarea-bordered sm:w-3/4 lg:w-1/2" placeholder="Content Description(Optional)"></textarea>

       <br />
           <input className='btn btn-accent text-white sm:w-3/4 lg:w-1/2' type="submit" value="Submit" />
       </form>
           </div>
       </div>
       </div>
    );
};

export default UploadContent;