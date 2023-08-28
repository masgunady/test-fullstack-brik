import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    dataProduct: []
}

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setDataProduct: (state, action) => {
            state.dataProduct = action.payload
        }
    }
})

export const {setDataProduct} = productSlice.actions
export default productSlice.reducer
