import React, { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { addToCart } from "../../redux/actions/cartAction";
import "./ProductDetails.css";
const AddToCart = ({ product }) => {
  const dispatch = useDispatch();
  const { id, stock } = product;
  const [quantity, setQunatity] = useState(1);
  const setDecrease = () => {
    quantity > 1 ? setQunatity(quantity - 1) : setQunatity(1);
  };
  const setIncrease = () => {
    quantity < stock ? setQunatity(quantity + 1) : setQunatity(stock);
  };

  const handleAddToCart = () => {
    dispatch(addToCart(id, quantity, product));
  };
  return (
    <Wrapper>
      <div className="cart-button">
        <div className="amount-toggle">
          <button onClick={() => setDecrease()}>
            <FaMinus />
          </button>
          <div className="amount-style">{quantity}</div>
          <button onClick={() => setIncrease()}>
            <FaPlus />
          </button>
        </div>
      </div>
      <NavLink to="/cart">
        <button className="submitReview" onClick={handleAddToCart}>
          Add To cart
        </button>
      </NavLink>
    </Wrapper>
  );
};
const Wrapper = styled.section`
  .colors p {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .btnStyle {
    width: 2rem;
    height: 2rem;
    background-color: #000;
    border-radius: 50%;
    margin-left: 1rem;
    border: none;
    outline: none;
    opacity: 0.5;
    cursor: pointer;

    &:hover {
      opacity: 1;
    }
  }

  .active {
    opacity: 1;
  }

  .checkStyle {
    font-size: 1rem;
    color: #fff;
  }

  /* we can use it as a global one too  */
  .amount-toggle {
    margin-top: 3rem;
    margin-bottom: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 1.4rem;

    button {
      border: none;
      background-color: #fff;
      cursor: pointer;
    }

    .amount-style {
      font-size: 2.4rem;
      color: black;
    }
  }
`;
export default AddToCart;
