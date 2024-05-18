
import { UserType } from '@/types/user';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
    value: UserType[];
    tmpValue: UserType[];
}

const initialState: InitialState = {
    value: [],
    tmpValue: []
}

export const ListUser = createSlice({
    name: 'ListUser',
    initialState,
    reducers: {
        AddListUser: (state, action: PayloadAction<UserType[]>) => {
            state.value = action.payload;
            state.tmpValue = action.payload;
        },
        UpdateListUser: (state, action: PayloadAction<UserType>) => {
            let index = state.tmpValue.findIndex(it => it.id === action.payload.id)
            if (index !== -1) {
                state.value[index] = action.payload;
                state.tmpValue[index] = action.payload;
            }
            else {
                state.value.push(action.payload);
                state.tmpValue.push(action.payload);
            }
        },
        SearchUser: (state, action: PayloadAction<{value: string, filter: string}>) => {
            if (action.payload.filter == 'all') {
                state.value = state.tmpValue;
            }
            else if (action.payload.filter == "id") {
                state.value = state.tmpValue;
            }
        }
    }
})

export const { AddListUser, UpdateListUser } = ListUser.actions;

export default ListUser.reducer;