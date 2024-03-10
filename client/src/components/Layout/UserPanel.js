
import React from 'react'
import { NavLink } from 'react-router-dom'
const UserPanel = () => {
  return (
    <div className="list-group">
            <h2 className='mb-3'>User Dashboard</h2>
            <NavLink className="list-group-item list-group-item-action text-center" style={{height:"60px", padding:"20px"}}
            to="/dashboard/user/profile"><h4>Profile</h4></NavLink>
             <NavLink className="list-group-item list-group-item-action text-center"style={{height:"60px" ,padding:"20px"}}
             to="/dashboard/user/order"><h4>Order</h4></NavLink>
        </div>
  )
}

export default UserPanel