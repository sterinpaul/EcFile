import AdminLoginComponent from "../../components/admin/AdminLoginComponent"
import {
    Card
} from "@material-tailwind/react";

const AdminLogin = ()=>{
    return(
        <div className="h-screen flex items-center justify-center">
            <Card className="p-4 shadow-2xl shadow-blue-gray-500">
                <AdminLoginComponent/>
            </Card>
        </div>
    )
}

export default AdminLogin