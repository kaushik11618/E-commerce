import { onAuthStateChanged } from "@firebase/auth";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Dashboard from "./component/Admin/Dashboard";
import NewProduct from "./component/Admin/NewProduct";
import ProductList from "./component/Admin/ProductList";
import Cart from "./component/Cart/Cart";
import Home from "./component/Home/Home";
import ProductDetails from "./component/Product/ProductDetails";
import Products from "./component/Product/Products";
import LoginSignUp from "./component/User/LoginSignUp";
import Profile from "./component/User/Profile";
import About from "./component/layout/About/About";
import Contact from "./component/layout/Contact/Contact";
import Footer from "./component/layout/Footer/Footer";
import Header from "./component/layout/Header/Header";
import UserOptions from "./component/layout/Header/UserOptions";
import Loader from "./component/layout/Loader/Loader";
import { auth } from "./fireabse";
import { hydrateUser } from "./redux/actions/authAction";
import { getProducts } from "./redux/actions/productAction";
import NotFound from "./component/layout/Not Found/NotFound";
import Shipping from "./component/Cart/Shipping";
import ConfirmOrder from "./component/Cart/ConfirmOrder";
import Payment from "./component/Cart/Payment";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.userData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(hydrateUser(user));
      }
    });
  }, [dispatch]);
  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route exact path="/login" element={<LoginSignUp />} />
        <Route
          path="/admin/dashboard"
          element={
            isAuthenticated && user?.role === "admin" ? <Dashboard /> : null
          }
        />
        <Route
          path="/admin/product"
          element={
            isAuthenticated && user?.role === "admin" ? <NewProduct /> : null
          }
        />
        <Route
          path="/admin/products"
          element={
            isAuthenticated && user?.role === "admin" ? <ProductList /> : null
          }
        />
        <Route
          path="/account"
          element={isAuthenticated ? <Profile /> : <Loader />}
        />
        <Route
          path="/shipping"
          element={isAuthenticated ? <Shipping /> : <Loader />}
        />
        <Route
          path="/order/confirm"
          element={isAuthenticated ? <ConfirmOrder /> : <Loader />}
        />
        <Route
          path="/process/payment"
          element={isAuthenticated ? <Payment /> : <Loader />}
        />
        <Route
          Component={
            window.location.pathname === "/process/payment" ? null : NotFound
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
