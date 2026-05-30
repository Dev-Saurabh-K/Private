import axios from "axios";
import {useState, useEffect} from "react"


const History = () => {

  const URL = `${import.meta.env.VITE_API_URL}/api/get/history`;
  const token = localStorage.getItem("access_token");

  const[history, setHistory] = useState([]);

  useEffect(()=>{
    const fetchHistory = async() =>{
      const response = await axios.get(
        URL,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      setHistory(response.data)
    };
    fetchHistory()
  },[])
  
  return (
    <div className="flex items-center justify-center min-h-screen w-screen flex-col">
      History
      <div className="flex flex-col gap-2">
        {history.map((item) => (
          <div key={item.id}>
            <h3>{item.topic_text}</h3>
            <p>{item.subject}</p>
            <p>{item.history_group}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default History