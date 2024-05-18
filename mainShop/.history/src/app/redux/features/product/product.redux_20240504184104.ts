import { FilterUpdate } from '@/types/filter';
import { ProductType } from '@/types/product';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
    value: ProductType[];
    tmpValue: ProductType[];
}

const initialState: InitialState = {
    value: [],
    tmpValue: []
}

export const ProductRedux = createSlice({
    name: 'ProductRedux',
    initialState,
    reducers: {
        AddListProduct: (state, action: PayloadAction<ProductType[]>) => {
            return {
                value: action.payload,
                tmpValue: action.payload
            }
        },
        AddFilterProduct: (state, action: PayloadAction<FilterUpdate>) => {
            const { id, value, checked } = action.payload;

            const filterProducts = (products: ProductType[]): ProductType[] => {
                if (id === "brand") {
                    return checked
                        ? products.filter(product => product.productName.toLowerCase() === value)
                        : products.filter(product => product.productName.toLowerCase() !== value);
                }
                if (id === "color") {
                    return checked
                        ? products.filter(product => product.color.includes(value))
                        : products.filter(product => !product.color.includes(value));
                }
                if (id === "size") {
                    return checked
                        ? products.filter(product => product.size.includes(value))
                        : products.filter(product => !product.size.includes(value));
                }
       
                return checked
                    ? products.filter(product => product.detail?.tags.includes(value))
                    : products.filter(product => !product.detail?.tags.includes(value));
            };

            // Update value and tmpValue based on the filtered products
            state.value = filterProducts(state.value);
            state.tmpValue = filterProducts(state.tmpValue);
        }
    }
})

export const { AddListProduct, AddFilterProduct} = ProductRedux.actions;

export default ProductRedux.reducer;