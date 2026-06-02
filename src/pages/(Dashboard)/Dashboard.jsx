import { Link } from "react-router-dom";

import UploadPDF from "./UploadPDF";
import HistoryComp from "./HistoryComp";
import Navbar from "./Navbar";
import { Send } from "lucide-react";

import BarChart from "../(Analytics)/BarChart";
import { GitHubCalendar } from 'react-github-calendar';

// import LoginRecord from "../(UserProfile)/LoginRecord";

const Dashboard = () => {
  return (
    <div className="min-h-screen mb-40 w-screen flex items-center justify-center flex-col bg-slate-50 gap-4">
      <Navbar/>

      <div className="RESUME BUTTON">
        <div className="font-bold">Hi, User</div>
        <div className="w-fit p-5 rounded-md h-16 bg-slate-800 text-white hover:bg-slate-950 flex items-center justify-center gap-3 cursor-pointer ">
          Resume where left off <Send />
        </div>
      </div>
      <div className="flex flex-row flex-wrap gap-8 items-center justify-center h-[90vh] w-screen">
        <div className="lg:w-1/3 w-10/12 lg:h-1/2 border border-slate-300 rounded-md flex items-center justify-center">
          <UploadPDF />
        </div>
        {/* <Link to="/History" className="w-fit h-fit"> */}
        <div className="lg:w-1/3 w-10/12 lg:h-1/2 border border-slate-300 rounded-md flex items-center justify-center p-6">
          <HistoryComp />
        </div>
        {/* </Link> */}
        <div className="lg:w-1/3 w-10/12 lg:h-1/2 border border-slate-300 rounded-md flex items-center justify-center flex-col p-8 hide-scrollbar overflow-x-auto hide-scrollbar::-webkit-scrollbar">
          Daily Login
          <GitHubCalendar username="dev-saurabh-k" className="overflow-hidden hide-scrollbar hide-scrollbar::-webkit-scrollbar"/>
        </div>
        <Link className="lg:w-1/3 w-10/12 lg:h-1/2 border border-slate-300 rounded-md flex items-center justify-center ">
          {/* for further integration with backend */}
          <div className="font-semibold w-full p-8 flex flex-col items-center justify-center cursor-not-allowed h-full">
            Analytics
            <BarChart />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
