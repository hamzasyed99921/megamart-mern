import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.scss'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import Home from './Pages/Home';
import Orders from './Pages/Orders';
import ShowOrders from './Pages/ShowOrders';
import Base from './Layouts/Base';
import Aos from 'aos';
import "aos/dist/aos.css";
import Account from './Pages/Account';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import ProductDetail from './Pages/ProductDetail';
import Cart from './Pages/Cart';
import Admin from './Pages/Admin';
import Contact from './Pages/Contact';
import ProductList from './Pages/ProductList';
import UpdateProduct from './Pages/UpdateProduct';
import Category from './Pages/Category';
import About from './Pages/About';
import Checkout from './Pages/Checkout';
import { useSelector } from 'react-redux';

function App() {
  useEffect(() => {
    Aos.init({
      duration : 2000
    });
    Aos.refresh();
  }, []);

  const isAuth = useSelector((state) => state.user.auth);

  console.log(isAuth)

  return (
    <>
      <div className="App">
       <BrowserRouter>
      <Base>
        <Routes>
          <Route index path="/" element={<Home/>} />
          <Route path="/account" element={<Account/>} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/product/:title" element={<ProductDetail/>} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/admin" element={<Admin/>} />
          <Route path="/product/list" element={<ProductList/>} />
          <Route path="/edit-product/:id" element={<UpdateProduct/>} />
          <Route path="/category" element={<Category/>} />
          <Route path="/orders" element={<Orders/>} />
          <Route path="/my-orders" element={<ShowOrders/>} />
          <Route path="/checkout" element={<Checkout/>} />
          {/* <Route path="/*" element={<PageNotFound />}/> */}
        </Routes>
      </Base>
    </BrowserRouter>
    </div>
    </>
  )
}

export default App
