import React, {useState, useEffect} from 'react'
import Layout from '../../components/Layout/Layout'
import AdminPanel from '../../components/Layout/AdminPanel.js'
import { toast } from 'react-toastify';
import axios from 'axios';
import { useAuth } from '../../context/auth';
import { Select } from 'antd';
const moment = require('moment');
const {Option} = Select;
const AdminOrder = () => {
    const [auth, setAuth] = useAuth();
    const [orders, setOrders] = useState([]);
    const [status, setStatus] = useState(["Not Processed", "Processing", "Shipped", "Delivered", "Cancelled"])
    const [changeStatus, setChangeStatus] = useState("");
    const getOrders = async () => {
        try {
            const { data } = await axios.get(`/api/allorder`);
            setOrders(data);
        } catch (error) {
            toast.error("Something went wrong!!");
        }
    }
    const updateStatus = async (id, val) => {
        try {
            const {data} =  await axios.put(`/api/update-status/${id}`, {status: val});
            getOrders();
        } catch (error) {
            toast.error("Something went wrong!!");
        }
    }
    useEffect(() => {
        if (auth?.token) getOrders();
    }, [auth?.token])
  return (
    <Layout>
         <div className='container-fluid m-3 p-3'>
            <div className='row'>
                <div className='col-md-3'>
                    <AdminPanel />
                </div>
                <div className='col-md-9'>
                    <div className='card w-75 m-3 p-2'>
                       <h2 className='text-center'>All Orders</h2>
                       {orders?.map((o, i) => {
                                return (
                                    <div>
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th scope="col">#</th>
                                                    <th scope="col">Status</th>
                                                    <th scope="col">Buyer</th>
                                                    <th scope="col">Date</th>
                                                    <th scope="col">Payment</th>
                                                    <th scope="col">Quantity</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>{1 + i}</td>
                                                    <td>
                                                        <Select bordered={false}
                                                        onChange={(value) => updateStatus(o._id, value)}
                                                        defaultValue={o?.status}>
                                                            {status.map((s,i)=> (
                                                                <Option key={i} value={s}>{s}</Option>
                                                            ))}
                                                        </Select>
                                                    </td>
                                                    <td>{o.buyer.name}</td>
                                                    <td>{moment(o.createdAt).fromNow()}</td>
                                                    <td>{o.payment.success ? "Success" : "Failed"}</td>
                                                    <td>{o?.products.length}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <div>
                                            { o?.products?.map((p) => (
                                                <div className='row p-3 mb-2'>
                                                    <div className='col-md-4'>
                                                        <img src={`/api/product-photo/${p._id}`} className="card-img-top"
                                                            style={{ height: "300px" }} alt="product image" />
                                                    </div>
                                                    <div className='col-md-8'>
                                                        <h4>{p.name}</h4>
                                                        <p>{p.desc}</p>
                                                        <h4>Price: Rs {p.price}</h4>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )
                            })}
                    </div>
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default AdminOrder