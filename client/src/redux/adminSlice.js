import { createSlice } from "@reduxjs/toolkit";

const getAdminTokenFromLocal = ()=>{
    const adminToken = localStorage.getItem("admin-token")
    if(adminToken){
        return adminToken
    }
}

const initialState = {
    adminToken: getAdminTokenFromLocal()
}

const adminSlice = createSlice({
    name:"admin",
    initialState,
    reducers:{
        setAdminToken:(state,action)=>{
            state.adminToken = action.payload
            localStorage.setItem('admin-token',action.payload)
        },
        adminSignOut:(state)=>{
            state.adminToken = ''
            localStorage.removeItem('admin-token')
        }
    }
})

export const {
    setAdminToken,
    adminSignOut
} = adminSlice.actions

export default adminSlice.reducer