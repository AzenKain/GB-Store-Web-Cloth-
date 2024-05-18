import { ProductType } from '@/types/product';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
    value: ProductType[];
    fillter
}

const initialState: InitialState = {
    value: []
}

export const ProductRedux = createSlice({
    name: 'ProductRedux',
    initialState,
    reducers: {
        AddListProduct: (state, action: PayloadAction<ProductType[]>) => {
            return {
                value: action.payload
            }
        }
    }
})

export const { AddListProduct} = ProductRedux.actions;

export default ProductRedux.reducer;