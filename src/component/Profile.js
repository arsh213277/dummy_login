// src/components/Profile.js
import React, { useEffect, useState } from 'react';
import '../style/App.css'; // Import the CSS file

const Profile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      const storedUser = JSON.parse(localStorage.getItem('user'));

      if (!storedUser) {
        setError('No user data found');
        return;
      }

      try {
        const response = await fetch(`https://dummyjson.com/users/${storedUser.id}`);
        const data = await response.json();

        if (response.ok) {
          
          localStorage.setItem('userDetails', JSON.stringify(data));
          setUser(data);
        } else {
          setError('Failed to fetch user details');
        }
      } catch (err) {
        setError('An error occurred');
      }
    };

    fetchUser();
  }, []);

  if (error) {
    return <div className="card"><p className="error">{error}</p></div>;
  }

  if (!user) {
    return <div className="card"><p>Loading...</p></div>;
  }

  return (
    <div className="card profile-info">
      <h2>Profile</h2>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Full Name:</strong> {user.firstName} {user.lastName}</p>
      <p><strong>Phone:</strong> {user.phone}</p>
    </div>
  );
};

export default Profile;
