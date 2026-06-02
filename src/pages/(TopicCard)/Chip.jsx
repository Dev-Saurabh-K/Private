const Status = {
  InProgress: ({ children }) => (
    <div className="bg-blue-100 border border-blue-300 text-blue-700 p-1 text-xs h-fit w-fit rounded-md">
      {children}
    </div>
  ),

  Completed: ({ children }) => (
    <div className="bg-green-100 text-green-700 p-2 rounded">
      {children}
    </div>
  ),

  Pending: ({ children }) => (
    <div className="bg-red-100 text-red-700 p-2 rounded">
      {children}
    </div>
  ),
};

export default Status;