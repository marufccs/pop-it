import axios from 'axios';

const ContentFinder = axios.create({
    baseURL: 'http://localhost:5000/contents'
 });

export default ContentFinder;