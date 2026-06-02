import { useState, useEffect } from "react";
import { useHistoryStore } from "../../store/historyStore";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { BookOpen } from "lucide-react";
import CircularProgress from '@mui/material/CircularProgress';

import Navbar from "../(Dashboard)/Navbar";
import Status from "./Chip";

//importing globle state
import { useTopicStore } from "../../store/topicStore";

const Topics = () => {
  const navigate = useNavigate();

  const setTopic_id = useTopicStore((state) => state.setTopic_id);
  const setTopic = useTopicStore((state) => state.setTopic);

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
    setLoading(true);
    setTopic_id(topic_id);
    const response = await axios.post(
      NOTES_URL,
      {
        topic_id: topic_id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (response.data.topic_notes) {
      setLoading(false);
      navigate("/notes");
    }
  };
  const handleClickOnQuiz = async (topic_id, topic) => {
    setLoading(true);
    setTopic_id(topic_id);
    setTopic(topic);
    const QUIZ_URL = `${
      import.meta.env.VITE_API_URL
    }/api/notes/quiz?topic_id=${topic_id}`;
    const response = await axios.get(QUIZ_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.data) {
      setLoading(false);
      navigate("/quiz");
    }
  };

  return (
    <div className="min-h-screen mb-40 w-screen flex items-center justify-center flex-col bg-slate-50 gap-4 text-black ">
      <Navbar />
      
      {/* <CircularProgress aria-label="Loading…" color="inherit" className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 inset-0 "/> */}
      <div className="flex flex-wrap gap-4 bg-slate-50 items-center justify-center p-4 h-full w-full">
        {topics.map((topic) => (
          <div
            key={topic.id}
            className="border border-slate-300 rounded-md p-6 w-10/12 lg:w-1/4 h-fit md:h-60 flex flex-col gap-1 relative"
          >
            {loading && (
              // for progress in everycard
        // <CircularProgress aria-label="Loading…" color="inherit" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"/>
                <CircularProgress aria-label="Loading…" color="inherit" className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"/>

      )}
            {/* <p>{topic.id}</p> */}
            <h2 className=" ">{topic.topic_text}</h2>
            <p className="border border-slate-300 w-fit rounded-md p-1 text-sm">{topic.subject}</p>
            {/* <p className="border border-slate-300 w-fit rounded-md p-1 text-sm">Pending</p> */}
            <Status.InProgress>In Progress</Status.InProgress>
            <div className="flex flex-row justify-around items-center mt-auto">
              <div
                className=" h-10 bg-slate-900 cursor-pointer hover:bg-slate-950 text-white font-semibold flex items-center justify-center flex-row text-[15px] gap-2 rounded-md w-9/12 "
                onClick={() => handleClickOnTopic(topic.id)}
              >
                <BookOpen className="size-3.75" />
                Read Notes
              </div>
              <div
                className="w-2/12 h-10 bg-slate-50 text-slate-950 border border-slate-300 rounded-md cursor-pointe flex justify-center items-center cursor-pointer"
                onClick={() => handleClickOnQuiz(topic.id, topic.topic_text)}
              >
                Quiz
              </div>
            </div>
          </div>
        ))}
      </div>
      
      
    </div>
  );
};

export default Topics;
