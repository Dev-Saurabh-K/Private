import { useState, useEffect } from "react";
import { useHistoryStore } from "../../store/historyStore";
import axios from "axios";
import {useNavigate} from "react-router-dom"


//importing globle state 
import { useTopicStore } from "../../store/topicStore"


const Topics = () => {

  const navigate = useNavigate();

  
  const setTopic_id = useTopicStore((state)=> state.setTopic_id);

  const [loading, setLoading]= useState(false);
  const [topics, setTopics] = useState([]);
  const history_group = useHistoryStore((state)=> state.history_id);
  const URL = `${
    import.meta.env.VITE_API_URL
  }/api/get/topic?history_group=${history_group}`;
  const NOTES_URL = `${import.meta.env.VITE_API_URL}/api/generate/notes`;
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

  const handleClickOnTopic = async(topic_id)=>{
    setLoading(true)
    setTopic_id(topic_id);
    const response = await axios.post(NOTES_URL,{
        topic_id:topic_id
      },
      {
        headers:{
          Authorization: `Bearer ${token}`,
        }
      }
    )
      if(response.data.topic_notes){
        setLoading(false)
        console.log(loading)
        navigate("/notes")
      }
    }



  return(
  <div>
    <div>
      {loading&&<div className="size-7 rounded-full bg-red-800">
        loading...
      </div>}
      

      {topics.map((topic)=>(
        <div key={topic.id} className="cursor-pointer" onClick={()=>handleClickOnTopic(topic.id)}>
          {/* <p>{topic.id}</p> */}
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
}

export default Topics;
