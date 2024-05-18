import { OrderType } from '@/types/order';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { stat } from 'fs';

type InitialState = {
    value: OrderType[];
    tmpValue: OrderType[];
}

const initialState: InitialState = {
    value: [],
    tmpValue: []
}

const compareByNewest = (a: OrderType, b: OrderType) => {
    const createdAtA = new Date(a.createdAt ?? "").getTime();
    const createdAtB = new Date(a.createdAt ?? "").getTime();
    if (createdAtA === undefined || createdAtB === undefined) {
        return 0;
    }
    return createdAtB - createdAtA;
};

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
                state.value.push(action.payload)
            }
            else {
                state.tmpValue[index] = action.payload
                
            }
            state.value.sort(compareByNewest)
        },
        SearchUser: (state, action: PayloadAction<{value: string, filter: string}>) => {
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

export const { AddListOrder, UpdateOrder } = OrderRedux.actions;

export default OrderRedux.reducer;