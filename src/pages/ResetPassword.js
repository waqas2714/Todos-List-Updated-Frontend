import React, { useState } from 'react'
import './Auth.css'
import {MdLockReset} from 'react-icons/md'
import axios from 'axios';
import { backendURL } from '../Utils/URLS';
import { toast } from 'react-toastify';
import { Link, useNavigate, useParams } from 'react-router-dom';

const initialState = {
    token: "",
    newPassword: ""
}

const ResetPassword = () => {
    const [userData, setUserData] = useState(initialState);
    const [confirmPassword, setConfirmPassword] = useState("");
    const {newPassword} = userData; 
    const { token } = useParams();
    userData.token = token;
    const navigate = useNavigate();

    const handleInputChange = (e)=>{
        const {name, value} = e.target;
        setUserData({...userData, [name]:value})
    }

    const handleSubmit = async (e)=>{
        try {
            e.preventDefault();
            if (newPassword !== confirmPassword) {
                throw new Error("Passwords do not match");
            }
            const {data} = await axios.post(`${backendURL}/api/user/forgotPassword`, userData);
            toast.success("Password changed successfully.");
            navigate('/');
        } catch (error) {
            toast.error(error.message);
        }
    }
  return (
    <div className='form-container'>
        <div className="icon-container"><MdLockReset size={48} color='#007bff'/></div>
        <form onSubmit={handleSubmit}>
            <label style={{marginTop : "16px"}}>Password</label>
            <input type="password" placeholder='Password' value={newPassword} name='newPassword' onChange={handleInputChange} />
            <label style={{marginTop : "16px"}}>Confirm Password</label>
            <input type="password" placeholder='Password' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} />
            <Link to={'/'} className='link'>Login Page</Link>
            <button type='submit' style={{marginTop : "16px"}}>Send</button>
        </form>
    </div>
  )
}

export default ResetPassword