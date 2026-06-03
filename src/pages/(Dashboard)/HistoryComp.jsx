import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { FileText } from "lucide-react";
import Chip from "@mui/material/Chip";

import { useHistoryStore } from "../../store/historyStore";
import { useHistoryRefreshStore } from "../../store/historyRefreshToken";

const HistoryComp = () => {
  const HISTORY_URL = `${import.meta.env.VITE_API_URL}/api/get/history`;
  const token = localStorage.getItem("access_token");

  const [history, setHistory] = useState([]);
  const navigate = useNavigate();

  //zustand global states
  const history_id = useHistoryStore((state) => state.history_id);
  const setHistory_id = useHistoryStore((state) => state.setHistory_id);
  const historyRefreshToken = useHistoryRefreshStore(
    (state) => state.historyRefreshToken,
  );

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
  }, [historyRefreshToken]);

  const handleClickOnHistory = (history_group) => {
    setHistory_id(history_group);
    navigate("/topic");
  };
  return (
    <div className="flex items-center justify-center flex-col gap-2 p-4">
      <div className="HEADING flex flex-row gap-2 font-semibold justify-start items-center w-full">
        <div className="h-fit w-fit flex flex-row">
          <FileText className="size-5" />
          <div>Recent Uploads</div>
        </div>
        <div className="bg-black flex items-center justify-center text-white p-2 ml-auto rounded-md hover:bg-slate-800 cursor-pointer">
          History
        </div>
      </div>
      <div className="w-full pb-2">Your latest uploaded files</div>
      <div className="flex flex-col gap-2">
        {history.map((item) => (
          <div
            key={item.id}
            className="cursor-pointer border rounded-md border-slate-300 w-full hover:bg-slate-200 h-full p-4 text-xs flex flex-col 2xl:flex-row max-h-25"
            onClick={() => handleClickOnHistory(item.history_group)}
          >
            <p className="2xl:text-[1.5em] text-xs  2xl:line-clamp-2">{item.topic_text}</p>
            <div className="h-fit w-fit flex flex-row gap-2 items-center justify-center pt-1">
              <Chip label={item.subject} color="primary" variant="outlined" />
              <Chip label={item.history_group} size="small" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryComp;
