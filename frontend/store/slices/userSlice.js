import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    _id: '',
    email: '',
    username: '',
    auth: false,
    role: ''    
}

const userSlice = createSlice({
    name: 'user',
    initialState,

    reducers: {
        setUser: (state, action) => {
            const { _id, email, username, auth, role } = action.payload;
            state._id = _id;
            state.email = email;
            state.username = username;
            state.auth = auth;
            state.role = role;
        },

        resetUser: (state, action) => {
            state._id = '';
            state.email = '';
            state.username = '';
            state.auth = false;
            state.role = '';
        },
    }
})

export const { setUser, resetUser } = userSlice.actions;
export default userSlice.reducer;