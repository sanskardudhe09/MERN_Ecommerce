import React, { useEffect } from 'react'
import Layout from '../../components/Layout/Layout'
import UserPanel from '../../components/Layout/UserPanel'
import { useAuth } from '../../context/auth'
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import '../../Auth/auth.css';
import axios from 'axios';
const Profile = () => {
    const [auth, setAuth] = useAuth();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    useEffect(()=>{
        const {name, email, password, phone, address} = auth?.user;
        setName(name);
        setEmail(email);
        setPhone(phone);
        setAddress(address);
    }, [auth?.user])
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const {data} = await axios.put(`/api/profile`, {name, email, password
            ,address, phone});
            if(!data?.newuser){
                toast.error("Something went wrong!!");
            }else{
                setAuth({...auth, user: data?.newuser});
                let ls = localStorage.getItem("auth");
                ls = JSON.parse(ls);
                ls.user = data?.newuser;
                localStorage.setItem("auth", JSON.stringify(ls));
                toast.success("User Profile Updated Successfully!!");
            }
        } catch (error) {
            toast.error("Something went wrong!!")
        }
    }
    return (
        <Layout>
            <div className='m-3 p-3'>
                <div className='row'>
                    <div className='col-md-3'>
                        <UserPanel />
                    </div>
                    <div className='col-md-9'>
                            <div className='formcont pt-5'>
                                <form className='profile-authform' onSubmit={handleSubmit}>
                                    <h3 className="title">USER PROFILE</h3>
                                    <label className="form-label">Name</label>
                                    <input type="name" id="name" value={name} onChange={(e) => setName(e.target.value)}
                                        className="form-control mb-3"  />
                                    <label className="form-label">Email address</label>
                                    <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}
                                        className="form-control mb-3"  disabled/>
                                    <label className="form-label">Password</label>
                                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}
                                        className="form-control mb-3"  />
                                    <label className="form-label">Phone</label>
                                    <input type="text" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)}
                                        className="form-control mb-3"  />
                                    <label className="form-label">Address</label>
                                    <input type="text" id="address" value={address} onChange={(e) => setAddress(e.target.value)}
                                        className="form-control mb-3"  />
                                    <button type="submit" className="btn btn-primary">Update User</button>
                                </form>
                            </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

                    export default Profile