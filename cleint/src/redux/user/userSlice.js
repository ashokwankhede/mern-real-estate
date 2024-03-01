import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentUser:null,
    error:null,
    loading:false,
};

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        signinStart:(state) => {
            state.loading = true;
        },
        signinSuccess:(state,action) => {
            state.loading = false;
            state.currentUser = action.payload;
            state.error = null;
        },
        signinFailure:(state,action) => {
            state.loading = false;
            state.error = action.payload;
            state.currentUser = null;
        }
    }
});

export const {signinStart,signinSuccess,signinFailure} = userSlice.actions;
export default userSlice.reducer;