import { createSlice } from "@reduxjs/toolkit";


const getTokenFromLocal = ()=>{
    const token = localStorage.getItem("token")
    if(token){
        return token
    }
}

const getUserIdFromLocal = ()=>{
    const userId = localStorage.getItem("userId")
    if(userId){
        return userId
    }
}


const initialState = {
    token: getTokenFromLocal(),
    userId: getUserIdFromLocal()
}

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        setToken:(state,action)=>{
            state.token = action.payload
            localStorage.setItem('token',action.payload)
        },
        setUser:(state,action)=>{
            state.userId = action.payload
            localStorage.setItem('userId',action.payload)
        },
        userSignOut:(state)=>{
            state.token = ''
            state.userId = ''
            localStorage.removeItem('token')
            localStorage.removeItem('userId')
        }
    }
})

export const {
    setToken,
    setUser,
    userSignOut
} = userSlice.actions

export default userSlice.reducer