
const attendance = [
  true, false, true, true, true, false, true,
  true, true, false, true, true, true, true,
  false, true, true, false, true, true, true,
  false, true, true, false, true, true, true,
  false, true, 
];

const LoginRecord = () => {
  return (
    <div className=" w-full h-full p-8">
        <div className="border border-slate-300 w-full h-full rounded-md">
            <div className="font-semibold text-black p-2 text-center">
                JUNE
            </div>
            <div className="flex flex-col flex-wrap h-full gap-1 p-2">
                
  {attendance.map((present, index) => (
    <div
      key={index}
      className={` h-1/5 aspect-square rounded-sm ${
        present ? "bg-green-500" : "bg-white"
      }`}
      title={present ? "Present" : "Absent"}
    />
  ))}
</div>
        </div>
    </div>
  )
}

export default LoginRecord