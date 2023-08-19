import React, { useEffect, useState } from "react";
import "./Auth.css";
import { IoLogInOutline } from "react-icons/io5";
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import {toast} from 'react-toastify';
import { backendURL } from "../Utils/URLS";

const initialState = {
  email: "",
  password: ""
}
const Login = () => {
  const [userData, setUserData] = useState(initialState);
  const {userName, email, password} = userData;
  const navigate = useNavigate();
  
  const handleInputChange = (e)=>{
    const {name, value} = e.target;
    setUserData({...userData, [name] : value});
  }

  const handleSubmit = async (e)=>{
    e.preventDefault();
    try {
    const {data} = await axios.post(`${backendURL}/api/user/login`, userData);
    console.log(data);
    if (data.email) {
      localStorage.setItem('email', data.email); 
      localStorage.setItem('token', data.token); 
      localStorage.setItem('userId', data.userId); 
      localStorage.setItem('userName', data.userName); 
      toast.success('Logged In Successfully');
      navigate('/home');
    }else{
      toast.error(data.error)
    }
    } catch (error) {
      toast.error(error.message);
    }
    
  }
  return (
    <div className="form-container">
      <div className="icon-container">
        <IoLogInOutline
          size={48}
          color="#007bff"
          style={{ margin: "0px 40%" }}
        />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="inputs">
          <label>Email</label>
          <input type="email" placeholder="Email" name='email' value={email} onChange={handleInputChange} />
        </div>
        <div className="inputs">
          <label>Password</label>
          <input type="password" placeholder="Password" name='password' value={password} onChange={handleInputChange} />
          <Link to={'/forgotPassword'} className="link">Forgot Password</Link>
        </div>
        <button type="submit">Login</button>
      </form>
      <div className="link-container">
        <Link to={'/signup'} className="link">Don't Have an Account?</Link>
      </div>
    </div>
  );
};

export default Login;
