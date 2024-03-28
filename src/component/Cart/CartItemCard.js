import React from "react";
import "./CartItemCard.css";
import { Link } from "react-router-dom";

const CartItemCard = ({ item }) => {
  return (
    <div className="CartItemCard">
      <img src={item.image} alt="ssa" />
      <div>
        <Link to={`/products/${item.id}`}>{item.name}</Link>
        <span>{`Price: ₹${item.price}`}</span>
        <span className="color-div">
          color :
          <div
            className="color-style"
            style={{ backgroundColor: item.color, color: item.color }}
          ></div>
        </span>
      </div>
    </div>
  );
};

export default CartItemCard;
