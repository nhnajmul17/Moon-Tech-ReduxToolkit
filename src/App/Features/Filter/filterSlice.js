import { createSlice } from "@reduxjs/toolkit"
const initialState = {
    brands: [],
    stock: false,
    keyword: ""
}

const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        toggleBrand: (state, action) => {
            if (state.brands.includes(action.payload)) {
                state.brands = state.brands.filter(brand => brand !== action.payload)
            }
            else {
                state.brands.push(action.payload)
            }
        },
        toggleStock: (state, action) => {
            state.stock = !state.stock
        }

    }
})
export const { toggleBrand, toggleStock } = filterSlice.actions
export default filterSlice.reducer