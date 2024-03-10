import React, { useState } from 'react'
import Layout from '../components/Layout/Layout';
import axios from "axios"
import {ToastContainer ,toast} from "react-toastify";
import {useNavigate} from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import "./auth.css";
const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [answer, setAnswer] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await axios.post("/api/register", {name,email,password,phone,address,answer})
        console.log(res);
        if(res.data.user){
            console.log(res.data.user);
            toast.success("User Registered Successfully!!")
            setTimeout(()=>{
                navigate("/login");
            }, 1000)
        }else{
            toast.error("Some Error Occured!!");
        }
    }
    return (
        <Layout>
            <div className='formcont pt-5'>
                <form className='authform' onSubmit={handleSubmit}>
                    <h3 className="title">REGISTER HERE</h3>
                    <label  className="form-label">Name</label>
                    <input type="name" id="name" value={name} onChange={(e) =>setName(e.target.value)}
                    className="form-control mb-3"  required />
                    <label  className="form-label">Email address</label>
                    <input type="email" id="email" value={email} onChange={(e) =>setEmail(e.target.value)}
                    className="form-control mb-3"  required/>
                    <label  className="form-label">Password</label>
                    <input type="password" id="password" value={password} onChange={(e) =>setPassword(e.target.value)}
                    className="form-control mb-3" required  />
                    <label  className="form-label">Phone</label>
                    <input type="text" id="phone" value={phone} onChange={(e) =>setPhone(e.target.value)}
                    className="form-control mb-3" required  />
                    <label  className="form-label">Address</label>
                    <input type="text" id="address" value={address} onChange={(e) =>setAddress(e.target.value)}
                    className="form-control mb-3" required />
                    <label  className="form-label">Question - What's Your Favourite Sport?</label>
                    <input type="text" id="address" value={answer} onChange={(e) =>setAnswer(e.target.value)}
                    className="form-control mb-3" required />
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
                <ToastContainer />
            </div>
        </Layout>
    )
}

export default Register