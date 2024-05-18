
import { UserType } from '@/types/user';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
    value: UserType;
}

const initialState: InitialState = {
    value: {
        imgDisplay: "http://localhost:3434/media/file/user.png"
    }
}

export const CartRedux = createSlice({
    name: 'CartRedux',
    initialState,
    reducers: {
        UpdateUser: (state, action: PayloadAction<Us>) => {
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

export const { RemoveProduct, AddProduct} = CartRedux.actions;

export default CartRedux.reducer;