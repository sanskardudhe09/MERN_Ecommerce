import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminPanel from '../../components/Layout/AdminPanel'
import { toast } from 'react-toastify';
import axios from 'axios';
import { useAuth } from '../../context/auth';
const Users = () => {
const [users, setUsers] = useState([]);
const [auth, setAuth] = useAuth();
const getAllusers = async () => {
    try {
        const {data} = await axios.get(`/api/get-allusers`);
        setUsers(data);
    } catch (error) {
        toast.error("Something went wrong!!")
    }
}
useEffect(()=>{
   getAllusers();
}, [auth?.token])
  return (
  <Layout>
    <div className='container-fluid m-3 p-3' style={{height: "600px"}}>
        <div className='row'>
            <div className='col-md-3'>
                <AdminPanel />
            </div>
            <div className='col-md-9'>
                <div className='card w-75 m-5 p-2 border-shadow'>
                    <h2>Users</h2>
                    {users?.map((o, i) => {
                                return (
                                    <div>
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th scope="col">#</th>
                                                    <th scope="col">Name</th>
                                                    <th scope="col">Email</th>
                                                    <th scope="col">Phone</th>
                                                    <th scope="col">Address</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>{1 + i}</td>
                                                    <td>{o.name}</td>
                                                    <td>{o.email}</td>
                                                    <td>{o.phone}</td>
                                                    <td>{o.address}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                   </div> )
                    })}
                </div>
            </div>
        </div>
    </div>
  </Layout>
  )
}

export default Users