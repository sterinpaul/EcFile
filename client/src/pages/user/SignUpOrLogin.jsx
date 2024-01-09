import { useState } from "react";
import LoginForm from "../../components/user/LoginForm";
import SignUpForm from "../../components/user/SignUpForm";
import {
  Card
} from "@material-tailwind/react";
   
  const SignUpOrLogin = ()=>{
    const [signIn,setSignIn] = useState(true)
    return (
        <div className="h-screen flex items-center justify-center">
          <Card className="p-4 shadow-2xl shadow-blue-gray-500">
          {signIn ? 
            <>
            <LoginForm/>
            <button className="mt-2">
              Don't have an account ?
              <span onClick={()=>setSignIn(!signIn)} className="ml-1 text-blue-500 transition-colors hover:text-blue-700">Sign up</span>
            </button>
            </>
             : 
            <>
            <SignUpForm setSignIn={setSignIn}/>
            <button className="mt-2">
              Already have an account ?
              <span onClick={()=>setSignIn(!signIn)} className="ml-1 text-blue-500 transition-colors hover:text-blue-700">Login</span>
            </button>
            </>
            }
            </Card>
        </div>
    )
  }

export default SignUpOrLogin;