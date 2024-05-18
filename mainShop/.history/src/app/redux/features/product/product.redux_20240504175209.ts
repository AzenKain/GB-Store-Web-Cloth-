import { CartItemType, CartType } from '@/types/cart';
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

        AddListProduct: (state, action: PayloadAction<ProductType[]>) => {
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