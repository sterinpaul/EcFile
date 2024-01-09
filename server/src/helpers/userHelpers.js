import User from "../model/userModel.js"

const userHelpers = {
    getUser:async(mobile)=>{
        return await User.findOne({mobile})
    },
    getUserWithId:async(_id)=>{
        return await User.findOne({_id})
    },
    searchUser:async(email,mobile)=>{
        return await User.findOne({$or:[{email},{mobile}]})
    },
    signup:async(userData,profilePic)=>{
        
        const newUser = new User(
            {   
                fullName:userData.fullName,
                email:userData.email,
                mobile:userData.mobile,
                password:userData.password,
                profilePic
            }
        )
        
        return await newUser.save()
    },
    userStatusChange:async(_id)=>{
        const status = await User.updateOne({_id},{$set:{isValid:true}})
        if(status) return true
    },
    login:(userData)=>{

    }
}

export default userHelpers