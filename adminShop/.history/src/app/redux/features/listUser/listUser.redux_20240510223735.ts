
import { UserType } from '@/types/user';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
    value: UserType[];
    tmpValue: UserType[];
}

const initialState: InitialState = {
    value: []
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
        AddHeart: (state, action: PayloadAction<string>) => {
            if (!state.value.heart.includes(action.payload)) state.value.heart.push(action.payload);
        },
        RemoveHeart: (state, action: PayloadAction<string>) => {
            state.value.heart = state.value.heart.filter(it => it !== action.payload)
        }
    }
})

export const { UpdateUser, AddHeart, RemoveHeart } = ListUser.actions;

export default ListUser.reducer;