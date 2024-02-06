import React, { useState } from 'react';
import axios from 'axios';
import "./Register.css"

const Register = ({ onRegister }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      const response = await axios.post('https://anchors-url-shortner-backend.onrender.com/api/user/register', { username, password });
      localStorage.setItem('token', response.data.token);
      window.location.href="/";
      onRegister();
    } catch (error) {
      console.error(error.response ? error.response.data.msg : error.message);
    }
  };

  return (
    <div className='register'>
      <h2>Register</h2>
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default Register;
