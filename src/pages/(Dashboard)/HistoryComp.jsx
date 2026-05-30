import { useState, useEffect } from "react";
import axios from "axios";

const HistoryComp = () => {
  const HISTORY_URL = `${import.meta.env.VITE_API_URL}/api/get/history`;
  const token = localStorage.getItem("access_token");

  const [history, setHistory] = useState([]);

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
  return(
  <div className="flex items-center justify-center flex-col gap-2">
    {history.map((item)=>(
        <div key={item.id}>
            <h2>{item.topic_text}</h2>
            <p>{item.subject}</p>
            <p>{item.history_group}</p>
        </div>
    ))}
  </div>
  );
};

export default HistoryComp;
