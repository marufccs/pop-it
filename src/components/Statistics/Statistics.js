import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import ContentFinder from '../../APIs/ContentFinder';

const Statistics = () => {
  const [contents, setContents] = useState([]);
  const navigate = useNavigate();

    useEffect(() => {
    const fetchData = async () => {
    try {
       const response = await ContentFinder.get('/');
       setContents(response.data.data.contents)
    } catch (err) {
       console.log(err);
    }};
    fetchData();
}, []);

console.log(contents);


    //To update the content
    const handleUpdate = (id) => {
        navigate(`/contents/${id}/update`);
    }

  //To delete the content
  const handleDelete = async (id) => {
    try {
      const response = await ContentFinder.delete(`/${id}`);
      const remaining = contents.filter((content) => content.id !== id);
      setContents(remaining);
      Swal.fire('Good job!', 'You deleted the content successfully!', 'success');
    } catch (err) {
      console.error(err);
    }
  };

  console.log(contents);

  // Sort contents by number of likes

  return (
    <div>
      <Helmet>
        <title>Statistics</title>
      </Helmet>
      <h3 className='text-justify mx-4 mt-4 lg:text-xl sm:text-sm mb-6'>
        Welcome to the statistics page! Here you can find valuable insights about the challenges and contents uploaded by
        our users. Check out the graphs and charts to see how users are performing in different challenges, and get a
        glimpse of the most popular content uploaded. Stay tuned for more updates!
      </h3>
      <div>
        <div className='overflow-x-auto'>
          <table className='table w-full'>
            <thead>
              <tr>
                <th>Content Id</th>
                <th>User Id</th>
                <th>User Name</th>
                <th>Content Title</th>
                <th>Content Tag</th>
                <th>Likes</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {contents.map((content) => {
                return (
                  <tr key={content.id}>
                    <td>{content.id}</td>
                    <td>{content.user_id}</td>
                    <td>{content.user_name}</td>
                    <td>{content.title}</td>
                    <td>{content.content_tag}</td>
                    <td>{content.numLikes}</td>
                    <td>
                      <button onClick={() => handleUpdate(content.id)} className='btn btn-success text-white'>
                        Update
                      </button>
                    </td>
                    <td>
                      <button onClick={() => handleDelete(content.id)} className='btn btn-error text-white'>
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Statistics;