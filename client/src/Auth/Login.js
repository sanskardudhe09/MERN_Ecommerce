import React from 'react'
import Layout from '../components/Layout/Layout';
import axios from "axios"
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./auth.css";
import { useState } from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import { useAuth } from '../context/auth';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const[auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const res = await axios.post("/api/login", {email,password});
      if(res && res.data.user){
          toast.success("User Logged In Successfully!!");
          setAuth({
            ...auth,
            user: res.data.user,
            token: res.data.token
          })
          localStorage.setItem('auth', JSON.stringify(res.data));
          setTimeout(()=>{
            navigate(location.state || "/");
          },1000);
      }else{
        toast.error(res.data.message);
      }
    }catch(err){
      toast.error("Some Error Occurred!!")
    }
  };
  return (
    <Layout>
            <div className='formcont pt-5'>
                <form className='loginform' onSubmit={handleSubmit}>
                    <h3 className="title">LOGIN HERE</h3>
                    <label  className="form-label">Email address</label>
                    <input type="email" id="email" value={email} onChange={(e) =>setEmail(e.target.value)}
                    className="form-control mb-3"  required/>
                    <label  className="form-label">Password</label>
                    <input type="password" id="password" value={password} onChange={(e) =>setPassword(e.target.value)}
                    className="form-control mb-3" required  />
                    <div className='d-flex flex-column justify-content-center align-items-center'>
                      <button type="button" className="btn btn-primary mt-3"
                      style={{width: "200px"}} onClick = {(e) => navigate("/forgot-password")}>Forgot Password??</button>
                      <button type="submit" className="btn btn-primary mt-3 mb-3"
                      style={{width: "200px"}}>Submit</button>
                    </div>
                </form>
            </div>
        </Layout>
  )
}

export default Login