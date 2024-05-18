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
            if (action.payload.id == "brand") {
                if (action.payload.checked) {
                    let newValue = initialState.value.filter(it => it.productName.toLowerCase() == action.payload.value)
                    return {
                        value: newValue,
                        tmpValue: initialState.tmpValue
                    }
                }
                else {
                    let addValue =initialState.tmpValue.filter(it => it.productName.toLowerCase() == action.payload.value)
                    let newValue = [...addValue, initialState.value];
                    return {
                        value: newValue,
                        tmpValue: initialState.tmpValue
                    }
                }
            }
        }
    }
})

export const { AddListProduct} = ProductRedux.actions;

export default ProductRedux.reducer;