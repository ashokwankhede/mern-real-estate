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
        },
        updateStart:(state,action) => {
            state.loading = true;
        },
        updateUserSuccess:(state,action) => {
            state.loading = false;
            state.currentUser = action.payload;
            state.error = null;
        },
        updateUserFailure:(state,action) => {
            state.loading = false;
            state.error = action.payload;
            state.currentUser = null;
        },
        startDeleteUser:(state,action) => {  
            state.loading = true;
        },
        deleteUserSuccess:(state,action) => {  
            state.currentUser = null;    
            state.loading = false;  
            state.error = null;
        },
        deleteUserFailure:(state,action) => {
            state.loading = false;
            state.error = action.payload;
        },
        logOutStart:(state,action)=>{
            state.loading = true;
        },   
        logOutSuccess:(state,action)=>{
            state.currentUser = null;
            state.loading = false;
            state.error = null;
        },
        logOutFailure:(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        }
    }
});

export const {
        signinStart,
        signinSuccess,
        signinFailure,
        updateUserFailure,
        updateUserSuccess,
        updateStart,
        startDeleteUser,
        deleteUserFailure,
        deleteUserSuccess,
        logOutStart,
        logOutSuccess,
        logOutFailure,
    } = userSlice.actions;

    
export default userSlice.reducer;