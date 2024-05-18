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
            console.log(action.payload)
            const { id, value, checked } = action.payload;
            const filterProducts = (products: ProductType[], filterValue: string): ProductType[] => {
                if (id === "brand") {
                    return products.filter(product => product.productName.toLowerCase() === filterValue);
                }
                if (id === "color") {
                    return products.filter(product => product.color.includes(filterValue));
                }
                if (id === "size") {
                    return products.filter(product => product.size.includes(filterValue));
                }
                if (id ===  "category") {
                    
                }
                return products.filter(product => product.detail?.tags.includes(filterValue));
            };

            if (checked) {
                state.value = filterProducts(state.value, value);
            } else {
                const productsToAdd = filterProducts(state.value, value);
                state.value = [...state.value, ...productsToAdd];
            }
        }
    }
})

export const { AddListProduct, AddFilterProduct} = ProductRedux.actions;

export default ProductRedux.reducer;