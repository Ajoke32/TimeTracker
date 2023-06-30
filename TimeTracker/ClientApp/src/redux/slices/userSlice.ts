import { createSlice } from "@reduxjs/toolkit"
import { User } from '../intrerfaces';

const initialState: { user: User|undefined, userToken: string, isAuthenticated: boolean } =
{
    user: undefined,
    userToken: '',
    isAuthenticated: false
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
    },
});

export const user = userSlice.reducer;
// export const { } = userSlice.actions;
