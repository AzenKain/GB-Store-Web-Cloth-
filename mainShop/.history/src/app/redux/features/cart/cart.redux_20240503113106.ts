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
            let newProductList = initialState.value.items.filter(it => it.productId === action.payload);
            let newTotalPrice = 0;
            for (let i = 0; i < initialState.value.items.length; i++) {
                newTotalPrice += initialState.value.items[i].price * initialState.value.items[i].quantity;
            }
            return {
                value: {
                    items: newProductList,
                    totalPrice: initialState.value.totalPrice
                }
            }
        },
        AddProduct: (state, action: PayloadAction<CartItemType>) => {
            let indexValue = initialState.value.items.findIndex(
                it => it.productId === action.payload.productId 
                && it.color === action.payload.color 
                && it.price === action.payload.price
            )
            let newProductList = [...initialState.value.items];
            if (indexValue !== -1) {
                newProductList[indexValue] = action.payload;
            }
            else {
                newProductList = [...initialState.value.items, action.payload]
            }
            let newTotalPrice = 0;
            for (let i = 0; i < initialState.value.items.length; i++) {
                newTotalPrice += initialState.value.items[i].price * initialState.value.items[i].quantity;
            }
            return {
                value: {
                    items: newProductList,
                    totalPrice: newTotalPrice
                }

            }
        }
    }
})

export const { RemoveProduct, AddProduct} = ProductRedux.actions;

export default ProductRedux.reducer;