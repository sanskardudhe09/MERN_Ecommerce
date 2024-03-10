import React from 'react'
import Layout from '../components/Layout/Layout'
import "../index.css";
const About = () => {
  return (
    <Layout>
        <div className='row aboutpage justify-content-between'>
          <div className='col-md-6 mt-5'>
             <img className="aboutimg"src="/images/about.jpg"  alt="about img"/>
          </div>
          <div className='col-md-4 mt-5'>
            <h4 className='aboutcnt'>
              <span className='cnthead'>We at E-COMMERCE SHOP provide </span>
               Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
               officiis obcaecati esse tempore unde ratione, eveniet mollitia,
               perferendis eius temporibus dicta blanditiis doloremque explicabo
               quasi sunt vero optio cum aperiam vel consectetur! Laborum enim
               accusantium atque, excepturi sapiente amet! Tenetur ducimus aut
            </h4>
          </div>
        </div>
    </Layout>
  )
}

export default About