import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user:null
}

export const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        signIn:(state,action)=>{
            state.user = action.payload
        },
        signOut:(state)=>{
            state.user = null
        },
        updateUser:(state,action)=>{
            state.user = action.payload
        }
    }
})

export const { signIn,signOut, updateUser } = userSlice.actions

export default userSlice.reducer