import React from 'react'
import Layout from '../components/Layout/Layout'
import useCategory from '../hooks/useCategory';
import { Link } from 'react-router-dom';
import '../index.css';
const Categories = () => {
  const categories = useCategory();
  return (
    <Layout>
        <h3 className='text-center mt-4'>All Categories</h3>
        <div className='container'>
            <div className='row'>
               {categories?.map((c) => (
                 <div className='col-md-6 mt-4' key={c._id}>
                    <div className='card category-card p-5'>
                    <Link className='btn fs-5 text-capitalize'to = {`/category/${c.slug}`}>{c.name}</Link>
                    </div>
                 </div>
               ))}
            </div>
        </div>
    </Layout>
  )
}

export default Categories