import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaGoogle } from "react-icons/fa";
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { AuthContext } from '../../context/UserContext/UserContext';

const LogIn = () => {

    const {signInUser, signInWithGoogle} = useContext(AuthContext);

    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
  
    const from = location.state?.from?.pathname || '/';

    const { register, handleSubmit, watch, formState, reset, formState: { errors } } = useForm();

    const onSubmit = data =>{
        signInUser(data.email, data.password)
        .then((userCredential) => {
            const user = userCredential.user;
            setError('');
            Swal.fire(
                'Great',
                "You've been logged in successfully!",
                'success'
              );
              navigate(from, { replace: true });
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
            setError(errorMessage);
          });
    }

    React.useEffect(() => {
        if (formState.isSubmitSuccessful) {
          reset({ email: '', password: ''});
        }
      }, [formState, reset]);
    
      const handleGoogleSignIn = () => {
        signInWithGoogle()
        .then((result) => {
          const user = result.user;
          Swal.fire(
            'Congrats!',
            "You've been signed in successfully with Google!",
            'success'
          )
          
            navigate(from, { replace: true });
            
        }).catch((error) => {
          const errorMessage = error.message;
        });
      }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="hero lg:min-h-screen my-12 lg:my-0">
  <div className="hero-content min-w-full">
    <div className="card shadow-2xl w-full lg:w-1/3 bg-base-100">
      <div className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="text" placeholder="email"  {...register("email", { required: true })}  className="input input-bordered" />
          {errors.email?.type === 'required' && <p 
                      className='text-red-700' role="alert">Your email is required</p>}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="text" placeholder="password"  {...register("password", { required: true, minLength: 8  })} className="input input-bordered" />
          {errors.password?.type === 'required' && <p 
                      className='text-red-700' role="alert">Your password is required</p>}
                      {
                        error && <p className='text-red-700'>{error}</p>
                      }
          <label className="label">
            <p className="text-left text-lg">Haven't registered yet? <Link to='/register'><span className='text-info'>Click here</span> </Link> to register</p>
          </label>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-info text-white">Login</button>
        </div>
        <button className='btn btn-info text-white'>
                <FaGoogle className=''></FaGoogle>
                <p>Log In with Google instead </p> 
                </button>
      </div>
    </div>
  </div>
</form>
    );
};

export default LogIn;