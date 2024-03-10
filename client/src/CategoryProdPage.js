import React from 'react'
import Layout from './components/Layout/Layout'
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useParams , useNavigate} from 'react-router-dom';

const CategoryProdPage = () => {
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState([]);
    const params = useParams();
    const navigate = useNavigate();
    const getProductsByCategory = async () => {
        try {
            const { data } = await axios.get(`/api/category-product/${params.slug}`);
            setCategory(data?.category);
            setProducts(data?.products);
        } catch (error) {
            toast.error("Something went wrong!!")
        }
    }
    useEffect(() => {
        if (params?.slug) getProductsByCategory();
    }, [params?.slug])
    return (
        <Layout>
            <div className='container mt-3'>
                <h4 className='text-center'>{category?.name}</h4>
                <h5 className='text-center'>{products?.length} Results Found</h5>
                <div className='row'>
                    <div className='col-md-10'>
                        <div className='d-flex flex-wrap'>
                            {products?.map((p) => (
                                <div className="card m-3" style={{ width: '25rem' }} key={p._id}>
                                    <img src={`/api/product-photo/${p._id}`} className="card-img-top"
                                        style={{ height: "300px" }} alt="product image" />
                                    <div className="card-body">
                                        <h5 className="card-title">{p.name}</h5>
                                        <p className="card-text">{p.desc}</p>
                                        <button className='btn btn-primary ms-2'
                                            onClick={() => navigate(`/product/${p.slug}`)}>View Details</button>
                                        <button className='btn btn-secondary ms-2'>Add to Cart</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CategoryProdPage