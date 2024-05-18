import { CartItemType } from '@/types/cart';
import { ProductType } from '@/types/product';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
    value: CartItemType;
}

const initialState: InitialState = {
    value: []
}

export const ProductRedux = createSlice({
    name: 'ProductRedux',
    initialState,
    reducers: {
        RemoveProduct: (state, action: PayloadAction<string>) => {
            let newProductList = initialState.value.filter(it => it.id !== action.payload);
            return {
                value: newProductList
            }
        },
        AddProduct: (state, action: PayloadAction<ProductType>) => {
            let indexValue = initialState.value.findIndex(it => it.id === action.payload.id)
            if (indexValue !== -1) {
                let newProductList = [...initialState.value];
                newProductList[indexValue] = action.payload;
                return {
                    value: newProductList
                }
            }
            else {
                let newProductList = [...initialState.value, action.payload]
                return {
                    value: newProductList
                }
            }

        },
        AddListProduct: (state, action: PayloadAction<ProductType[]>) => {
            let newProductList = [...action.payload]
            return {
                value: newProductList
            }
        },
    }
})

export const { RemoveProduct, AddProduct, AddListProduct} = ProductRedux.actions;

export default ProductRedux.reducer;