import React from 'react';
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaBagShopping } from "react-icons/fa6";
import { useAuth } from '../../context/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SearchFom from '../Form/SearchFom';
import useCategory from '../../hooks/useCategory';
import { useCart } from '../../context/cart';
import Badge from '@mui/material/Badge';
const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const categories = useCategory();
  const navigate = useNavigate();
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: ""
    });
    localStorage.removeItem('auth');
    toast.success("User Logged Out Successfully!!");
    setTimeout(() => {
      navigate("/login")
    }, 700);
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <NavLink to="/" className="navbar-brand ml-5"> <FaBagShopping /> E-COMMERCE APP</NavLink>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <SearchFom />
              <li className="nav-item">
                <NavLink to="/" className="nav-link active">Home</NavLink>
              </li>
              <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle" to="/category" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Categories
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="/category">All Categories</Link>
                  </li>
                  {categories.map((c) => (
                    <li>
                      <Link className="dropdown-item" to={`/category/${c.slug}`}>{c.name}</Link>
                    </li>
                  ))}
                </ul>
              </li>
              {
                !auth.user ? (
                  <>
                    <li className="nav-item">
                      <NavLink to="/register" className="nav-link">Sign Up</NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink to="/login" className="nav-link">Login</NavLink>
                    </li>
                  </>

                ) : (
                  <>
                    <li className="nav-item dropdown">
                      <NavLink className="nav-link dropdown-toggle" to="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        {auth?.user?.name}
                      </NavLink>
                      <ul className="dropdown-menu">
                        <li className='mb-3'>
                          <NavLink className="dropdown-item" to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}>
                            Dashboard</NavLink>
                        </li>
                        <li>
                          <button className='dropdown-item' onClick={handleLogout}>Logout</button>
                        </li>
                      </ul>
                    </li>

                  </>
                )
              }
              <li className="nav-item">
                <Badge badgeContent={cart?.length} color="primary">
                  <NavLink to="/cart" className="nav-link" size="large">Cart</NavLink>
                </Badge>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <ToastContainer />
    </>
  )
}

export default Header