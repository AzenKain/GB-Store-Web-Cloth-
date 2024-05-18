import { CartItemType, CartType } from '@/types/cart';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
    value: CartType;
    method: string;
}

const initialState: InitialState = {
    value: {
        items: [],
        totalPrice: 0,
    },
    method: "FAST"
}

export const CartRedux = createSlice({
    name: 'CartRedux',
    initialState,
    reducers: {
        AddDataCart: (state, action: PayloadAction<CartType>) => {
            state.value = action.payload;
        },
        uploadMethodCart: (state, action: PayloadAction<CartType>) => {
            state.value = action.payload;
        },
        UpdateProductCart: (state, action: PayloadAction<CartItemType>) => {
            const { items } = state.value;
            const { payload } = action;

            const indexValue = items.findIndex(
                it => it.productId === payload.productId
                    && it.color.toLowerCase() === payload.color.toLowerCase()
                    && it.size === payload.size
            );

            let newItems = [...items];
            let totalPrice = state.value.totalPrice;

            if (indexValue !== -1) {
                if (payload.quantity <= 0) {
                    newItems = newItems.filter(it => it.productId !== payload.productId);
                } else {
                    newItems[indexValue] = payload;
                }
            } else {
                newItems.push(payload);
            }

            totalPrice = newItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

            state.value = {
                items: newItems,
                totalPrice: totalPrice,
            };
        }
    }
})

export const { UpdateProductCart, AddDataCart } = CartRedux.actions;

export default CartRedux.reducer;
