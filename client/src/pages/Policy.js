import React from 'react'
import Layout from '../components/Layout/Layout'
import "../index.css";
const Policy = () => {
  return (
    <Layout>
      <div className='policypage row'>
            <img className="policyimg img-fluid col-md-6 mt-3"src="/images/policy.jpg"  alt="about img"/>
            <div className='col-md-3 listcontainer'>
              <ol>
                <h4 className='mt-3'>Our Foremost Policy</h4>
                <li className='listitem mt-3'> We do not collect personal information for any purpose other than to respond to you.</li>
                <li className='listitem mt-3'>We’re committed to keeping your data secure, your private information private, 
                  and being transparent about our practices as a business.</li>
                <li className='listitem mt-3'>When you visit the Site, we automatically collect certain information about your device, including information about your web browser, 
                IP address, time zone, and some of the cookies that are installed on your device.</li>
                <li className='listitem mt-3'>We use the Order Information that we collect generally to fulfil any orders placed through the Site (including processing your payment
                 information, arranging for shipping, and providing you with invoices and/or order confirmations).</li>
              </ol>
              <img className='policyicon'src = "/images/policyicon.png" alt="Policy img"/>
            </div>
        </div>
    </Layout>
  )
}

export default Policy