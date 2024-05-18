
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
        UpdateUser: (state, action: PayloadAction<UserType>) => {
            return {
                value: {
                    items: newProductList,
                    totalPrice: newTotalPrice
                }

            }
        }
    }
})

export const { UpdateUser } = CartRedux.actions;

export default CartRedux.reducer;