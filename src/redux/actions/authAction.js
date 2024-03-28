import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../../fireabse";
import { clearCart } from "./cartAction";

export const authRegister = (credentials) => async (dispatch) => {
  try {
    const { email, password, displayName } = credentials;
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      email: email,
      displayName: displayName,
      role: "user",
    });
    await updateProfile(user, {
      displayName: displayName,
    });
    localStorage.setItem("accessToken", user.accessToken);
  } catch (error) {
    console.error("Error adding document: ", error);
    dispatch({ type: "AUTH_REGISTER_FAILURE", payload: error.message });
  }
};

export const authLogin = (credentials) => async (dispatch) => {
  try {
    const { email, password } = credentials;
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    const userDocRef = doc(db, "users", user.uid);
    const userDocSnapshot = await getDoc(userDocRef);
    const userData = userDocSnapshot.data();
    localStorage.setItem("accessToken", user.accessToken);
    dispatch({
      type: "HYDRATE_USER",
      payload: { accessToken: user.accessToken, userData: userData },
    });
  } catch (error) {
    console.error("Error adding document: ", error);
    dispatch({ type: "AUTH_LOGIN_FAILURE", payload: error.message });
  }
};
export const authLogout = () => async (dispatch) => {
  try {
    signOut(auth);
    dispatch({ type: "AUTH_LOGOUT_SUCCESS" });
    localStorage.removeItem("accessToken");
    sessionStorage.removeItem("orderInfo")
    localStorage.removeItem("shippingInfo")
    localStorage.removeItem("cart")
    dispatch(clearCart());
  } catch (error) {
    dispatch({ type: "AUTH_LOGOUT_FAILURE", payload: error.message });
  }
};

export const hydrateUser = (user) => async (dispatch) => {
  try {
    const userDocRef = doc(db, "users", user.uid);
    const userDocSnapshot = await getDoc(userDocRef);
    const userData = userDocSnapshot.data();
    dispatch({
      type: "HYDRATE_USER",
      payload: { accessToken: user.accessToken, userData: userData },
    });
  } catch (error) {
    console.log("error", error);
  }
};
