import React from 'react';
import Swal from 'sweetalert2';

const Newsletter = () => {

    const handleSubmit = event => {
        event.preventDefault();
        const email = event.target.email.value;
        if(email){
            Swal.fire(
                'Congratulations!',
                "You've finally subscribed to our newsletter!",
                'success'
              )
              event.target.reset();
        }
    }

    return (
        <div>
                  <div className="hero mt-12 mb-12 rounded lg:mx-22 lg:w-full  bg-base-200">
  <div className="hero-content text-center">
    <div className="">
      <h1 className="text-5xl font-bold">Subscribe to Our NewsLetter</h1>
      <p className="py-6">Subscribe to our newsletter to stay updated on the latest news and exciting developments at PopIt! Our platform allows users to participate in fun and engaging challenges by uploading image content. Don't miss out on the opportunity to showcase your creativity and connect with like-minded individuals. Sign up today and be a part of the PopIt community!</p>
      <form onSubmit={handleSubmit}>
      <input className='mr-2 py-3 rounded' type="email" name="email" placeholder='Type your email here'/>
      <button className="btn bg-info text-white">Join Now</button>
      </form>
    </div>
  </div>
</div>
        </div>
    );
};

export default Newsletter;