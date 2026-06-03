import { LogOut, User, ChartBar, Home, FileText } from "lucide-react";
import {NavLink, useNavigate} from 'react-router-dom';
import {useTopicStore} from '../../store/topicStore'

const Navbar = ({pathname}) => {

  // const { pathname } = useLocation();
  // console.log(pathname)
  const navigate = useNavigate();
  const topic_id = useTopicStore((state)=> state.topic_id);

  const activeUrls = ["/topic", "/notes"];
  const handleLogout = () =>{
    localStorage.removeItem("access_token");
    if(!localStorage.getItem("access_token")){
      navigate("/login");
    }
  }
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
            {topic_id?<NavLink to="/topic" className={({isActive})=>isActive || activeUrls.includes(pathname)?"bg-black text-white font-medium w-fit h-10 px-3 rounded-md flex flex-row items-center justify-center gap-2 ":"bg-white text-black font-medium w-fit h-10 px-3 rounded-md flex flex-row items-center justify-center gap-2 hover:bg-gray-200"}>
              <FileText className="size-4.5" />
              Notes
            </NavLink>:<div className="bg-white text-black font-medium w-fit h-10 px-3 rounded-md flex flex-row items-center justify-center gap-2 hover:bg-gray-200 cursor-not-allowed"><FileText className="size-4.5" />Notes</div>}
            
            <NavLink to="/analytics" className={({isActive})=>isActive?"bg-black text-white font-medium w-fit h-10 px-3 rounded-md flex flex-row items-center justify-center gap-2 ":"bg-white text-black font-medium w-fit h-10 px-3 rounded-md flex flex-row items-center justify-center gap-2 hover:bg-gray-200"}>
              <ChartBar className="size-4.5" />
              Analytics
            </NavLink>
          </div>

          <div className="RIGHT OF RPNB flex flex-row items-center justify-center gap-5">
            <div className="text-gray-200 text-4xl">|</div>
            <div className="bg-white text-black font-medium w-fit h-8 px-3 rounded-md flex items-center justify-center gap-2 hover:bg-gray-200 cursor-not-allowed">
              <User className="size-4.5" />
              User
            </div>
            <div className="bg-white text-black font-medium w-fit h-8 px-3 rounded-md flex items-center justify-center gap-2 hover:bg-gray-200 cursor-pointer" onClick={handleLogout}>
              <LogOut className="size-4.5" />
              Logout
            </div>
          </div>
        </div>
      </div>
  )
}

export default Navbar