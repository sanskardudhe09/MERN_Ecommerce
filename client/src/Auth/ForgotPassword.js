import React from 'react'
import Layout from '../components/Layout/Layout'
import axios from "axios"
import {ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./auth.css";
import { useState } from 'react';
import {useNavigate} from 'react-router-dom';
const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [newpassword, setNewPassword] = useState('');
    const [answer, setAnswer] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
      e.preventDefault();
      try{
        const res = await axios.post("/api/forgot-password", {email,newpassword, answer});
        if(res && res.data.user){
            toast.success("User Password Updated Successfully!!");
            setTimeout(()=>{
              navigate("/login");
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
                <form className='resetform' onSubmit={handleSubmit}>
                    <h3 className="title">RESET PASSWORD HERE</h3>
                    <label  className="form-label">Email address</label>
                    <input type="email" id="email" value={email} onChange={(e) =>setEmail(e.target.value)}
                    className="form-control mb-3"  required/>
                    <label  className="form-label">Question - What's Your Favourite Sport?</label>
                    <input type="text" id="answer" value={answer} onChange={(e) =>setAnswer(e.target.value)}
                    className="form-control mb-3"  required/>
                    <label  className="form-label"> New Password</label>
                    <input type="password" id="password" value={newpassword} onChange={(e) =>setNewPassword(e.target.value)}
                    className="form-control mb-3" required  />
                    <button type="submit" className="btn btn-primary mt-3 mb-3"
                      style={{width: "200px"}}>Reset Password</button>
                </form>
            </div>
            <ToastContainer />
        </Layout>
  )
}

export default ForgotPassword