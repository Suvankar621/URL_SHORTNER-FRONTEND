import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./Dashboard.css"

const Dashboard = () => {
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          // Redirect to login or handle unauthorized access
          return;
        }

        const config = {
          headers: {
            'x-auth-token': token,
          },
        };

        const response = await axios.get('https://anchors-url-shortner-backend.onrender.com/api/url', config);
        setUrls(response.data);
      } catch (error) {
        console.error(error.response ? error.response.data.msg : error.message);
      }
    };

    fetchUrls();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        // Redirect to login or handle unauthorized access
        return;
      }

      const config = {
        headers: {
          'x-auth-token': token,
        },
      };

      await axios.delete(`https://anchors-url-shortner-backend.onrender.com/api/url/${id}`, config);
      setUrls((prevUrls) => prevUrls.filter((url) => url._id !== id));
    } catch (error) {
      console.error(error.response ? error.response.data.msg : error.message);
    }
  };

  return (
    <div className='dashboard'>
      <h1>Dashboard</h1>
      <ul>
        {urls.map((url) => (
          <li key={url._id}>
            <p id='url'>ORIGINAL URL= {url.originalUrl}</p>
            <p >SHORTEN URL= <a href={url.shortUrl} target="_blank" rel="noopener noreferrer"id='surl'>
            {url.shortUrl}
          </a></p>
            <button onClick={() => handleDelete(url._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
