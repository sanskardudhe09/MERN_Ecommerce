import React from 'react'
import Layout from '../../components/Layout/Layout'
import UserPanel from '../../components/Layout/UserPanel'
import { useAuth } from '../../context/auth'

const Dashboard = () => {
const [auth, setAuth] = useAuth();
  return (
    <Layout>
        <div className='container-fluid m-3 p-3'>
            <div className='row'>
                <div className='col-md-3'>
                    <UserPanel />
                </div>
                <div className='col-md-9'>
                    <div className='card w-50 m-5 p-2'>
                        <h2 className='text-center'>Admin Details</h2>
                        <div className='d-flex flex-column justify-content-center'>
                          <h3 className='text-center'>Name: {auth?.user?.name}</h3>
                          <h3 className='text-center'>Email: {auth?.user?.email}</h3>
                          <h3 className='text-center'>Contact No: {auth?.user?.phone}</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default Dashboard