import React, { useEffect, useState } from 'react'
import Layout from '../src/components/Layout/Layout.js'
import { useCart } from './context/cart'
import { useAuth } from './context/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import DropIn from "braintree-web-drop-in-react"
import axios from 'axios';
const CartPage = () => {
    const [cart, setCart] = useCart();
    const [auth, setAuth] = useAuth();
    const [clientToken, setClientToken] = useState("");
    const [instance, setInstance] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const totalPrice = () => {
        try {
            let total = 0;
            cart?.map((item) => (total = total + item.price));
            return total;
        } catch (error) {
            console.log(error);
        }
    }
    const removeCartItem = (id) => {
        try {
            let cartList = [...cart];
            let idx = cartList.findIndex((item) => item._id === id);
            cartList.splice(idx, 1);
            setCart(cartList);
            localStorage.setItem("cart", JSON.stringify(cartList));
        } catch (error) {
            console.log(error);
        }
    }
    const getTokens = async () => {
        try {
            const {data} = await axios.get(`/api/braintree-token`);
            console.log(data);
            setClientToken(data?.clientToken);
            console.log(clientToken)
        } catch (error) {
            toast.error("Something went wrong!!");
        }
    }
    const handlePayment = async () => {
        try {
            setLoading(true);
            const {nonce} = await instance.requestPaymentMethod();
            const {data} = await axios.post(`/api/payment`, {nonce, cart});
            setLoading(false);
            localStorage.removeItem("cart");
            setCart([]);
            toast.success("Order Placed Successfully!!");
            setTimeout(()=>{
                navigate("/dashboard/user/order");
            },1000)
        } catch (error) {
            setLoading(false);
            toast.error("Something went error!!")
        }
    }
    useEffect(()=>{
        getTokens();
    },[auth?.token])
    return (
        <Layout>
            <div>
                <div className='row mb-1'>
                    <div className='col-md-12'>
                        <h2 className='text-center mt-3'>
                            {`Hello ${auth?.token && auth?.user?.name}`}
                        </h2>
                        <h4 className='text-center'>
                            {cart?.length ? `You have ${cart?.length} items in your cart ${auth?.token ? "" : "PLease checkout to Login"}`
                                : "Your Cart is Empty!!"}
                        </h4>
                    </div>
                </div>
                <div className='row mt-3 ms-5'>
                    <div className='col-md-7 card'>
                        {cart?.map((p) => (
                            <div className='row p-3 mb-2'>
                                <div className='col-md-4'>
                                    <img src={`/api/product-photo/${p._id}`} className="card-img-top"
                                        style={{ height: "300px" }} alt="product image" />
                                </div>
                                <div className='col-md-8'>
                                    <h4>{p.name}</h4>
                                    <p>{p.desc}</p>
                                    <h4>Price: Rs {p.price}</h4>
                                    <button className='btn btn-danger'
                                    onClick={()=>removeCartItem(p._id)}>Remove</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='col-md-4 text-center'>
                        <h3>Cart Summary</h3>
                        <h4>Total  |  Checkout  |  Payment</h4>
                        <hr />
                        <h4>Your Total Amount: Rs {totalPrice()}</h4>
                        {auth?.user?.address ? (
                            <>
                              <div className=''>
                                <h4>Your Current Address is:</h4>
                                <h5>{auth?.user?.address}</h5>
                                <button className='btn btn-warning'
                                onClick={()=> navigate("/dashboard/user/profile")}>Update Address</button>
                              </div>
                            </>
                        ) : (         
                              <div className=''>
                                {auth?.token ? (
                                     <button className='btn btn-warning'
                                     onClick={()=> navigate("/dashboard/user/profile")}>Update Address</button>
                                ) : (
                                    <button className='btn btn-warning'
                                    onClick={()=> navigate("/login", {state: "/cart"})}>Please Login to Checkout</button>
                                )}
                              </div>
                        )}
                        <div className='mb-2 mt-2'>
                            {!clientToken || !cart?.length ? "" : (
                                <>
                                  <DropIn options={{authorization:clientToken,
                                    googlePay:{
                                        transactionInfo:{
                                            totalPrice: totalPrice(),
                                            currencyCode: 'INR',
                                            totalPriceStatus: 'FINAL'
                                        }
                                    }
                                  }}
                                  onInstance={(instance) => setInstance(instance)}/>
                                  <button className='btn btn-primary'
                                  onClick={handlePayment}
                                  disabled={!instance || !auth?.user?.address || loading}>
                                    {loading ? "Processing..." : "Make Payment"}
                                  </button>
                                </>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </Layout>
    )
}

export default CartPage