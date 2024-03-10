import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import { toast } from 'react-toastify';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'
const ProductDetails = () => {
    const [product, setProduct] = useState({});
    const [similarprod, setSimilarProd] = useState([]);
    const params = useParams();
    const navigate = useNavigate();
    const getProduct = async () => {
        try {
            const { data } = await axios.get(`/api/get-product/${params.slug}`);
            setProduct(data?.product);
            getSimilarProd(data?.product._id, data?.product.prodcategory._id);
        } catch (error) {
            toast.error("Something went wrong!!")
        }
    }
    const getSimilarProd = async (pid, cid) => {
        try {
            const { data } = await axios.get(`/api/similar-products/${pid}/${cid}`);
            setSimilarProd(data?.products);
        } catch (error) {
            toast.error("Something went wrong!!")
        }
    }
    useEffect(() => {
        getProduct();
    }, [params?.slug])
    return (
        <Layout>
            <div className='row container mt-4'>
                <div className='col-md-6'>
                    <img src={`/api/product-photo/${product._id}`} className="card-img-top"
                        style={{ height: "450px" }} alt="product image" />
                </div>
                <div className='card col-md-6' style={{ height: "250px", borderColor: "gray" }}>
                    <h2 className='text-center mt-3'>Product Details</h2>
                    <div className='mt-3'>
                        <h5>Name: {product.name}</h5>
                        <h5>Description: {product.desc}</h5>
                        <h5>Category: {product?.prodcategory?.name}</h5>
                        <button className='btn btn-secondary ms-2 mt-3'>Add to Cart</button>
                    </div>
                </div>
                <hr />
                <div className='row container'>
                    <h2 className='text-center'>Similar Products</h2>
                    {similarprod.length == 0 && <h4>No Similar Products Found!!</h4>}
                    <div className='d-flex flex-wrap'>
                        {similarprod?.map((p) => (
                            <div className="card m-3" style={{ width: '25rem' }} key={p._id}>
                                <img src={`/api/product-photo/${p._id}`} className="card-img-top"
                                    style={{ height: "300px" }} alt="product image" />
                                <div className="card-body">
                                    <h5 className="card-title">{p.name}</h5>
                                    <p className="card-text">{p.desc}</p>
                                    <button className='btn btn-primary ms-2'
                    onClick = {()=> navigate(`/product/${p.slug}`)}>View Details</button>
                                    <button className='btn btn-secondary ms-2'>Add to Cart</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default ProductDetails