import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import { Typography } from "@mui/material";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { Fragment, useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  removeItem,
  setDecrease,
  setIncrease,
} from "../../redux/actions/cartAction.js";
import "./Cart.css";
import CartItemCard from "./CartItemCard";
import MetaData from "../layout/MetaData.js";

const Cart = () => {
  const { cartItem, total_price } = useSelector((state) => state.cartData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const checkoutHandler = () => {
    navigate("/shipping");
  };

  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    if (!stripe) return;
  }, [stripe]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setLoading(true);
    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.error(error.message);
      setLoading(false);
    } else {
      console.log("Payment method:", paymentMethod);
      setLoading(false);
    }
  };

  useEffect(() => {
    dispatch({ type: "CART_ITEM_PRICE_TOTAL" });
    localStorage.setItem("cart", JSON.stringify(cartItem));
  }, [cartItem]);

  return (
    <Fragment>
      <MetaData title="Cart"/>
      {cartItem.length === 0 ? (
        <div className="emptyCart">
          <RemoveShoppingCartIcon />
          <Typography>No Product in Your Cart</Typography>
          <Link to="/products">View Products</Link>
        </div>
      ) : (
        <Fragment>
          <div className="cartPage">
            <div className="cartHeader">
              <p>Product</p>
              <p>Quantity</p>
              <p>Subtotal</p>
              <p>Remove</p>
            </div>
            {cartItem &&
              cartItem.map((item) => (
                <div className="cartContainer" key={item.product}>
                  <CartItemCard item={item} />
                  <div className="cartInput">
                    <button onClick={() => dispatch(setDecrease(item.id))}>
                      -
                    </button>
                    <div>{item.quantity}</div>
                    <button onClick={() => dispatch(setIncrease(item.id))}>
                      +
                    </button>
                  </div>
                  <div className="cartSubtotal">{`₹${
                    item.price * item.quantity
                  }`}</div>
                  <div className="cartSubtotal">
                    <FaTrash onClick={() => dispatch(removeItem(item.id))} />
                  </div>
                </div>
              ))}

            <div className="cartGrossProfit">
              <div></div>
              <div className="cartGrossProfitBox">
                <p>Gross Total</p>
                <p>{`${total_price}`}</p>
              </div>
              <div></div>
              <div className="checkOutBtn">
                <button onClick={checkoutHandler}>Check Out</button>
              </div>
            </div>
          </div>

          {/* <form onSubmit={handleSubmit}>
            <CardElement />
            <button type="submit" disabled={!stripe}>
              {loading ? "Processing..." : "Pay"}
            </button>
          </form> */}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Cart;
