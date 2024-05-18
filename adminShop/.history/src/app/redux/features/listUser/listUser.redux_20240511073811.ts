
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
        UpdateUser: (state, action: PayloadAction<UserType>) => {
            let index = state.tmpValue.fin
        }
    }
})

export const { AddListUser } = ListUser.actions;

export default ListUser.reducer;