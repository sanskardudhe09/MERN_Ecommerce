import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout';
import axios from 'axios';
import {Checkbox, Radio} from 'antd';
import { toast, ToastContainer } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { Prices } from '../components/Prices';
import "../index.css";
import { useCart } from '../context/cart';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked , setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] =  useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [cart, setCart] =  useCart();
  const getAllProducts = async () => {
    try {
        setLoading(true);
        const { data } = await axios.get(`/api/product-list/${page}`);
        setLoading(false);
        if (data?.products) {
            setProducts(data.products);
            //console.log(products)
        } else {
            toast.error(data.message);
        }
    } catch (error) {
        setLoading(false);
        toast.error("Something went wrong!!")
    }
 }
 
 const getProdCount = async () => {
  try {
      const {data} = await axios.get("/api/product-count");
      setTotal(data?.count);
  } catch (error) {
    toast.error("Something went wrong!!")
  }
 }
 const getAllCategory = async (req, res) => {
  const { data } = await axios.get("/api/getall-category");
  if (data.category) {
      setCategories(data.category);
  } else {
      toast.error("Something went wrong!!");
  }
 }
 
 const filterProducts = async (req,res) => {
  try {
      const {data} = await axios.post("/api/product-filters", {checked, radio});
      if(data?.product){
        setProducts(data?.product);
      }else{
        toast.error(data?.message);
      }
  } catch (error) {
    toast.error("Something went wrong!!")
  }
 }
 const handleCheck = (value, id) => {
  let checkarr = [...checked];
  if(value){
    checkarr.push(id);
  }else{
    checkarr = checkarr.filter((c) => c !== id);
  }
  setChecked(checkarr);
 }

 const loadMore = async () => {
  try {
    setLoading(true);
    const {data} = await axios.get(`/api/product-list/${page}`);
    setLoading(false)
    if(data?.products){
      setProducts([...products, ...data.products]);
      console.log(products);
    }else{
      toast.error(data?.message);
    }
  } catch (error) {
    setLoading(false);
    toast.error("Something went wrong!!")
  }

 }
  useEffect(()=>{
    getAllCategory();
    getProdCount();
  },[])
  useEffect(()=>{
    if(!checked.length || !radio.length) getAllProducts();
  },[checked.length, radio.length])
  useEffect(()=>{
    if(checked.length || radio.length) filterProducts();
  },[checked, radio]);
  useEffect(()=>{
    if(page === 1) return;
    loadMore();
  }, [page])
  return (
    <Layout>
      <div className='container-fluid row mt-5 pe-5'>
        <div className='col-md-2'>
        <h3 className='text-center'>Filter By Category</h3>
         <div className='card m-3 p-3 filterback'>
          <div className='d-flex flex-column m-3'>
            {categories?.map((c)=>(
              <Checkbox key={c._id} onChange={(e) => handleCheck(e.target.checked, c._id)}>
                {c.name}
              </Checkbox>
             ))}
          </div>
          </div>
          {/* Filter by Price */}
          <h3 className='text-center mt-3'>Filter By Price</h3>
          <div className='card m-3 p-3 filterback'>
            <div className='d-flex flex-column m-3'>
             <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices.map((p) => (
                 <div key={p._id}>
                   <Radio value={p.array}>{p.name}</Radio>
                 </div>
              ))}
             </Radio.Group>
            </div>
          </div>
          <div className='flex-d flex-column mt-5'>
            <button className='btn btn-danger'
            onClick={(e) => window.location.reload()}>RESET FILTERS</button>
          </div>
        </div>
        <div className='col-md-10'>
          <h2 className='text-center'>All Products</h2>
          <div className='d-flex flex-wrap'>
            {products?.map((p) => (
                <div className="card m-3" style={{ width: '28rem', borderColor: "lightblue"}} key={p._id}>
                  <img src={`/api/product-photo/${p._id}`} className="card-img-top"
                    style={{ height: "300px" }} alt="product image" />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">{p.desc}</p>
                    <button className='btn btn-primary ms-2'
                    onClick = {()=> navigate(`/product/${p.slug}`)}>View Details</button>
                    <button className='btn btn-secondary ms-2'
                    onClick={()=> {
                    setCart([...cart, p]);
                    localStorage.setItem("cart", JSON.stringify([...cart,p]));
                    toast.success("Item Added to Cart Successfully!!")}}>Add to Cart</button>
                  </div>
                </div>
            ))}
          </div>
        </div>
        <div className='m-3 p-3'>
          {products && products.length < total && (
            <button className='btn btn-warning' onClick = {(e) => {
              e.preventDefault();
              setPage(page+1);} }>
              {loading ? "Loading ..." : "Load More"}
            </button>
          )}
        </div>
      </div>

    </Layout>
  )
}

export default HomePage