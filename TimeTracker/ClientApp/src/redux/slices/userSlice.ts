import { createSlice } from "@reduxjs/toolkit"
import { User } from '../intrerfaces';

const initialState: { user: User|undefined } =
{
    user: undefined,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
    },
});

export const userReducer = userSlice.reducer;
// export const { } = userSlice.actions;
