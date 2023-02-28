import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaGoogle } from "react-icons/fa";
import { AuthContext } from '../../context/UserContext/UserContext';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet';
import UserFinder from '../../APIs/UserFinder';

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
                displayName : data.first_name
            }
            updateUser(userInfo)
            .then(() => {
              // console.log(user);
            })
            .catch(err => console.log(err));

            const responsePromise  = UserFinder.post('/', {
                first_name: data.first_name,
                last_name: data.last_name,
                email: data.email,
                instagram_username: data.instagram_username,
                gender: data.gender,
                role: data.role
            })
            responsePromise.then((response) => {
                console.log(response);
            })
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
        <div>
            <Helmet>
                <title>
                    Register
                </title>
            </Helmet>
        <form onSubmit={handleSubmit(onSubmit)} className="hero lg:min-h-screen my-12 lg:my-0">
        <div className="hero-content min-w-full">
          <div className="card shadow-2xl w-full lg:w-1/3 bg-base-100">
            <div className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">First Name</span>
                </label>
                <input type="text" placeholder="First Name" {...register("first_name", { required: true })} className="input input-bordered" />
                {errors.first_name?.type === 'required' && <p 
                      className='text-red-700' role="alert">Your first name is required</p>}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Last Name</span>
                </label>
                <input type="text" placeholder="Last Name" {...register("last_name", { required: true })} className="input input-bordered" />
                {errors.last_name?.type === 'required' && <p 
                      className='text-red-700' role="alert">Your last name is required</p>}
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
                  <span className="label-text">Instagram Username</span>
                </label>
                <input type="text" placeholder="Instagram Username" {...register("instagram_username", { required: true })} className="input input-bordered" />
                {errors.instagram_username?.type === 'required' && <p 
                      className='text-red-700' role="alert">Your Instagram Username is required</p>}
              </div>
              <div className="form-control w-full">
  <label className="label">
    <span className="label-text">Your Gender</span>
  </label>
  <select {...register("gender", { required: true })} className="select select-bordered">
    <option disabled selected>Your Gender</option>
    <option>Male</option>
    <option>Female</option>
  </select>
</div>
<div className='form-control w-full'>
    <label className="label">
        <span className="label-text">Your Role</span>
      </label>
    <select {...register("role", { required: "Your Role is Required"})} className="select select-bordered" required>
  <option disabled selected>Your Role</option>
  <option>User</option>
  <option>Admin</option>
  {errors.type && <p className='text-red-500'>{errors.type.message}</p>}
</select>
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
      </div>
    );
};

export default Register;