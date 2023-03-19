import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    cart: []
}
const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {

        addToCart: (state, action) => {
            const selectedProduct = state.cart.find(product => product._id === action.payload._id)
            if (!selectedProduct) {
                const product = { ...action.payload, quantity: 1 }
                state.cart.push(product);

                // or we can use just this below one line code as immutablity ==>

                // state.cart = [...state.cart, { ...action.payload, quantity: 1 }]
            } else {
                selectedProduct.quantity += 1
                state.cart.filter(product => product._id !== selectedProduct._id).push(selectedProduct)
            }
        },
        removeFromCart: (state, action) => {
            const selectedProduct = state.cart.find(product => product._id === action.payload._id)
            if (selectedProduct.quantity > 1) {
                selectedProduct.quantity -= 1
                state.cart.filter(product => product._id !== selectedProduct._id).push(selectedProduct)

            } else {
                state.cart = state.cart.filter(product => product._id !== selectedProduct._id)
            }
        }



    }
})
export const { addToCart, removeFromCart } = cartSlice.actions
export default cartSlice.reducer