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