import {Schema,model} from 'mongoose';

// Schema of User
const adminSchema = new Schema(
    {
        email:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:true
        }
    },
    {timestamps:true}
)

const Admin = model("Admin",adminSchema)
export default Admin