
import { Link } from "react-router-dom";


import UploadPDF from "./UploadPDF";
import HistoryComp from "./HistoryComp";

const Dashboard = () => {
  

  return (
    <div className="min-h-screen w-screen flex items-center justify-center flex-col">
      <div className="flex items-center bg-amber-400 flex-row justify-around">
        <div>hi User, </div>
        <div>Dashboard</div>
        <Link to="/profile" className="h-fit w-fit">
          <div className="flex items-center justify-center fixed right-2 top-2 bg-amber-600 rounded-full size-10">
            Profile
          </div>
        </Link>
      </div>
      <div className="flex flex-row flex-wrap gap-2 items-center justify-center">
        <div className="size-125 bg-blue-300">Resume where left off</div>
        <div className="size-125 bg-blue-400"><UploadPDF/></div>
        {/* <Link to="/History" className="w-fit h-fit"> */}
          <div className="size-125 bg-blue-500">
            <HistoryComp/>
          </div>
        {/* </Link> */}
        <div className="size-125 bg-blue-600">Daily Login</div>
        <Link to="/Analytics" className="w-fit h-fit">
          <div className="size-125 bg-blue-700">Analytics</div>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
