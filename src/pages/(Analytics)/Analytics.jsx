import BarChart from "./BarChart";
import LineChart from "./LineChart";
import NavBar from "../(Dashboard)/Navbar";

const Analytics = () => {
  return (
    <div className="font-semibold flex items-center justify-center min-h-screen mb-40 w-screen flex-col bg-slate-50 gap-4 ">
      <NavBar />
      Analytics
      <div className="w-full min-h-screen flex flex-row flex-wrap gap-10 justify-center">
        <div className="w-[40%] h-[50%] border border-slate-300 rounded-md">
          <BarChart />
        </div>
        <div className="w-[40%] h-[50%] border border-slate-300 rounded-md">
          <LineChart />
        </div>
      </div>
    </div>
  );
};

export default Analytics;
