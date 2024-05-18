
import { RoomchatType } from '@/types/user';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
    value: RoomchatType;
}

const initialState: InitialState = {
    value: {
        imgDisplay: "http://localhost:3434/media/file/user.png",
        heart: []
    }
}

export const RoomchatRedux = createSlice({
    name: 'RoomchatRedux',
    initialState,
    reducers: {
        UpdateRoomchat: (state, action: PayloadAction<RoomchatType>) => {
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

export const { UpdateRoomchat, AddHeart, RemoveHeart } = RoomchatRedux.actions;

export default RoomchatRedux.reducer;