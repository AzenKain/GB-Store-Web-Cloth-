import { CartItemType, CartType } from '@/types/cart';
import { ProductType } from '@/types/product';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
    value: CartType;
}

const initialState: InitialState = {
    value: {
        items: [],
        totalPrice: 0,
    }
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
        AddProduct: (state, action: PayloadAction<CartItemType>) => {
            let indexValue = initialState.value.items.findIndex(it => it.id === action.payload.id)
            if (indexValue !== -1) {
                let newProductList = [...initialState.value.items];
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