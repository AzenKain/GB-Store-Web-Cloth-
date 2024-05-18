import { ProductType } from '@/types/product';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
    value: ProductType[];
}

const initialState: InitialState = {
    value: []
}

export const ProductRedux = createSlice({
    name: 'ProductRedux',
    initialState,
    reducers: {
        RemoveProduct: (state, action: PayloadAction<string>) => {
            let newProductList = state.value.filter(it => it.id !== action.payload);
            return {
                value: newProductList
            }
        },
        AddProduct: (state, action: PayloadAction<ProductType>) => {
            let indexValue = state.value.findIndex(it => it.id === action.payload.id)
            if (indexValue !== -1) {
                let newProductList = [...state.value];
                newProductList[indexValue] = action.payload;
                return {
                    value: newProductList
                }
            }
            else {
                let newProductList = [...state.value, action.payload]
                return {
                    value: newProductList
                }
            }

        },
        AddListProduct: (state, action: PayloadAction<ProductType[]>) => {
            let newProductList = [...action.payload]
                value: newProductList
        },
    }
})

export const { RemoveProduct, AddProduct, AddListProduct} = ProductRedux.actions;

export default ProductRedux.reducer;