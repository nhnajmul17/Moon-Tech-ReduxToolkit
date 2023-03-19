import { configureStore } from "@reduxjs/toolkit"
import cartSlice from "./Features/Cart/cartSlice";
import filterSlice from "./Features/Filter/filterSlice";
import productSlice from "./Features/Products/productSlice";

const store = configureStore({
    reducer: {
        cart: cartSlice,
        filter: filterSlice,
        products: productSlice
    }
})
export default store;