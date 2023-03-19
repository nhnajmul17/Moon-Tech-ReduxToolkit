import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchProducts, postProduct } from "./producAPI";

const initialState = {
    products: [],
    isLoading: false,
    isError: false,
    Error: "",
    addProdSuccess: false,
}

export const getProducts = createAsyncThunk('products/getProducts', async () => {
    const products = fetchProducts()
    // const res = await fetch("products.json")
    // const data = await res.json()
    return products
})
export const addProduct = createAsyncThunk('products/addProduct', async (data) => {
    const products = postProduct(data)
    return products
})
const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        togglePostSuccess: (state) => {
            state.addProdSuccess = false
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getProducts.pending, (state) => {
            state.isLoading = true;
        })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.products = action.payload
                state.isLoading = false
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.isError = true
                state.Error = action.error.message
            })
            .addCase(addProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addProduct.fulfilled, (state) => {
                state.isLoading = false;
                state.addProdSuccess = true;
            })
            .addCase(addProduct.rejected, (state, action) => {
                state.isError = true
                state.addProdSuccess = false
                state.Error = action.error.message
            })
    }
})

export const { togglePostSuccess } = productSlice.actions;

export default productSlice.reducer;
