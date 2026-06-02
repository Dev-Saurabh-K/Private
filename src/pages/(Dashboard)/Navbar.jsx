import { LogOut, User, ChartBar, Home, FileText } from "lucide-react";
import {NavLink} from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="NAVBAR  items-center flex-row justify-around w-full  py-3 border-b border-b-gray-200 hidden md:flex">
        <div className="LOGO text-2xl font-bold">
          SynaptiQ
          <div className="text-sm font-semibold text-gray-600">
            AI-Powered Personalized Learning
          </div>
        </div>
        <div className="RIGHT PORTION OF NAVBAR flex flex-row gap-10">
          <div className="LEFT OF RPNB flex flex-row gap-6 items-center justify-center">
            <NavLink to="/dashboard" className={({isActive})=>isActive?"bg-black text-white font-medium w-fit h-10 px-3 rounded-md flex flex-row items-center justify-center gap-2 ":"bg-white text-black font-medium w-fit h-10 px-3 rounded-md flex flex-row items-center justify-center gap-2 hover:bg-gray-200"}>
              <Home className="size-4.5" />
              Dashboard
            </NavLink>
            <NavLink to="/notes" className={({isActive})=>isActive?"bg-black text-white font-medium w-fit h-10 px-3 rounded-md flex flex-row items-center justify-center gap-2 ":"bg-white text-black font-medium w-fit h-10 px-3 rounded-md flex flex-row items-center justify-center gap-2 hover:bg-gray-200"}>
              <FileText className="size-4.5" />
              Notes
            </NavLink>
            <NavLink to="/analytics" className={({isActive})=>isActive?"bg-black text-white font-medium w-fit h-10 px-3 rounded-md flex flex-row items-center justify-center gap-2 ":"bg-white text-black font-medium w-fit h-10 px-3 rounded-md flex flex-row items-center justify-center gap-2 hover:bg-gray-200"}>
              <ChartBar className="size-4.5" />
              Analytics
            </NavLink>
          </div>

          <div className="RIGHT OF RPNB flex flex-row items-center justify-center gap-5">
            <div className="text-gray-200 text-4xl">|</div>
            <div className="bg-white text-black font-medium w-fit h-8 px-3 rounded-md flex items-center justify-center gap-2 hover:bg-gray-200">
              <User className="size-4.5" />
              User
            </div>
            <div className="bg-white text-black font-medium w-fit h-8 px-3 rounded-md flex items-center justify-center gap-2 hover:bg-gray-200">
              <LogOut className="size-4.5" />
              Logout
            </div>
          </div>
        </div>
      </div>
  )
}

export default Navbar