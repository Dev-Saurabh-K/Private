import { useState, useEffect } from "react";
import { useHistoryStore } from "../../store/historyStore";
import axios from "axios";
import {useNavigate} from "react-router-dom"


const Topics = () => {

  const [topics, setTopics] = useState([]);
  const history_group = useHistoryStore((state)=> state.history_id);
  const URL = `${
    import.meta.env.VITE_API_URL
  }/api/get/topic?history_group=${history_group}`;
  const token = localStorage.getItem("access_token")

  useEffect(()=>{
    const fetchTopics = async()=>{
      const response = await axios.get(URL,{
        headers:{
          Authorization: `Bearer ${token}`,
        },
      });
      setTopics(response.data);
    };
    fetchTopics();
  },[history_group])

  return(
  <div>
    <div>
      {topics.map((topic)=>(
        <div key={topic.id} className="cursor-pointer">
          <h2>
            {topic.topic_text}
          </h2>
          <p>
            {topic.subject}
          </p>
        </div>
      ))}
    </div>
  </div>
  )
};

export default Topics;
