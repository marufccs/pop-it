import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ContentFinder from "../../../APIs/ContentFinder";
import { AuthContext } from "../../../context/UserContext/UserContext";
import Loader from "../../Shared/Loader/Loader";


const UpdateContent = () => {
    const {isLoading} = useContext(AuthContext)
  const { id } = useParams();
  const { contents, setContents } = useContext(AuthContext);
  const [title, setTitle] = useState('');
  const [contentDescription, setContentDescription] = useState('');
  const [contentTag, setContentTag] = useState('');
  const navigate = useNavigate();

  // Fetch the content data for the specified ID
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ContentFinder.get(`/${id}`);
        setTitle(response.data.data.title);
        setContentDescription(response.data.data.content_description);
        setContentTag(response.data.data.content_tag);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [id]);

  // Handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content_description', contentDescription);
      formData.append('content_tag', contentTag);
      const response = await ContentFinder.put(`/${id}`, formData);
      console.log(response.data.data);
      const updatedContent = response.data.data.content;
      const updatedContents = contents.map((content) => {
        if (content.id === updatedContent.id) {
          return updatedContent;
        }
        return content;
      });
      setContents(updatedContents);
      navigate('/allcontents');
    } catch (err) {
      console.log(err);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="max-w-xl mx-auto my-4 px-4 py-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl mb-4 font-semibold">Update Content</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="title">
            Title
          </label>
          <input
            type="text" 
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            placeholder="Enter content description"
            value={contentDescription}
            onChange={(e) => setContentDescription(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="tag">
            Tag
          </label>
          <input
            type="text"
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="tag"
            placeholder="Enter content tag"
            value={contentTag}
            onChange={(e) => setContentTag(e.target.value)}
          />
        </div>
        <div className="flex justify-center">
          <button type="submit" className="btn btn-info text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Save
          </button>
        </div>
      </form>
    </div>
  );
;
              }

export default UpdateContent;  