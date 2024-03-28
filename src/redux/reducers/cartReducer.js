const getLocalCartData = () => {
  let cartData = localStorage.getItem("cart");
  if (!cartData || JSON.parse(cartData).length === 0) {
    return [];
  } else {
    return JSON.parse(cartData);
  }
};
const getLocalshippingDetail = () => {
  let shippingDetail = localStorage.getItem("shippingInfo");
  if (!shippingDetail || JSON.parse(shippingDetail).length === 0) {
    return [];
  } else {
    return JSON.parse(shippingDetail);
  }
};
export const cartReducer = (
  state = {
    cartItem: getLocalCartData(),
    total_item: "",
    total_price: "",
    shippingInfo: getLocalshippingDetail(),
  },
  action
) => {
  if (action.type === "ADD_TO_CART") {
    let { id, quantity, product } = action.payload;
    let existingProduct = state.cartItem.find((curItem) => curItem.id === id);

    if (existingProduct) {
      let updatedProduct = state.cartItem.map((curElem) => {
        if (curElem.id === id) {
          let newAmount = curElem.quantity + quantity;

          if (newAmount >= curElem.max) {
            newAmount = curElem.max;
          }
          return {
            ...curElem,
            quantity: newAmount,
          };
        } else {
          return curElem;
        }
      });
      return {
        ...state,
        cartItem: updatedProduct,
      };
    } else {
      let cartProduct = {
        id: id,
        name: product.name,
        quantity,
        image: product.images[0],
        price: product.price,
        max: product.stock,
      };

      return {
        ...state,
        cartItem: [...state.cartItem, cartProduct],
      };
    }
  }

  if (action.type === "SET_DECREMENT") {
    let updatedProduct = state.cartItem.map((curElem) => {
      if (curElem.id === action.payload) {
        let decAmount = curElem.quantity - 1;

        if (decAmount <= 1) {
          decAmount = 1;
        }

        return {
          ...curElem,
          quantity: decAmount,
        };
      } else {
        return curElem;
      }
    });
    return { ...state, cartItem: updatedProduct };
  }

  if (action.type === "SET_INCREMENT") {
    let updatedProduct = state.cartItem.map((curElem) => {
      if (curElem.id === action.payload) {
        let incAmount = curElem.quantity + 1;

        if (incAmount >= curElem.max) {
          incAmount = curElem.max;
        }

        return {
          ...curElem,
          quantity: incAmount,
        };
      } else {
        return curElem;
      }
    });
    return { ...state, cartItem: updatedProduct };
  }

  if (action.type === "REMOVE_ITEM") {
    let updatedCart = state.cartItem.filter(
      (curItem) => curItem.id !== action.payload
    );
    return {
      ...state,
      cartItem: updatedCart,
    };
  }

  if (action.type === "CLEAR_CART") {
    return {
      ...state,
      cartItem: [],
    };
  }

  if (action.type === "CART_ITEM_PRICE_TOTAL") {
    let { total_item, total_price } = state.cartItem.reduce(
      (accum, curElem) => {
        let { price, quantity } = curElem;

        accum.total_item += quantity;
        accum.total_price += price * quantity;

        return accum;
      },
      {
        total_item: 0,
        total_price: 0,
      }
    );
    return {
      ...state,
      total_item,
      total_price,
    };
  }
  if (action.type === "SAVE_SHIPPING_INFO") {
    return {
      ...state,
      shippingInfo: action.payload,
    };
  }

  return state;
};
