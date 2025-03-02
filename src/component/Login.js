// src/components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/App.css'; 

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
  
      // Log response status and body for debugging
      const responseBody = await response.text();
      console.log('Response Status:', response.status);
      console.log('Response Body:', responseBody);
  
      if (response.ok) {
        const data = JSON.parse(responseBody); // Ensure you parse JSON if response is text
        console.log(data);
        localStorage.setItem('user', JSON.stringify(data));
        navigate('/profile');
      } else {
        const errorData = JSON.parse(responseBody); // Parse JSON error response
        setError(errorData.message || 'Login failed');
      }
    } catch (err) {
      console.error('Request Error:', err);
      setError('An error occurred');
    }
  };
  

  return (
    <div className="card">
      <h2>Login</h2>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />
      </label>
      <button onClick={handleLogin}>Login</button>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Login;
