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
            state.value.sort(compareByNewest)
            state.tmpValue = action.payload;
        },
        UpdateOrder: (state, action: PayloadAction<OrderType>) => {
            let index = state.tmpValue.findIndex(it => it.id === action.payload.id) 
            if (index === -1) { 
                state.tmpValue.push(action.payload)
            }
            else {
                state.tmpValue[index] = action.payload
            }
        },
        SearchUser: (state, action: PayloadAction<{value: string, filter: string}>) => {
            if (action.payload.filter == 'all') {
                state.value = state.tmpValue;
            }
            else if (action.payload.filter == "id") {
                state.value = state.tmpValue.filter(it => it.id?.toLowerCase().includes(action.payload.value.toLowerCase()));
            }
            else if (action.payload.filter == "userName") {
                state.value = state.tmpValue.filter(it => it.username?.toLowerCase().includes(action.payload.value.toLowerCase()));
            }
            else if (action.payload.filter == "email") {
                state.value = state.tmpValue.filter(it => it.email?.toLowerCase().includes(action.payload.value.toLowerCase()));
            }
        }
    }
})

export const { AddListOrder, AddFilterOrder, FindById, UpdateOrder } = OrderRedux.actions;

export default OrderRedux.reducer;