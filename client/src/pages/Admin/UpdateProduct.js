import React, { useState , useEffect} from 'react'
import Layout from '../../components/Layout/Layout'
import AdminPanel from '../../components/Layout/AdminPanel';
import { Select } from 'antd';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'
const { Option } = Select
const UpdateProduct = () => {
    const params = useParams();
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [price, setPrice] = useState('');
    const [prodcategory, setProdCategory] = useState('');
    const [quantity, setQuantity] = useState('');
    const [photo, setPhoto] = useState('');
    const [shipping, setShipping] = useState('');
    const [id, setId] = useState('');
    const navigate = useNavigate();

    const getSingleProd = async () => {
        try {
            const { data } = await axios.get(`/api/get-product/${params.slug}`);
            if (data.product) {
                setName(data.product.name);
                setId(data.product._id);
                setDesc(data.product.desc);
                setPrice(data.product.price);
                setProdCategory(data.product.prodcategory._id);
                setQuantity(data.product.quantity);
                setShipping(data.product.shipping);
            } else {
                toast.error(data.message);
            }
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

    const handleUpdateProd = async (e) => {
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
            const { data } = await axios.put(`/api/update-product/${id}`, prodData);
            console.log(data);
            if (data?.product) {
                toast.success("Product Updated Successfully!!");
                setTimeout(() => {
                    navigate(`/dashboard/admin/products`);
                }, 1000)
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Something went wrong!!");
        }
    }

    const handleDeleteProd = async () => {
        try {
            let ans = window.prompt("Are you sure to delete this product?")
            if(!ans) return;
            const {data} = await axios.delete(`/api/delete-product/${id}`);
            if(data.product){
                navigate(`/dashboard/admin/products`)
                setTimeout(()=>{
                    toast.success("Product Deleted Successfully!!")
                },500)
            }else{
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Something went wrong!!")
        }
    }
    useEffect(() => {
        getSingleProd();
        getAllCategory();
    }, [])
    return (
        <Layout>
            <div className='container-fluid m-3 p-3' style={{ height: "600px" }}>
                <div className='row'>
                    <div className='col-md-3'>
                        <AdminPanel />
                    </div>
                    <div className='col-md-9'>
                        <h3 className='m-1'>Update Product</h3>
                        <div className='w-75 m-3'>
                            <Select
                                bordered={false}
                                size='large'
                                placeholder='Select a category'
                                className='form-select mb-3'
                                onChange={(value) => {
                                    setProdCategory(value)
                                }}
                                value={prodcategory}
                                showSearch>
                                {categories?.map((c) => (
                                    <Option key={c._id} value={c._id}>{c.name}</Option>
                                ))};
                            </Select>
                            <div className='mb-3'>
                                <label className='btn btn-outline-secondary col-md-12 '>
                                    {photo ? photo.name : "Choose Photo"}
                                    <input type="file"
                                        name="photo"
                                        accept='image/*'
                                        onChange={(e) => setPhoto(e.target.files[0])}
                                        hidden
                                    />
                                </label>
                            </div>
                            <div className='mb-3'>
                                {photo ? (
                                    <div className='text-center'>
                                        <img src={URL.createObjectURL(photo)}
                                            alt="product-photo" height={"200px"}
                                            className='img img-responsive' />
                                    </div>
                                ) : (
                                    <div className='text-center'>
                                        <img src={ `/api/product-photo/${id}`}
                                            alt="product-photo" height={"200px"}
                                            className='img img-responsive' />
                                    </div>
                                )}
                            </div>
                            <div className='mb-3'>
                                <input
                                    type="text" value={name}
                                    placeholder='Enter the product name'
                                    className='form-control'
                                    onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className='mb-3'>
                                <textarea
                                    type="text" value={desc}
                                    placeholder='Enter the product description'
                                    className='form-control'
                                    onChange={(e) => setDesc(e.target.value)} />
                            </div>
                            <div className='mb-3'>
                                <input
                                    type="text" value={price}
                                    placeholder='Enter the product price'
                                    className='form-control'
                                    onChange={(e) => setPrice(e.target.value)} />
                            </div>
                            <div className='mb-3'>
                                <input
                                    type="text" value={quantity}
                                    placeholder='Enter the product quantity'
                                    className='form-control'
                                    onChange={(e) => setQuantity(e.target.value)} />
                            </div>
                            <div className='mb-3'>
                                <Select bordered={false} size='large'
                                    placeholder="Select the shipping"
                                    showSearch
                                    className='form-select mb-3'
                                    onChange={(value) => setShipping(value)}
                                    value={shipping?"Yes":"No"}>
                                    <Option value="0">No</Option>
                                    <Option value="1">Yes</Option>
                                </Select>
                            </div>
                            <div className='mb-3'>
                                <button className='btn btn-success'
                                    onClick={handleUpdateProd}>Update Product</button>
                            </div>
                            <div className='mb-3'>
                                <button className='btn btn-danger' onClick={handleDeleteProd}>
                                    Delete Product
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </Layout>
    )
}

export default UpdateProduct