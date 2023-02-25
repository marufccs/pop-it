import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../context/UserContext/UserContext';

const Header = () => {

  const {user, logOut} = useContext(AuthContext);

  const handleLogOut = () => {
    logOut()
    .then(() => {

    }).catch((error) => {

    });
  }

    return (
        <div>
            <div className="navbar bg-base-100">
  <div className="navbar-start">
    <div className="dropdown">
      <label tabIndex={0} className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </label>
      <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
      <li><Link to='/'>Home</Link></li>
      <li><a>All Contents</a></li>
      <li><Link to='/allusers'>All Users</Link></li>
      {
user && user.uid? 
<li>
<Link>
   My Contents
 </Link>
 <Link to='/uploadcontent'>
 Upload a Content 
 </Link>
 </li>
 : 
 <></>
            }
      {
user && user.uid? 
<li>
<Link onClick={handleLogOut}>
   Log Out
 </Link>
 </li>
 : 
 <>
 <li>
 <Link to='/login'>
   Log In
 </Link>
 </li>
 <li>
 <Link to='/register'>
   Register Now
 </Link>
 </li>
 </>
            }
      </ul>
    </div>
    <Link to='/' className="btn btn-ghost normal-case text-3xl"> <span className='text-info mr-2'>Pop</span> IT</Link>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
    <li><Link to='/'>Home</Link></li>
      <li><Link>All Contents</Link></li>
      <li><Link to='/allusers'>All Users</Link></li>
      {
user && user.uid? 
<li>
<Link>
   My Contents
 </Link>
 <Link to='/uploadcontent'>
 Upload a Content 
 </Link>
 </li>
 : 
 <></>
            }
      {
user && user.uid? 
<li>
<Link onClick={handleLogOut}>
   Log Out
 </Link>
 </li>
 : 
 <>
 <li>
 <Link to='/login'>
   Log In
 </Link>
 </li>
 <li>
 <Link to='/register'>
   Register Now
 </Link>
 </li>
 </>
            }
    </ul>
  </div>
  <div className="navbar-end">
    <Link to='/uploadcontent' className="btn btn-info text-white">Get started</Link>
  </div>
</div>
        </div>
    );
};

export default Header;