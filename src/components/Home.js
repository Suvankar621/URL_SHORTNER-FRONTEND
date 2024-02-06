import React, { useState } from 'react';
import "./Home.css";
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {

  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  const handleShorten = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
      };

      const response = await axios.post('https://anchors-url-shortner-backend.onrender.com/api/url/shorten', { originalUrl }, config);
      setShortUrl(response.data.shortUrl);
    } catch (error) {
      alert("Login Required")
      console.error(error.response ? error.response.data.msg : error.message);
    }
  };



  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <>

    <div className='navbar'>
      <h1>URL Shortener</h1>

      {!isLoggedIn ? (
        <div className='buttons'>
         <Link to="/login"> <button>Login</button></Link>
         <Link to="/register"> <button>Register</button></Link>

        </div>
      ) : (
        <div className='navbar'>
          <Link to="/dashboard"> <button>Dashboard</button></Link>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}

    </div>
    <div className="urlshortner">
      
      <h2>Shorten URL</h2>
      <input
        type="text"
        placeholder="Enter URL"
        value={originalUrl}
        onChange={(e) => setOriginalUrl(e.target.value)}
      />
      <button onClick={handleShorten}>Shorten</button>
<div className="container">
{shortUrl && (
        <div>
         <p>Shortened URL:</p><a href={shortUrl} target="_blank" rel="noopener noreferrer">
            {shortUrl}
          </a>
         
        </div>
      )}
</div>
    
    </div>
    </>
  );
};

export default Home;
