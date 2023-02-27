import React from 'react';

const AllContent = ({content}) => {
    const {title, user_name, published_date, image_url, content_tag, content_description} = content;
    console.log(content);
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
          </div>
        </div>
      </div>
    );
};

export default AllContent;