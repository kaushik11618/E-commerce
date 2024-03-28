export const addToCart = (id, quantity, product) => async (dispatch) => {
  dispatch({ type: "ADD_TO_CART", payload: { id, quantity, product } });
};
export const removeItem = (id) => async (dispatch) => {
  dispatch({ type: "REMOVE_ITEM", payload: id });
};
export const setIncrease = (id) => async (dispatch) => {
  dispatch({ type: "SET_INCREMENT", payload: id });
};
export const setDecrease = (id) => async (dispatch) => {
  dispatch({ type: "SET_DECREMENT", payload: id });
};
export const clearCart = () => (dispatch) => {
  dispatch({ type: "CLEAR_CART" });
};
export const saveShippingInfo = (data) => async (dispatch) => {
  dispatch({
    type: "SAVE_SHIPPING_INFO",
    payload: data,
  });

  localStorage.setItem("shippingInfo", JSON.stringify(data));
};

