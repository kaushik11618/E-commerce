import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Rating,
} from "@mui/material";
import { addDoc, collection, doc } from "firebase/firestore";
import React, { Fragment, useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { db } from "../../fireabse";
import {
  getProductReviews,
  getSingleProduct,
} from "../../redux/actions/productAction";
import MetaData from "../layout/MetaData";
import AddToCart from "./AddToCart";
import "./ProductDetails.css";
import ReviewCard from "./ReviewCard";

const ProductDetails = () => {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [userReviewed, setUserReviewed] = useState(false);
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.userData);
  const { singleProduct, reviews } = useSelector((state) => state.products);
  const { id } = useParams();
  const { name, price, description, stock, images } = singleProduct;

  const submitReviewToggle = () => {
    if (!userReviewed) setOpen(!open);
  };

  const reviewSubmitHandler = async () => {
    try {
      const reviewData = {
        rating,
        comment,
        userId: user.uid,
        userName: user.displayName,
        timestamp: new Date(),
      };

      const productRef = doc(db, "products", id);
      const reviewCollectionRef = collection(productRef, "reviews");
      await addDoc(reviewCollectionRef, reviewData);

      setOpen(false);
      setRating(0);
      setComment("");
      setUserReviewed(true);
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

  useEffect(() => {
    if (id && !userReviewed) {
      dispatch(getSingleProduct(id));
      dispatch(getProductReviews(id));
    }
  }, [dispatch, id, userReviewed]);

  return (
    <Fragment>
      <MetaData title={`${name} -- ECOMMERCE`} />
      <div className="ProductDetails">
        <div>
          <Carousel className="Carousel">
            {images &&
              images.map((imageUrl, index) => (
                <img
                  key={index}
                  className="CarouselImage"
                  src={imageUrl}
                  alt={`Slide ${index}`}
                />
              ))}
          </Carousel>
        </div>
        <div>
          <div className="detailsBlock-1">
            <h2>{name}</h2>
            <p>Product #{id}</p>
          </div>

          <div className="detailsBlock-3">
            <h1>{`₹${price}`}</h1>
            <div className="detailsBlock-3-1">
              <div className="detailsBlock-3-1-1">
                {stock > 0 && <AddToCart product={singleProduct} />}
              </div>
            </div>

            <p>
              Status:
              <b style={{ color: stock < 1 ? "red" : "green" }}>
                {stock < 1 ? "OutOfStock" : "InStock"}
              </b>
            </p>
          </div>
          <div className="detailsBlock-4">
            Description : <p>{description} </p>
          </div>

          <button onClick={submitReviewToggle} className="submitReview">
            Submit Review
          </button>
        </div>
      </div>

      <h3 className="reviewsHeading">REVIEWS</h3>
      <Dialog
        aria-labelledby="simple-dialog-title"
        open={open}
        onClose={submitReviewToggle}
      >
        <DialogTitle>Submit Review</DialogTitle>
        <DialogContent className="submitDialog">
          <Rating
            onChange={(e) => setRating(e.target.value)}
            value={rating}
            size="large"
          />

          <textarea
            className="submitDialogTextArea"
            cols="30"
            rows="5"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
        </DialogContent>
        <DialogActions>
          <Button onClick={submitReviewToggle} color="secondary">
            Cancel
          </Button>
          <Button onClick={reviewSubmitHandler} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      {reviews.length > 0 ? (
        <div className="reviews">
          {reviews.map((review) => (
            <div key={review}>
              <ReviewCard review={review} />
            </div>
          ))}
        </div>
      ) : (
        <p className="noReviews">No Reviews Yet</p>
      )}
    </Fragment>
  );
};

export default ProductDetails;
