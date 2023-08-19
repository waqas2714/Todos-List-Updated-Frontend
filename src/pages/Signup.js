import React, { useState } from 'react'
import "./Auth.css";
import {Link, useNavigate} from 'react-router-dom';
import {MdOutlineAccountCircle} from 'react-icons/md';
import axios from 'axios';
import {toast} from 'react-toastify';
import { backendURL } from '../Utils/URLS';


const initialState = {
  userName: "",
  email: "",
  password: ""
}

const Signup = () => {
  const [userData, setUserData] = useState(initialState);
  const [confirmPassword, setConfirmPassword] = useState("");
  const {userName, email, password} = userData;
  const navigate = useNavigate();

  const handleInputChange = (e)=>{
    const {name, value} = e.target;
    setUserData({...userData, [name] : value});
  }

  const handleSubmit = async (e)=>{
    e.preventDefault();
    try {
    if (password !== confirmPassword) {
      throw new Error("Passwords do not match.");
    }
    const {data} = await axios.post(`${backendURL}/api/user/signup`, userData);
    console.log(data);
    localStorage.setItem('email', data.email); 
    localStorage.setItem('token', data.token); 
    localStorage.setItem('userId', data.userId); 
    localStorage.setItem('userName', data.userName); 
    toast.success('Logged In Successfully');
    navigate('/home');
    } catch (error) {
      toast.error(error.message);
    }
    
  }

  return (
    <div className="form-container">
      <div className="icon-container">
        <MdOutlineAccountCircle
          size={48}
          color="#007bff"
          style={{ margin: "0px 40%" }}
        />
      </div>
      <form onSubmit={handleSubmit}>
      <div className="inputs">
          <label>Username</label>
          <input type="text" placeholder="Username" name='userName' value={userName} onChange={handleInputChange} />
        </div>
        <div className="inputs">
          <label>Email</label>
          <input type="email" placeholder="Email" name='email' value={email} onChange={handleInputChange}/>
        </div>
        <div className="inputs">
          <label>Password</label>
          <input type="password" placeholder="Password" name='password' value={password} onChange={handleInputChange}/>
        </div>
        <div className="inputs">
          <label>Confirm Password</label>
          <input type="password" placeholder="Password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}/>
        </div>
        <button type='submit'>Login</button>
      </form>
      <div className="link-container">
        <Link to={'/'} className="link">Already Have an Account?</Link>
      </div>
    </div>
  )
}

export default Signup