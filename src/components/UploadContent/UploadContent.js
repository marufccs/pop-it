import React, { useContext, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/UserContext/UserContext';

const UploadContent = () => {

    
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const imageHostKey = process.env.REACT_APP_imgbb_key;
    const {user} = useContext(AuthContext);


    const handleAddProducts = data => {
        console.log(data);
        const name= data.name;
        const price= data.price;
        const condition= data.condition;
        const number= data.number;
        const location= data.location;
        const originalPrice= data.originalPrice;
        const purchaseYear= data.purchaseYear;
        const description= data.description;
        const category_id= data.category_id

        const image = data.img[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?&key=${imageHostKey}`;
        fetch(url, {
          method: 'POST',
          body: formData
        })
        .then(res => res.json())
        .then(imgData => {
            if(imgData.success){
              console.log(imgData.data.url);
     
        const product = {
                title: name,
                resalePrice: price,
                productCondition: condition,
                sellerPhoneNumber: number,
                location: location,
                originalPrice: originalPrice,
                yearsOfUse: purchaseYear,
                productDescription: description,
                img: imgData.data.url,
                time: Date(),
                sellerName:  user?.displayName,
                category_id: category_id
            }
            console.log(product);
        
            }
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
            
       <input type="text" {...register("name", { required: "Name is required" })}  placeholder="Product Name" className="input sm:w-3/4 lg:w-1/2 input-bordered" />
      
       <input type="file"  {...register("img", { required: "Image is required" })}  placeholder="Product Image" className="input sm:w-3/4 lg:w-1/2 input input-bordered" />   
                       
       <input  type="text" {...register("price", { required: "price is required" })} placeholder="Product Price" className="input sm:w-3/4 lg:w-1/2 input-bordered" />

       <select {...register("condition", { required: "condition is required" })} className="select select-bordered sm:w-3/4 lg:w-1/2">

       <option disabled selected>Product Condition</option>
        <option>Excellent</option>
       <option>Good</option>
       <option>Fair</option>
       </select>

       <input type="text" {...register("number", { required: "number is required" })} placeholder="Your Phone Number" className="input sm:w-3/4 lg:w-1/2 input-bordered" />

       <input type="text" {...register("location", { required: "location is required" })} placeholder="Your Location" className="input sm:w-3/4 lg:w-1/2 input-bordered" required/>

       <input type="text" {...register("originalPrice", { required: "originalPrice is required" })}  placeholder="Original Price" className="input sm:w-3/4 lg:w-1/2 input-bordered" required/>

       <input type="text" {...register("purchaseYear", { required: "purchaseYear is required" })} placeholder="Year of Purchase" className="input sm:w-3/4 lg:w-1/2 input-bordered" required/>

       <textarea {...register("description", { required: "description is required" })} className="textarea textarea-bordered sm:w-3/4 lg:w-1/2" placeholder="Product Description"></textarea>

       <br />
           <input className='btn btn-accent text-white sm:w-3/4 lg:w-1/2' type="submit" value="Submit" />
       </form>
           </div>
       </div>
       </div>
    );
};

export default UploadContent;