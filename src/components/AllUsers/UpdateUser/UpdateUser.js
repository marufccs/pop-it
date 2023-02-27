import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, } from 'react-router-dom';
import UserFinder from '../../../APIs/UserFinder';

const UpdateUser = () => {
  const { id } = useParams();
  let navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [instagramUsername, setInstagramUsername] = useState('');
  const [gender, setGender] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const response = await UserFinder.get(`/${id}`);
      const userData = response.data.data.user;
      setFirstName(userData.first_name);
      setLastName(userData.last_name);
      setEmail(userData.email);
      setInstagramUsername(userData.instagram_username);
      setGender(userData.gender);
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedUser = {
      first_name: firstName,
      last_name: lastName,
      email,
      instagram_username: instagramUsername,
      gender,
    };
    await UserFinder.put(`/${id}`, updatedUser);
    navigate('/');
  };

  return (
<div class="flex justify-center items-center w-full h-screen bg-gray-100 ">
  <div class="max-w-md w-full mx-4 bg-white rounded-md shadow-md overflow-hidden p-6 mt-4">
    <h1 class="text-4xl font-bold mb-4">Update User</h1>
    <form onSubmit={handleSubmit}>
      <div class="mb-4">
        <label class="block mb-2">
          <h2 className='text-2xl'>First Name</h2>
          <input
            type="text"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            class="border px-3 py-2 w-full rounded mt-2"
          />
        </label>
      </div>
      <div class="mb-4">
        <label class="block mb-2">
        <h2 className='text-2xl'>Last Name</h2>
          <input
            type="text"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            class="border px-3 py-2 w-full rounded mt-2"
          />
        </label>
      </div>
      <div class="mb-4">
        <label class="block mb-2">
        <h2 className='text-2xl'>Email</h2>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            class="border px-3 py-2 w-full rounded mt-2"
          />
        </label>
      </div>
      <div class="mb-4">
        <label class="block mb-2">
        <h2 className='text-2xl'>Instagram Username</h2>
          <input
            type="text"
            value={instagramUsername}
            onChange={e => setInstagramUsername(e.target.value)}
            class="border px-3 py-2 w-full rounded mt-2"
          />
        </label>
      </div>
      <div class="mb-4">
        <label class="block mb-2">
        <h2 className='text-2xl'>Gender</h2>
          <select
            value={gender}
            onChange={e => setGender(e.target.value)}
            class="border px-3 py-2 w-full rounded mt-2"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </label>
      </div>
      <button
        type="submit"
        primary
        class="btn btn-info text-white w-full lg:w-auto"
      >
        Update User
      </button>
    </form>
  </div>
</div>

  );
};

export default UpdateUser;