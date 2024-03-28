import { composeWithDevTools } from "@redux-devtools/extension";
import { applyMiddleware, combineReducers, createStore } from "redux";
import { thunk } from "redux-thunk";
import { cartReducer } from "./reducers/cartReducer";
import { AuthReducer } from "./reducers/authReducer";
import FilterReducer from "./reducers/filterReducer";
import ProductReducers from "./reducers/productReducer";
const rootReducer = combineReducers({
  products: ProductReducers,
  filterProduct: FilterReducer,
  cartData: cartReducer,
  userData: AuthReducer,
});
const middleware = [thunk];

const store = createStore(
  rootReducer,
  {},
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;
