import { Link } from "react-router-dom";

import UploadPDF from "./UploadPDF";
import HistoryComp from "./HistoryComp";
import { LogOut, User, ChartBar, Home, FileText, Send } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="min-h-screen w-screen flex items-center justify-center flex-col bg-slate-50 gap-4">
      <div className="NAVBAR flex items-center flex-row justify-around w-full  py-3 border-b border-b-gray-200">
        <div className="LOGO text-2xl font-bold">
          SynaptiQ
          <div className="text-sm font-semibold text-gray-600">
            AI-Powered Personalized Learning
          </div>
        </div>
        <div className="RIGHT PORTION OF NAVBAR flex flex-row gap-10">
          <div className="LEFT OF RPNB flex flex-row gap-6 items-center justify-center">
            <div className="bg-black text-white font-medium w-fit h-10 px-3 rounded-md flex items-center justify-center gap-2">
              <Home className="size-4.5" />
              Dashboard
            </div>
            <div className="bg-white text-black font-medium w-fit h-10 px-3 rounded-md flex items-center justify-center gap-2 hover:bg-gray-200">
              <FileText className="size-4.5" />
              Notes
            </div>
            <div className="bg-white text-black font-medium w-fit h-10 px-3 rounded-md flex items-center justify-center gap-2 hover:bg-gray-200">
              <ChartBar className="size-4.5" />
              Analytics
            </div>
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

      <div className="RESUME BUTTON">
        <div className="font-bold">Hi, User</div>
        <div className="w-fit p-5 rounded-md h-16 bg-black text-white hover:bg-slate-950 flex items-center justify-center gap-3">
          Resume where left off <Send />
        </div>
      </div>
      <div className="flex flex-row flex-wrap gap-8 items-center justify-center h-[90vh] w-screen">
        <div className="lg:w-1/3 w-10/12 lg:h-1/2 border border-slate-300 rounded-md flex items-center justify-center">
          <UploadPDF />
        </div>
        {/* <Link to="/History" className="w-fit h-fit"> */}
        <div className="lg:w-1/3 w-10/12 lg:h-1/2 border border-slate-300 rounded-md flex items-center justify-center overflow-y-auto hide-scrollbar p-6">
          <HistoryComp />
        </div>
        {/* </Link> */}
        <div className="lg:w-1/3 w-10/12 lg:h-1/2 border border-slate-300 rounded-md flex items-center justify-center">Daily Login</div>
        <Link to="/Analytics" className="lg:w-1/3 w-10/12 lg:h-1/2 border border-slate-300 rounded-md flex items-center justify-center">
          <div className="">Analytics</div>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
