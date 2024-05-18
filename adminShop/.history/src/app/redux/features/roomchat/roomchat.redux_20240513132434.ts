
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
            let index = state.tmpValue.findIndex(it => it.id === action.payload.roomId)
            if (index !== -1) {
                let indexMegs = state.tmpValue[index].messages.findIndex(it => it.id === action.payload.id)
                if (indexMegs !== -1) {
                    state.tmpValue[index].messages[indexMegs] = action.payload
                }
                else {
                    state.tmpValue[index].messages.push(action.payload)
                }
                let indexValue = state.value.findIndex(it => it.id == action.payload.roomId)
                state.value[]
            }

        },
        SearchRoom: (state, action: PayloadAction<string>) => {

            state.value = state.tmpValue.filter(it => it.username?.toLowerCase().includes(action.payload.toLowerCase()));

        }
    }
})

export const { AddListRoom, UpdateListRoom, SearchRoom } = ListRoom.actions;

export default ListRoom.reducer;