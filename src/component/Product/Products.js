import React, { Fragment, useEffect, useState } from "react";
import Pagination from "react-js-pagination";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../Home/ProductCard";
import MetaData from "../layout/MetaData";
import FilterSection from "./FilterSection";
import "./Products.css";

const Products = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const { products } = useSelector((state) => state.products);

  const { sorting_value, filters, filter_products } = useSelector(
    (state) => state.filterProduct
  );

  const setCurrentPageNo = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const resultPerPage = 10;
  const indexOfLastProduct = currentPage * resultPerPage;
  const indexOfFirstProduct = indexOfLastProduct - resultPerPage;

  const currentProducts = filter_products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalItemsCount = filter_products.length;
  const pageRangeDisplayed = 5;

  useEffect(() => {
    dispatch({ type: "FILTER_PRODUCTS" });
    dispatch({ type: "SORTING_PRODUCTS" });
  }, [products, sorting_value, filters]);

  useEffect(() => {
    dispatch({ type: "LOAD_FILTER_PRODUCTS", payload: products });
  }, [products]);

  return (
    <Fragment>
      <MetaData title="PRODUCTS -- ECOMMERCE" />
      <h2 className="productsHeading">Products</h2>
      <div className="products">
        {currentProducts &&
          currentProducts.map((product) => <ProductCard product={product} />)}
      </div>

      <div className="filterBox">
        <FilterSection />
      </div>
      <div className="paginationBox">
        <Pagination
          activePage={currentPage}
          onChange={setCurrentPageNo}
          itemsCountPerPage={resultPerPage}
          totalItemsCount={totalItemsCount}
          pageRangeDisplayed={pageRangeDisplayed}
          nextPageText="Next"
          prevPageText="Prev"
          firstPageText="1st"
          lastPageText="Last"
          itemClass="page-item"
          linkClass="page-link"
          activeClass="pageItemActive"
          activeLinkClass="pageLinkActive"
        />
      </div>
    </Fragment>
  );
};

export default Products;
