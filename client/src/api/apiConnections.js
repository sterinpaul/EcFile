import baseURL from './baseURL'
import { toast } from 'react-toastify';

export const signUp = async(data,img)=>{
    try{
        const formData = new FormData()
        formData.append('fullName',data.fullName)
        formData.append('email',data.email)
        formData.append('mobile',data.mobile)
        formData.append('password',data.password)
        formData.append('profilePic',img)
        const response =  await baseURL.post('/user/signup',formData,{
            headers:{'Content-Type' : 'multipart/form-data'}
        })
        return response?.data
       
    // Handling error
    }catch(error){
        toast.error('Error occured while registering')
    }
}

export const login = async (values)=>{
    try{
        const response = await baseURL.post('/user/login',values)
        return response?.data
        
    // Handling error
    }catch(error){
        throw new Error(`Error while signing in : ${error}`)
    }
}

export const getUserDetails = async (userId)=>{
    try{
        const response = await baseURL.get(`/user/${userId}`)
        return response?.data
        
    // Handling error
    }catch(error){
        throw new Error(`Error while getting user data : ${error}`)
    }
}

export const adminLogin = async (values)=>{
    try{
        const response = await baseURL.post(`/admin/login`,values)
        return response?.data
        
    // Handling error
    }catch(error){
        throw new Error(`Error while admin login : ${error}`)
    }
}

export const getUserData = async()=>{
    try{
        const response = await baseURL.get(`/admin`)
        return response?.data
        
    // Handling error
    }catch(error){
        throw new Error(`Error while loading all users : ${error}`)
    }
}
