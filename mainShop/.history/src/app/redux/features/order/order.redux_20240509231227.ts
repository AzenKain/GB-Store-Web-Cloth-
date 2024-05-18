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
            console.log(index)
            if (index === -1) { 
                state.tmpValue.push(action.payload)
            }
            else {
                state.tmpValue[index] = action.payload
            }
        },
        AddFilterOrder: (state, action: PayloadAction<string>) => {
            if (action.payload === "All singles") {
                state.value = state.tmpValue;
                state.value = state.tmpValue;
            }
            else {
                state.value = state.tmpValue.filter(it => it.status?.toUpperCase() === action.payload.toUpperCase())
                state.value.sort(compareByNewest)
            }
        },
        FindById: (state, action: PayloadAction<string>) => {
            state.value = state.value.filter(it => it.id?.includes(action.payload.replaceAll(' ', '')))
        }
    }
})

export const { AddListOrder, AddFilterOrder, FindById, UpdateOrder } = OrderRedux.actions;

export default OrderRedux.reducer;