
import { UserType } from '@/types/user';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
    value: UserType[];
    tmpValue: UserType[];
}

const initialState: InitialState = {
    value: []
    tmpValue: []
}

export const ListUser = createSlice({
    name: 'ListUser',
    initialState,
    reducers: {
        UpdateUser: (state, action: PayloadAction<UserType>) => {
            return {
                value: {
                    ...action.payload
                }
            }
        },
    }
})

export const { UpdateUser, AddHeart, RemoveHeart } = ListUser.actions;

export default ListUser.reducer;