import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaGoogle } from "react-icons/fa";
import { AuthContext } from '../../context/UserContext/UserContext';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

const Register = () => {

    const {signInNewUser, updateUser, signInWithGoogle} = useContext(AuthContext);

    const { register, handleSubmit, watch, formState, reset, formState: { errors } } = useForm();

    const navigate = useNavigate();
    const location = useLocation();
  
    const from = location.state?.from?.pathname || '/';

    const onSubmit = data =>{
        signInNewUser(data.email, data.password)
        .then((userCredential) => {
            const user = userCredential.user;
            const userInfo = {
                displayName : data.name
            }
            updateUser(userInfo)
            .then(() => {
              console.log(user);
            })
            .catch(err => console.log(err));
            Swal.fire(
                'Great',
                "You've been registered successfully!",
                'success'
              );
              navigate(from, { replace: true });
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(errorCode, errorMessage)
          });
      };
    
      React.useEffect(() => {
        if (formState.isSubmitSuccessful) {
          reset({ name: '' , email: '', password: ''});
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
                  <span className="label-text">Your Name</span>
                </label>
                <input type="text" placeholder="Full Name" {...register("name", { required: true })} className="input input-bordered" />
                {errors.name?.type === 'required' && <p 
                      className='text-red-700' role="alert">Your full name is required</p>}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="email" placeholder="Email Address" 
                {...register("email", { required: true })} className="input input-bordered" />
                {errors.email?.type === 'required' && <p 
                      className='text-red-700' role="alert">Your email is required</p>}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Create Password</span>
                </label>
                <input type="text" placeholder="Password" {...register("password", { required: true, minLength: 8  })} className="input input-bordered" />
                {errors.password?.type === 'required' && <p 
                      className='text-red-700' role="alert">Your password is required</p>}
            {errors.password?.type === 'minLength' && <p 
                      className='text-red-700' role="alert">Your password should be at least 8 characters long</p>}
                <label className="label">
                  <p className="text-left text-lg">Already registered? <Link to='/login'><span className='text-info'>Click here</span> </Link> to Log In</p>
                </label>
              </div>
              <div className="form-control mt-6">
                <button type='submit' className="btn btn-info text-white">Register</button>
              </div>
              <button onClick={handleGoogleSignIn} className='btn btn-info text-white'>
                <FaGoogle className=''></FaGoogle>
                <p>Register with Google instead </p> 
                </button>
            </div>
          </div>
        </div>
      </form>
    );
};

export default Register;