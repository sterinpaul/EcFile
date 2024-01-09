import {Schema,model} from 'mongoose';

// Schema of User
const userSchema = new Schema(
    {
        fullName:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true,
        },
        password:{
            type:String,
            required:true
        },
        profilePic:{
            type:String,
            required:true
        },
        mobile:{
            type:String,
            required:true
        },
        isValid:{
            type:Boolean,
            default:false
        },
    },
    {timestamps:true}
)

const User = model("User",userSchema)
export default User