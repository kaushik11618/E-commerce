import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../../fireabse";

export const getAdminProducts = (adminId) => async (dispatch) => {
  try {
    const adminProductsSnapshot = await getDocs(
      query(collection(db, "products"), where("ownerId", "==", adminId))
    );
    const adminProducts = adminProductsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    dispatch({ type: "SET_ADMIN_PRODUCTS", payload: adminProducts });
  } catch (error) {
    console.error("Error fetching admin products:", error);
    dispatch({ type: "SET_ERROR" });
  }
};

export const getProducts = () => async (dispatch) => {
  dispatch({ type: "SET_LOADING" });
  try {
    const productsCollection = collection(db, "products");
    const querySnapshot = await getDocs(productsCollection);
    const products = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    dispatch({ type: "SET_API_DATA", payload: products });
  } catch (error) {
    dispatch({ type: "API_ERROR" });
  }
};

export const getSingleProduct = (productId) => async (dispatch) => {
  dispatch({ type: "SET_SINGLE_LOADING" });
  try {
    const docRef = doc(db, "products", productId);
    const docSnapshot = await getDoc(docRef);
    if (docSnapshot.exists()) {
      const singleProduct = { id: docSnapshot.id, ...docSnapshot.data() };
      dispatch({ type: "SET_SINGLE_PRODUCT", payload: singleProduct });
    } else {
      console.log("No such document!");
      dispatch({ type: "SET_SINGLE_ERROR" });
    }
  } catch (error) {
    dispatch({ type: "SET_SINGLE_ERROR" });
  }
};

export const getProductReviews = (productId) => async (dispatch) => {
  try {
    const querySnapshot = await getDocs(
      collection(db, "products", productId, "reviews")
    );
    const reviewsData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    dispatch({ type: "SET_PRODUCT_REVIEWS", payload: reviewsData });
  } catch (error) {
    console.error("Error getting product reviews:", error);
  }
};