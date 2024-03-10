import axios from 'axios';
import React from 'react'
import { useState , useEffect} from 'react';
import { useAuth } from '../context/auth';
import { Outlet } from 'react-router-dom';
import Spinner from '../Spinner';

const AdminRoute = () => {
  const [ok, setOK] = useState(false);
  const [auth, setAuth] = useAuth();
  useEffect(()=> {
    const userCheck = async () => {
        const res = await axios.get("/api/admin-auth", {
        })
        if(res.data.ok) setOK(true);
        else setOK(false); 
    }
    if(auth?.token) userCheck();
  }, [auth?.token])
  return (
     ok ? <Outlet /> : <Spinner path="/"/>
  )
}
export default AdminRoute;