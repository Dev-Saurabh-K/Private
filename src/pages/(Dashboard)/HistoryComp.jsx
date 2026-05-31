import { useState, useEffect } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom"



import {useHistoryStore} from "../../store/historyStore"



const HistoryComp = () => {
  const HISTORY_URL = `${import.meta.env.VITE_API_URL}/api/get/history`;
  const token = localStorage.getItem("access_token");

  const [history, setHistory] = useState([]);
  const navigate = useNavigate();

  
  //zustand global states
  const history_id = useHistoryStore((state)=>state.history_id)
  const setHistory_id = useHistoryStore((state)=>state.setHistory_id)
  

  useEffect(() => {
    const fetchHistory = async () => {
      const response = await axios.get(HISTORY_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setHistory(response.data);
    };
    fetchHistory();
  }, []);

  const handleClickOnHistory=(history_group)=>{
    setHistory_id(history_group);
    navigate("/topic");
  }
  return(
  <div className="flex items-center justify-center flex-col gap-2">
    {history.map((item)=>(
        <div key={item.id} className="cursor-pointer" onClick={()=>handleClickOnHistory(item.history_group)}>
            <h2>{item.topic_text}</h2>
            <p>{item.subject}</p>
            <p>{item.history_group}</p>
        </div>
    ))}

  </div>
  );
};

export default HistoryComp;
