const ProductReducers = (
  state = {
    isLoading: false,
    isError: false,
    products: [],
    featureProducts: [],
    isSingleLoading: false,
    singleProduct: {},
    reviews: [],
  },
  action
) => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, isLoading: true };
    case "SET_API_DATA":
    case "SET_ADMIN_PRODUCTS":
      return {
        ...state,
        isLoading: false,
        products: action.payload,
      };
    case "API_ERROR":
      return { ...state, isError: true, isLoading: false };

    case "SET_SINGLE_LOADING":
      return { ...state, isSingleLoading: true };
    case "SET_SINGLE_PRODUCT":
      return {
        ...state,
        isSingleLoading: false,
        singleProduct: action.payload,
      };
    case "SET_SINGLE_ERROR":
      return { ...state, isError: true, isSingleLoading: false };
    case "SET_PRODUCT_REVIEWS":
      return { ...state, reviews: action.payload };
    default:
      return state;
  }
};
export default ProductReducers;
