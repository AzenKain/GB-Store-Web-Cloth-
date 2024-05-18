import { ProductType } from '@/types/product';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
    value: ProductType[];
    tmpValue: ProductType[];
}

const initialState: InitialState = {
    value: [],
    tmpValue: [],
}

export const ProductRedux = createSlice({
    name: 'ProductRedux',
    initialState,
    reducers: {
        RemoveProduct: (state, action: PayloadAction<string>) => {
            let newProductList = state.value.filter(it => it.id !== action.payload);
            state.value = newProductList
        },
        AddProduct: (state, action: PayloadAction<ProductType>) => {
            let indexValue = state.value.findIndex(it => it.id === action.payload.id)
            if (indexValue !== -1) {
                let newProductList = [...state.value];
                newProductList[indexValue] = action.payload;
                state.value = newProductList
            }
            else {
                let newProductList = [...state.value, action.payload]
                state.value = newProductList
            }
            let indexValue3 = state.tmpValue.findIndex(it => it.id === action.payload.id)
        },
        AddListProduct: (state, action: PayloadAction<ProductType[]>) => {
            let newProductList = [...action.payload]
            state.value = newProductList
            state.tmpValue = newProductList
        },
        SearchProduct: (state, action: PayloadAction<{value: string, filter: string}>) => {
            if (action.payload.filter == 'all') {
                state.value = state.tmpValue;
            }
            else if (action.payload.filter == "id") {
                state.value = state.tmpValue.filter(it => it.id?.toLowerCase().includes(action.payload.value.toLowerCase()));
            }
            else if (action.payload.filter == "userId") {
                state.value = state.tmpValue.filter(it => it.userId?.toLowerCase().includes(action.payload.value.toLowerCase()));
            }
            else if (action.payload.filter == "email") {
                state.value = state.tmpValue.filter(it => it.personalDetails.email?.toLowerCase().includes(action.payload.value.toLowerCase()));
            }
            state.value.sort(compareByNewest)
        }
    }
})

export const { RemoveProduct, AddProduct, AddListProduct, SearchProduct} = ProductRedux.actions;

export default ProductRedux.reducer;