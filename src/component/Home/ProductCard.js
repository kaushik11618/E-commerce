import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <>
      <Link className="productCard" to={`/products/${product.id}`}>
        <img src={product.images[0]} alt={product.name} style={{height:"180px"}} />
        <p>{product.name}</p>
        <span>{`₹${product.price}`}</span>
      </Link>
    </>
  );
};

export default ProductCard;
