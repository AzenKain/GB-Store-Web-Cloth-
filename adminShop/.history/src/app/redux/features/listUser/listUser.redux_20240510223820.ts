
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
        AddListUser: (state, action: PayloadAction<UserType>) => {
            return {
                value: {
                    ...action.payload
                }
            }
        },
    }
})

export const { AddListUser } = ListUser.actions;

export default ListUser.reducer;