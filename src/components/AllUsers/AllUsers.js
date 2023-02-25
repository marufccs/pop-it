import React, { useContext, useEffect } from 'react';
import UserFinder from '../../APIs/UserFinder';
import { AuthContext } from '../../context/UserContext/UserContext';

const AllUsers = (props) => {

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

    console.log(users);

    return (
        <div>
                   <div>
            <div className="overflow-x-auto">
  <table className="table w-full">
    <thead>
      <tr>
        <th>User Id</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Email</th>
        <th>Instagram Username</th>
        <th>Gender</th>
        <th></th>
        <th></th>
      </tr>
    </thead>
    <tbody>
        {
            users.map(user => {
               return(
                <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.email}</td>
                <td>{user.instagram_username}</td>
                <td>{user.gender}</td>
                <td><button className="btn btn-success text-white">Update</button></td>
                <td><button className="btn btn-error text-white">Delete</button></td>
            </tr>
               )
            }) 
        }
    </tbody>
  </table>
</div>
        </div>
        </div>
    );
};

export default AllUsers;