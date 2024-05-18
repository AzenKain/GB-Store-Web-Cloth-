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

const removeDuplicates = (products: ProductType[]): ProductType[] => {
    const uniqueProducts: { [key: string]: ProductType } = {};
    products.forEach(product => {
        if (product.id !== undefined) {
            uniqueProducts[product.id] = product;
        }
    });
    return Object.values(uniqueProducts);
};

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
        AddFilterProduct: (state, action: PayloadAction<FilterSection[]>) => {

        }
    }
})

export const { AddListProduct, AddFilterProduct} = ProductRedux.actions;

export default ProductRedux.reducer;