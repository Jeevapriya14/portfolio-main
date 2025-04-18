import { useState, useEffect } from 'react';
import axios from 'axios';
import { Loader } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import {Blogcomponent} from '../components/Blogcomponent';

export const Blogs = () => {
  const url = "https://67fd20ce3da09811b174c8aa.mockapi.io/blog";
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(url);
      if (response.status === 200 || response.status === 201) {
        console.log(response); 
        setBlogs(response.data);
      } else {
        console.error("API error: ", response.status);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <div className='w-screen h-auto flex flex-col justify-center items-center'>
        <h1 className='text-4xl text-orange-400 font-mono'>BLOGS</h1>
        {loading ? (
          <div className='w-screen h-screen flex justify-center items-center'>
            <Loader className='text-white animate-spin ' />
          </div>
          
        ) : blogs.length > 0 ? (
          blogs.map((item) => (
            <Blogcomponent
            key={item.id}
            id={item.id} 
            title={item.Title}
            body={item.Body}
            blog={item.Blog}
            fetchData={fetchData}
          />
          ))
        ) : (
          <p className="text-gray-600">No blogs available.</p>
        )}
      </div>
    </>
  );
};

export default Blogs;
