import { useState, useEffect } from "react";
import axios from "axios";
import Chat from "./Chat";
import Navbar from "../(Dashboard)/Navbar";
import QuizSection from "./QuizSection";
import { ArrowLeft } from "lucide-react";
import KeywordCard from "./KeywordCard";
import { useNavigate } from "react-router-dom"

import HighlightedNotes from "./HighlightedNotes";

import { useTopicStore } from "../../store/topicStore";

const Notes = () => {
  const [modelOpen, setModelOpen] = useState(false);
  const topic_id = useTopicStore((state) => state.topic_id);
  // const setTopic = useTopicStore((state)=>state.setTopic);
  const setTopic_id = useTopicStore((state)=>state.setTopic_id);
  const navigate = useNavigate();
  const URL = `${
    import.meta.env.VITE_API_URL
  }/api/retrieve/notes?topic_id=${topic_id}`;
  const SURL = `${import.meta.env.VITE_API_URL}/api/generate/subnotes`;

  const token = localStorage.getItem("access_token");

  const [notes, setNotes] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [response, setResponse] = useState({});

  useEffect(() => {
    const fetchNotes = async () => {
      // console.log(topic_id)
      const response = await axios.get(URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNotes(response.data);
      // setKeyword(response.data)
    };
    fetchNotes();
  }, [topic_id]);

  const passModelInfo = async (keyword, context) => {
    setModelOpen(true);
    setKeyword(keyword);
    const res = await axios.post(
      SURL,
      {
        "keyword": keyword,
        "context": context,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    setResponse(res.data);
  };

  const handleClickOnQuiz = () =>{
    setTopic_id(topic_id);
    // setTopic(topic);
    navigate("/quiz");
  }

  return (
    <div className="min-h-screen mb-40 w-screen flex items-center justify-center flex-col bg-slate-50 gap-4">
      <Navbar pathname={"/notes"} />
      <div className="px-5 w-screen h-full flex md:flex-row flex-col justify-center items-center">
        <div
          key={notes.id}
          className=" md:p-5 p-1 flex flex-col gap-4 md:gap-8 md:w-8/12 "
        >
          <KeywordCard
            modelOpen={modelOpen}
            setModelOpen={setModelOpen}
            keyword={keyword}
            response={response}
          />
          <div className="BACK BUTTON flex flex-row items-center justify-start text-[16px] rounded-md hover:bg-slate-200 w-fit px-2 py-2 cursor-pointer h-fit gap-3 font-semibold"
          onClick={()=>navigate(-1)}>
            <ArrowLeft className="size-4" />
            Back to Topics
          </div>
          <h2 className="font-semibold md:text-2xl">{notes.topic_text}</h2>
          {/* {notes.topic_notes} */}
          <div className="border md:p-5 p-1 rounded-md text-lg">
            <HighlightedNotes text={notes.topic_notes} words={notes.keywords} />
          </div>

          {/* {console.log(notes.keywords)} */}
          {/* {keywords} */}
          <div className="flex flex-col gap-4">
            <h4 className="font-semibold text-xl">keywords</h4>
            <div className="flex flex-wrap gap-2">
              {notes?.keywords?.map((keyword, index) => (
                <div
                  key={index}
                  className="flex bg-red-200 w-fit px-3 py-1 rounded-md border-2 hover:border-2 hover:border-red-400 hover:w-fit cursor-pointer"
                  onClick={() => passModelInfo(keyword, notes.topic_notes)}
                >
                  {keyword}
                </div>
              ))}

            </div>
              <QuizSection handleClickOnQuiz={handleClickOnQuiz}/>
          </div>
        </div>

        <div className=" md:w-2/8 w-full md:min-h-10/12 h-screen">
          <Chat topic={notes.topic_text} />
        </div>
      </div>
    </div>
  );
};

export default Notes;
