import { FilterOption, FilterSection, FilterUpdate } from '@/types/filter';
import { OrderType } from '@/types/order';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
    value: OrderType[];
    tmpValue: OrderType[];
}

const initialState: InitialState = {
    value: [],
    tmpValue: []
}



export const OrderRedux = createSlice({
    name: 'OrderRedux',
    initialState,
    reducers: {
        AddListOrder: (state, action: PayloadAction<OrderType[]>) => {
            state.value = action.payload;
            state.tmpValue = action.payload;
        },
        AddFilterOrder: (state, action: PayloadAction<string>) => {
            state.value = state.tmpValue.filter(it => it.status?.toUpperCase() === action.payload.toUpperCase())
        }
    }
})

export const { AddListOrder, AddFilterOrder } = OrderRedux.actions;

export default OrderRedux.reducer;