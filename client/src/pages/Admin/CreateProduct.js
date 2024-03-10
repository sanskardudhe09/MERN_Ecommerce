import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminPanel from '../../components/Layout/AdminPanel';
import {Select} from 'antd';
import {toast, ToastContainer} from 'react-toastify';
import {useNavigate} from 'react-router-dom';
import axios from 'axios'
const {Option} = Select
const CreateProduct = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [price, setPrice] = useState('');
  const [prodcategory, setProdCategory] = useState('');
  const [quantity, setQuantity] = useState('');
  const [photo, setPhoto] = useState('');
  const [shipping, setShipping] = useState('');
  const navigate = useNavigate();
  const getAllCategory = async (req,res) => {
    const {data} = await axios.get("/api/getall-category");
    if(data.category){
        setCategories(data.category);
    }else{
        toast.error("Something went wrong!!");
    }
  }
  
  const handleCreateProd = async (e) => {
    e.preventDefault();
    try {
        const prodData = new FormData();
        prodData.append("name", name);
        prodData.append("desc", desc);
        prodData.append("price", price);
        prodData.append("prodcategory", prodcategory);
        prodData.append("quantity", quantity);
        prodData.append("photo", photo);
        prodData.append("shipping", shipping);
        const {data} = await axios.post("/api/create-product", prodData);
        console.log(data);
        if(data?.product){
            toast.success("Product Created Successfully!!");
            setTimeout(()=>{
                setName('');
                setDesc('');
                setPhoto('');
                setPrice('');
                setProdCategory('');
                setQuantity('')
                setShipping('')
                navigate("/dashboard/admin/products");
            },1000)
        }else{
            toast.error(data.message);
        }
    } catch (error) {
        toast.error("Something went wrong!!");
    }
  }
  useEffect(()=>{
    getAllCategory();
  },[])
  return (
    <Layout>
        <div className='container-fluid m-3 p-3' style={{height: "600px"}}>
            <div className='row'>
                <div className='col-md-3'>
                    <AdminPanel />
                </div>
                <div className='col-md-9'>
                    <h3 className='m-1'>Create Product</h3>
                    <div className='w-75 m-3'>
                        <Select
                        bordered={false}
                        size='large'
                        placeholder='Select a category'
                        className='form-select mb-3'
                        onChange={(value) => {
                            setProdCategory(value)
                        }}
                        showSearch>
                        {categories?.map((c)=>(
                            <Option key={c._id} value={c._id}>{c.name}</Option>
                        ))};
                        </Select>
                        <div className='mb-3'>
                            <label className='btn btn-outline-secondary col-md-12 '>
                                {photo ? photo.name: "Choose Photo"}
                                <input type="file"
                                name="photo"
                                accept='image/*'
                                onChange={(e) => setPhoto(e.target.files[0])}
                                hidden
                                />
                            </label>
                        </div>
                        <div className='mb-3'>
                           {photo && (
                            <div className='text-center'>
                                <img src={URL.createObjectURL(photo)}
                                alt="product-photo" height={"200px"}
                                className='img img-responsive'/>
                            </div>
                           )}
                        </div>
                        <div className='mb-3'>
                            <input 
                            type="text" value={name}
                            placeholder='Enter the product name'
                            className='form-control'
                            onChange={(e) => setName(e.target.value)}/>
                        </div>
                        <div className='mb-3'>
                            <textarea 
                            type="text" value={desc}
                            placeholder='Enter the product description'
                            className='form-control'
                            onChange={(e) => setDesc(e.target.value)}/>
                        </div>
                        <div className='mb-3'>
                            <input 
                            type="text" value={price}
                            placeholder='Enter the product price'
                            className='form-control'
                            onChange={(e) => setPrice(e.target.value)}/>
                        </div>
                        <div className='mb-3'>
                            <input 
                            type="text" value={quantity}
                            placeholder='Enter the product quantity'
                            className='form-control'
                            onChange={(e) => setQuantity(e.target.value)}/>
                        </div>
                        <div className='mb-3'>
                            <Select bordered={false} size='large'
                            placeholder="Select the shipping" 
                            showSearch
                            className='form-select mb-3'
                            onChange={(value) => setShipping(value)}>
                               <Option value="0">No</Option>
                               <Option value="1">Yes</Option>
                            </Select>
                        </div>
                        <div className='mb-3'>
                            <button className='btn btn-success'
                            onClick={handleCreateProd}>Create Product</button>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    </Layout>
  )
}

export default CreateProduct