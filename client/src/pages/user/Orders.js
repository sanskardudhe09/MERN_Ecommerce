import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import UserPanel from '../../components/Layout/UserPanel'
import { toast } from 'react-toastify';
import axios from 'axios';
import { useAuth } from '../../context/auth';
const moment = require('moment');
const Orders = () => {
    const [auth, setAuth] = useAuth();
    const [orders, setOrders] = useState([]);
    const getOrders = async () => {
        try {
            const { data } = await axios.get(`/api/order`);
            setOrders(data);
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
                        <UserPanel />
                    </div>
                    <div className='col-md-9'>
                        <div className='card w-75 m-3 p-2'>
                            <h2 className='text-center'>Orders</h2>
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
                                                    <td>{o.status}</td>
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

export default Orders