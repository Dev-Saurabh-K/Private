import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import {  toast } from "react-toastify";
import { LogIn } from "lucide-react";

import Logo from "../(Assets)/Logo";
import {useNameStore} from "../../store/nameStore";
import axios from "axios";


function Login() {
  // const toggletheme = () =>{
  //   document.documentElement.classList.toggle("dark");
  // }

  const setName = useNameStore((state)=>state.setName);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const URL = `${import.meta.env.VITE_API_URL}/login`;
  const DATAURL = `${import.meta.env.VITE_API_URL}/protected/user/me`
  const navigate = useNavigate();

  const submitLogin = async () => {
    try {
      const formData = new URLSearchParams();
      formData.append("username", username);
      formData.append("password", password);

      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData,
      });
      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("access_token", data.access_token);

        ///chnage afterwards
        try{
          const fetchUserData = await axios.get(DATAURL,
            {
              headers:{
                Authorization: `Bearer ${localStorage.getItem("access_token")}`
              }
            }
          )
          // console.log(fetchUserData.data)
          setName(fetchUserData.data.username);
        }catch(error){
          console.log("nameerror:",error)
        }



        navigate("/dashboard");
      } else {
        toast.error(`Error: ${response.status}, ${response.statusText}`);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="bg-background text-foreground w-full min-h-screen flex items-center justify-center flex-col">
      

      <div className="flex flex-col justify-center items-center gap-2 text-font-size text-slate-600 ">
        <Logo />
        AI-Powered Personalized Learning
      </div>
      <div className="border border-border p-5 rounded-lg flex justify-center items-center flex-col gap-8 w-10/12 lg:w-1/4">
        <div className="flex items-start flex-col">
          <div className="font-semibold text-start">Welcome Back</div>

          <div className="text-slate-600">
            Sign in to continue your learning journey
          </div>
        </div>
        <div className="w-full">
          <div className="text-black font-semibold flex flex-col h-15">
            Username
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
        </div>
        <div
          onClick={submitLogin}
          className="w-full h-10 cursor-pointer flex items-center justify-center bg-black text-white rounded-md text-[15px] gap-2 hover:bg-slate-950"
        >
          <LogIn className="size-3.75" />
          Sign In
        </div>
        <div className="flex flex-row gap-2">
          <div className="text-slate-600">Don't have an account?</div>
          <Link className="w-fit h-fit" to="/signup">
            <div className="font-semibold cursor-pointer"> Sign up</div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
