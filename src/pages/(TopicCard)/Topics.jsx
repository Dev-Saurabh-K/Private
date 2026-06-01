import { useState, useEffect } from "react";
import { useHistoryStore } from "../../store/historyStore";
import axios from "axios";
import { useNavigate } from "react-router-dom";

//importing globle state
import { useTopicStore } from "../../store/topicStore";

const Topics = () => {
  const navigate = useNavigate();

  const setTopic_id = useTopicStore((state) => state.setTopic_id);
  const setTopic = useTopicStore((state)=> state.setTopic);

  const [loading, setLoading] = useState(false);
  const [topics, setTopics] = useState([]);
  const history_group = useHistoryStore((state) => state.history_id);
  const URL = `${
    import.meta.env.VITE_API_URL
  }/api/get/topic?history_group=${history_group}`;
  const NOTES_URL = `${import.meta.env.VITE_API_URL}/api/generate/notes`;
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    const fetchTopics = async () => {
      const response = await axios.get(URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTopics(response.data);
    };
    fetchTopics();
  }, [history_group]);

  const handleClickOnTopic = async (topic_id) => {
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
        navigate("/notes")
      }
  };
  const handleClickOnQuiz = async (topic_id, topic)=>{
    setLoading(true);
    setTopic_id(topic_id);
    setTopic(topic);
    const QUIZ_URL = `${import.meta.env.VITE_API_URL}/api/notes/quiz?topic_id=${topic_id}`;
    const response = await axios.get(QUIZ_URL,
      {
        headers:{
          Authorization: `Bearer ${token}`,
        }
      }
    )
    if(response.data){
      setLoading(false);
      navigate("/quiz");
    }
  }

  return (
    <div className="min-h-screen w-full flex flex-wrap gap-4 bg-amber-200 items-center justify-center ">
      
        {loading && (
          <div className="size-10 rounded-full bg-red-800 fixed top-0 left-0">loading...</div>
        )}
      

      {topics.map((topic) => (
        <div
          key={topic.id}
          className="bg-blue-300 w-100 h-50 "
        >
          {/* <p>{topic.id}</p> */}
          <h2>{topic.topic_text}</h2>
          <p>{topic.subject}</p>
          <div className="w-40 h-10 bg-pink-400 cursor-pointer" onClick={() => handleClickOnTopic(topic.id)}>Read Notes</div>
          <div className="w-20 h-10 bg-blue-700 cursor-pointer" onClick={()=>handleClickOnQuiz(topic.id, topic.topic_text)}>Quiz</div>
        </div>
      ))}
    </div>
  );
};

export default Topics;
