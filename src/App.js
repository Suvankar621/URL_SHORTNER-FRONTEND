import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import { useParams } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import "./App.css"

const RedirectComponent = () => {
  // Use the useParams hook to get the shortUrl from the URL parameters
  const { shortUrl } = useParams();

  // Perform a redirect to the original URL or display an error message
  // You may want to implement a loading state here or perform additional checks
  window.location.href = `http://localhost:5000/${shortUrl}`;

  return null; // This component doesn't render anything
};
const App = () => {

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/>} />
        {/* Add the route for handling shortened URLs */}
        <Route path="/:shortUrl" element={<RedirectComponent />} />
      </Routes>
    </Router>

    <img src="wave.svg" alt="" />
    </>
  );
};

export default App;
