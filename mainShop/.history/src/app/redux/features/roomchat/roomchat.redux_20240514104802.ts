
import { MessagesType } from '@/types/product';
import { RoomchatType } from '@/types/roomchat';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
    value: RoomchatType;
}

const initialState: InitialState = {
    value: {
        messages: []
    }
}

export const RoomchatRedux = createSlice({
    name: 'RoomchatRedux',
    initialState,
    reducers: {
        UpdateRoomchat: (state, action: PayloadAction<RoomchatType>) => {
            state.value = action.payload
        },
        UpdateMessage:(state, action: PayloadAction<MessagesType>) => {
            let index = state.value.messages.findIndex(message => message.id === action.payload.id);
        }
    }
})

export const { UpdateRoomchat, UpdateMessage } = RoomchatRedux.actions;

export default RoomchatRedux.reducer;