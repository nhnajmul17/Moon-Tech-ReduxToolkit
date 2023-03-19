import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [],
    isLoading: false,
    isError: false,
    Error: "",
}

export const getProducts = createAsyncThunk('products/getProducts', async () => {
    const res = await fetch("products.json")
    const data = await res.json()
    return data
})
const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getProducts.pending, (state, action) => {
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
    }
})

export default productSlice.reducer;
