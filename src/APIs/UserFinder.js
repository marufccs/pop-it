import axios from 'axios';

const UserFinder = axios.create({
    baseURL: 'http://localhost:5000/users'
 });

export default UserFinder;