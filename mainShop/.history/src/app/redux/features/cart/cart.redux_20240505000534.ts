import { CartItemType, CartType } from '@/types/cart';
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

export const CartRedux = createSlice({
    name: 'CartRedux',
    initialState,
    reducers: {
        RemoveProductToCart: (state, action: PayloadAction<string>) => {
            let newProductList = initialState.value.items.filter(it => it.productId === action.payload);
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
        },
        AddProductToCart: (state, action: PayloadAction<CartItemType>) => {
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

export const { RemoveProductToCart, AddProductToCart} = CartRedux.actions;

export default CartRedux.reducer;