
import { UserType } from '@/types/user';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
    value: UserType;
}

const initialState: InitialState = {
    value: {
        imgDisplay: "http://localhost:3434/media/file/user.png",
        heart: []
    }
}

export const UserRedux = createSlice({
    name: 'UserRedux',
    initialState,
    reducers: {
        UpdateUser: (state, action: PayloadAction<UserType>) => {
            return {
                value: {
                    ...action.payload
                }

            }
        }
        AddHeart: (state, action: PayloadAction<string>) => {)
    }
})

export const { UpdateUser } = UserRedux.actions;

export default UserRedux.reducer;