import React, { useState } from 'react';
import axios from 'axios';
import "./Login.css"

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://anchors-url-shortner-backend.onrender.com/api/user/login', { username, password });
      localStorage.setItem('token', response.data.token);
      window.location.href="/"
      onLogin();
    } catch (error) {
      console.error(error.response ? error.response.data.msg : error.message);
    }
  };

  return (
    <div className='login'>
      <h2>Login</h2>
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
