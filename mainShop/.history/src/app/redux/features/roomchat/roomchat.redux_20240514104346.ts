
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
        UpdateMessage:
    }
})

export const { UpdateRoomchat, AddHeart, RemoveHeart } = RoomchatRedux.actions;

export default RoomchatRedux.reducer;