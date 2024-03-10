
import './App.css';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Contact from './pages/Contact';
import About from './pages/About';
import Policy from './pages/Policy';
import PageNotFound from './pages/PageNotFound';
import Register from './Auth/Register';
import Login from './Auth/Login';
import Dashboard from './pages/user/Dashboard';
import PrivateRoute from './Routes/PrivateRoute';
import ForgotPassword from './Auth/ForgotPassword';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminRoute from './Routes/AdminRoute';
import CreateCategory from './pages/Admin/CreateCategory';
import CreateProduct from './pages/Admin/CreateProduct';
import Users from './pages/Admin/Users';
import Profile from './pages/user/Profile';
import Orders from './pages/user/Orders';
import Products from './pages/Admin/Products';
import UpdateProduct from './pages/Admin/UpdateProduct';
import Search from './pages/Search';
import ProductDetails from './pages/ProductDetails';
import Categories from './pages/Categories';
import CategoryProdPage from './CategoryProdPage';
import CartPage from './CartPage';
import AdminOrder from './pages/Admin/AdminOrder';
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element= {<HomePage />} />
        <Route path="/contact" element= {<Contact />} />
        <Route path="/search" element = {<Search />} />
        <Route path="/cart" element = {<CartPage />} />
        <Route path="/category" element = {<Categories />}/>
        <Route path="/category/:slug" element = {<CategoryProdPage />} />
        <Route path="/product/:slug" element = {<ProductDetails />} />
        <Route path="/dashboard" element = {<PrivateRoute />}>
          <Route path="user" element= {<Dashboard />} />
          <Route path="user/profile" element= {<Profile />}/>
          <Route path="user/order" element={<Orders />}/>
        </Route> 
        <Route path="/dashboard" element = {<AdminRoute />} >
          <Route path="admin" element={<AdminDashboard />}/>
          <Route path="admin/create-category" element={<CreateCategory />}/>
          <Route path="admin/create-product" element={<CreateProduct />}/>
          <Route path="admin/products" element={<Products />}/>
          <Route path="admin/product/:slug" element={<UpdateProduct />} />
          <Route path="admin/users" element={<Users />}/>
          <Route path="admin/order" element={<AdminOrder />}/>
        </Route>
        <Route path="/about" element= {<About />} />
        <Route path="/policy" element= {<Policy />} />
        <Route path="/register" element= {<Register />} />
        <Route path="/login" element= {<Login />} />
        <Route path="/forgot-password" element= {<ForgotPassword />}/>
        <Route path="*" element= {<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
