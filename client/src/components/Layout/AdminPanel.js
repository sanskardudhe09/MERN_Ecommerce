import React from 'react'
import { NavLink } from 'react-router-dom'

const AdminPanel = () => {
    return (
        <div className="list-group">
            <h2 className='mb-3'>Admin Panel</h2>
            <NavLink className="list-group-item list-group-item-action text-center" style={{height:"80px", padding:"20px"}}
            to="/dashboard/admin/create-category"><h5>Create Category</h5></NavLink>
             <NavLink className="list-group-item list-group-item-action text-center"style={{height:"80px" ,padding:"20px"}}
             to="/dashboard/admin/create-product"><h5>Create Products</h5></NavLink>
             <NavLink className="list-group-item list-group-item-action text-center"style={{height:"80px" ,padding:"20px"}}
             to="/dashboard/admin/products"><h5>List Products</h5></NavLink>
            <NavLink className="list-group-item list-group-item-action text-center" style={{height:"80px",padding:"20px"}}
             to="/dashboard/admin/users"><h5>Users</h5></NavLink>
            <NavLink className="list-group-item list-group-item-action text-center" style={{height:"80px",padding:"20px"}}
             to="/dashboard/admin/order"><h5>Orders</h5></NavLink>
        </div>
    )
}

export default AdminPanel