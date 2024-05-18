
import { MessagesType } from '@/types/product';
import { RoomchatType } from '@/types/roomchat';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
    value: RoomchatType[];
    tmpValue: RoomchatType[];
}

const initialState: InitialState = {
    value: [],
    tmpValue: []
}

export const ListRoom = createSlice({
    name: 'ListRoom',
    initialState,
    reducers: {
        AddListRoom: (state, action: PayloadAction<RoomchatType[]>) => {
            state.value = action.payload;
            state.tmpValue = action.payload;
        },
        UpdateMessage: (state, action: PayloadAction<MessagesType>) => {
            let index = state.tmpValue.findIndex(it => it.id === action.payload.p)
            if (index !== -1) {
                state.value[index] = action.payload;
                state.tmpValue[index] = action.payload;
            }
            else {
                state.value.push(action.payload);
                state.tmpValue.push(action.payload);
            }
        },
        SearchRoom: (state, action: PayloadAction<string>) => {

            state.value = state.tmpValue.filter(it => it.username?.toLowerCase().includes(action.payload.toLowerCase()));

        }
    }
})

export const { AddListRoom, UpdateListRoom, SearchRoom } = ListRoom.actions;

export default ListRoom.reducer;