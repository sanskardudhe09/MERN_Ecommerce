import React from 'react'
import Layout from '../components/Layout/Layout'
import { useNavigate} from 'react-router-dom';

const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <Layout>
      <div className='pagenotfound'>
        <p className='text-center heading'>404</p>
        <h1 className='text-center mt-3'>Oops!! Page Not Found</h1>
        <button className='notfoundbtn mt-5'onClick = { ()=> navigate("/")}>Go Back</button>
      </div>
    </Layout>
  )
}

export default PageNotFound