
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginSuccess } from '../Redux/userSlice';
import axiosInstance from '../utils/axios';
import './styles/adminlogin.css'; 

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axiosInstance.post('adminlogin/admin', {
        email,
        password,
      });

      const userData = response.data;
      console.log(userData);

      if (userData.token) {
        if (userData.isAdmin) {
          localStorage.setItem('jwt', JSON.stringify(userData.token));

          dispatch(loginSuccess({ token: userData.token, isAdmin: userData.isAdmin }));
          navigate('/admin');
        } else {
          setError('Unauthorized - Not an admin');
        }
      } else {
        setError('Unauthorized - Invalid credentials');
      }
    } catch (error) {
      setError('Login failed. Please try again.'); 
      console.error('Login failed:', error.message);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className='h2'>Admin Login</h2>
      <form className='form'>
        <label>Email:</label>
        <input className='input' type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <label>Password:</label>
        <input className='input' type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {error && <div className="error-message">{error}</div>} 
        <button className='button' type="button" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
