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
                // For other filters (assuming "tags")
                return products.filter(product => product.detail?.tags.includes(filterValue));
            };

            // Update value and tmpValue based on the filter update
            if (checked) {
                // Filter tmpValue and update value with the filtered result
                state.value = filterProducts(state.tmpValue, value);
            } else {
                const productsToAdd = state.tmpValue.filter(product => product[id].includes(value));
                state.value = [...state.value, ...productsToAdd];
            }
        }
    }
})

export const { AddListProduct, AddFilterProduct} = ProductRedux.actions;

export default ProductRedux.reducer;