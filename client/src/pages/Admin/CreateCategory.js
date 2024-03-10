import React, { useState, useEffect } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminPanel from '../../components/Layout/AdminPanel';
import CategoryForm from '../../components/Form/CategoryForm';
import {toast, ToastContainer} from 'react-toastify';
import {Modal} from 'antd';
import axios from 'axios'
const CreateCategory = () => {
    const [categories, setCategories] = useState([]);
    const [name,setName] = useState('');
    const [selected, setSelected] = useState(null);
    const [visible, setVisible] = useState(false);
    const [updatedname, setUpdatedName] = useState('');
    const getAllCategory = async (req,res) => {
        const {data} = await axios.get("/api/getall-category");
        if(data.category){
            setCategories(data.category);
        }else{
            toast.error("Something went wrong!!");
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const {data} = await axios.post("/api/create-category", {name});
            if(data?.category){
                toast.success(`${data.category.name} is added`);
                setName('');
                getAllCategory();
            }else{
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Something went wrong!!");
        }
    }

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const {data} = await axios.put(`/api/update-category/${selected._id}`, {name:updatedname})
            if(data.category){
                toast.success(`${selected.name} is updated to ${updatedname}`);
                setSelected(null);
                setVisible(false);
                setUpdatedName('');
                getAllCategory();
            }else{
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Something went wrong!!");
        }
    }

    const handleDelete = async (id) => {
        try {
            const {data} = await axios.delete(`/api/delete-category/${id}`);
            if(data.message == "Category deleted successfully!!"){
                toast.success(data.message);
                getAllCategory();
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error("Something went wrong!!")
        }
    }
    useEffect(()=>{
        getAllCategory();
    }, [])
    return (
        <Layout>
            <div className='container-fluid m-3 p-3'>
                <div className='row'>
                    <div className='col-md-3'>
                        <AdminPanel />
                    </div>
                    <div className='col-md-9'>
                        <h2 className='mt-3'>Manage Category</h2>
                        <CategoryForm value={name} setValue={setName} handleSubmit={handleSubmit}/>
                        <div className='w-75 m-3 p-2'>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                 {categories?.map((c)=> (
                                        <>
                                            <tr>
                                                <td key={c._id}> {c.name}</td>
                                                <td>
                                                    <button className='btn btn-primary ms-2'
                                                    onClick={ ()=> {
                                                        setVisible(true);
                                                        setSelected(c);
                                                        setUpdatedName(c.name)
                                                    }}>Edit</button>
                                                    <button className='btn btn-danger ms-2'
                                                    onClick={() => handleDelete(c._id)}>Delete</button>
                                                </td>
                                            </tr>
                                        </>
                                     ))
                                }
                                </tbody>
                            </table>

                        </div>
                        <Modal onCancel={() => setVisible(false)} footer={null}
                        visible={visible}>
                            <CategoryForm value={updatedname} setValue={setUpdatedName} handleSubmit={handleUpdate}/>
                        </Modal>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </Layout>
    )
}

export default CreateCategory