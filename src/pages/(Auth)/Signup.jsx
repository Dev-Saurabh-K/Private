import axios from "axios";
import {Link, useNavigate} from "react-router-dom";

import { useState } from "react";


import { toast} from "react-toastify"
import { UserPlus } from "lucide-react"

import Logo from "../(Assets)/Logo"



const Signup = () => {
    const URL = `${import.meta.env.VITE_API_URL}/register`;
    const [username, setUsername] = useState("");
    const [emailid, setEmailid] = useState("");
    const [password, setPassword] = useState("");
    const [studying_at, setStudying_at] = useState("");

    const navigate = useNavigate();

    const handleSignup =async() =>{
      try{
        const response = await axios.post(URL,
            {
              "username":username,
              "emailid":emailid,
              "password":password,
              "studying_at":studying_at

            },
        )
        if(response.data){
          toast.success("Registration Success!")
          navigate("/")
        }else{
          toast.error("Registration failed!")
        }

      }catch(error){
        toast.error(error.message)
      }
        
        
    }

  return (
    <div className="bg-background text-foreground w-full min-h-screen flex items-center justify-center flex-col">

      <div className="flex flex-col justify-center items-center gap-2 text-font-size text-slate-600 ">
        <Logo />
        AI-Powered Personalized Learning
      </div>
      <div className="border border-border p-5 rounded-lg flex justify-center items-center flex-col gap-8 w-10/12 lg:w-1/4">
        <div className="flex items-start flex-col">
          <div className="font-semibold">Create Your Account</div>

          <div className="text-slate-600">
            Start your personalized learning journey today
          </div>
        </div>
        
        <div className="w-full">
          <div className="text-black font-semibold flex flex-col h-15">
            username
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="h-full border "
            />
          </div>
          <div className="text-black font-semibold flex flex-col h-15">
            Email
            <input
              type="text"
              value={emailid}
              onChange={(e) => setEmailid(e.target.value)}
              className="h-full border "
            />
          </div>
          <div className="text-black font-semibold flex flex-col h-15">
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-10 border"
            />
          </div>
          <div className="text-black font-semibold flex flex-col h-15">
            Studying At
            <input
              type="text"
              value={studying_at}
              onChange={(e) => setStudying_at(e.target.value)}
              className="h-full border "
            />
          </div>
        </div>
        <div
          onClick={handleSignup}
          className="w-full h-10 cursor-pointer flex items-center justify-center bg-black text-white rounded-md text-[15px] gap-2"
        >
          <UserPlus className="size-3.75" />
          Sign Up
        </div>
        <div className="flex flex-row gap-2">
          <div className="text-slate-600">Already have an account? </div>
          <Link className="w-fit h-fit" to="/">
            <div className="font-semibold cursor-pointer"> Sign in</div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Signup