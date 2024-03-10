import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminPanel from '../../components/Layout/AdminPanel'
import { toast, ToastContainer } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'

const Products = () => {
    const [products, setProducts] = useState([]);
    const getAllProducts = async () => {
        try {
            const { data } = await axios.get("/api/getall-products");
            if (data?.products) {
                setProducts(data?.products);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Something went wrong!!")
        }
    }
    useEffect(() => {
        getAllProducts();
    }, [])
    return (
        <Layout>
            <div className='container-fluid m-3 p-3'>
                <div className='row'>
                    <div className='col-md-3'>
                        <AdminPanel />
                    </div>
                    <div className='col-md-9'>
                        <h2 className='text-center'>All Products</h2>
                        <div className='d-flex flex-wrap'>
                         {products.map((p) => (
                            <Link key={p._id} to= {`/dashboard/admin/product/${p.slug}`} style={{textDecoration:"none"}}>
                            <div className="card m-3" style={{ width: '25rem' }}>
                                <img src={ `/api/product-photo/${p._id}`} className="card-img-top" 
                                style={{height: "300px"}}alt="product image" />
                                <div className="card-body">
                                    <h5 className="card-title">{p.name}</h5>
                                    <p className="card-text">{p.desc}</p>
                                </div>
                            </div>
                            </Link>
                          ))}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Products