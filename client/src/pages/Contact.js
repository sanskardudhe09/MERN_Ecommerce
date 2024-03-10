import React from 'react'
import Layout from '../components/Layout/Layout'
import { FiMail } from "react-icons/fi";
import { FaPhone } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { BiSupport } from "react-icons/bi";
import "../index.css"
const Contact = () => {
  return (
    <Layout>
      <div className='contactpage'>
          <div className=''>
             <img className="contactimg img-fluid" src="/images/con.jpg"  alt="contact img"/>
          </div>
          <div className='contactform mt-5'>
            <h4 className=' text-center mt-5' style={{
              letterSpacing: "2px", fontWeight: 'bold'
            }}>With 24x7 support for customers regarding queries and products..</h4>
            <h4 className='text-center mt-3'>Our Details</h4>
            <p className='text-center mt-3'>
              <FiMail /> :  www.help@ecommerceapp.com
            </p>
            <p className='text-center mt-3'>
              <FaPhone /> :  012-345678
            </p>
            <p className='text-center mt-3'>
              <FaInstagram /> :  @ecommerceapp
            </p>
            <p className='text-center mt-3'>
              <BiSupport />:  1800-0000-0000 (toll free)
            </p>
          </div>
        </div>
    </Layout>
  )
}

export default Contact