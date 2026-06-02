import BarChart from "./BarChart";
import NavBar from "../(Dashboard)/Navbar"

const Analytics = () => {
  return (
    <div className="font-semibold flex items-center justify-center min-h-screen mb-40 w-screen flex-col bg-slate-50 gap-4">
      <NavBar/>
      Analytics
      <BarChart/>
    </div>
  )
}

export default Analytics