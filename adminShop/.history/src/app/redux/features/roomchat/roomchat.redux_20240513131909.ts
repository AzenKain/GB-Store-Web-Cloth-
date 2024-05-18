
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

export const ListRoom = createSlice({
    name: 'ListRoom',
    initialState,
    reducers: {
        AddListRoom: (state, action: PayloadAction<Ro[]>) => {
            state.value = action.payload;
            state.tmpValue = action.payload;
        },
        UpdateListRoom: (state, action: PayloadAction<RoomType>) => {
            let index = state.tmpValue.findIndex(it => it.id === action.payload.id)
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