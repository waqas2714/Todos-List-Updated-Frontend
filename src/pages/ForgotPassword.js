import React, { useState } from 'react'
import './Auth.css'
import {MdPassword} from 'react-icons/md'
import axios from 'axios';
import { backendURL } from '../Utils/URLS';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async (e)=>{
        try {
            e.preventDefault();
            const {data} = await axios.post(`${backendURL}/api/user/forgotPassword`, {email});
            const {success, message} = data;
            if (success) {
                toast.success(message);
                navigate('/');
            }   
        } catch (error) {
            toast.error(error.message);
        }
    }
  return (
    <div className='form-container'>
        <div className="icon-container"><MdPassword size={48} color='#007bff'/></div>
        <form onSubmit={handleSubmit}>
            <label >Email</label>
            <input type="email" placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)} />
            <Link to={'/'} className='link'>Login Page</Link>
            <button type='submit' style={{marginTop : "16px"}}>Send</button>
        </form>
    </div>
  )
}

export default ForgotPassword