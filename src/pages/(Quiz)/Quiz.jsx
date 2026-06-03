import axios from "axios";
import { useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import { useTopicStore } from "../../store/topicStore";
import { useQuizStore } from "../../store/quizStore";
import { useBatchStore } from "../../store/batchStore";

import { ArrowLeft } from "lucide-react";

import Navbar from "../(Dashboard)/Navbar";
import CircularProgress from '@mui/material/CircularProgress';

const Quiz = () => {
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const batch_id = useBatchStore((state) => state.batch_id);
  const setBatch_id = useBatchStore((state) => state.setBatch_id);
  const answers = useQuizStore((state) => state.answers);
  const setAnswer = useQuizStore((state) => state.setAnswer);
  const removeAnswer = useQuizStore((state) => state.removeAnswer);
  const topic_id = useTopicStore((state) => state.topic_id);
  const topic = useTopicStore((state) => state.topic);
  const QUIZ_URL = `${
    import.meta.env.VITE_API_URL
  }/api/notes/quiz?topic_id=${topic_id}`;
  const SUBMIT_URL = `${import.meta.env.VITE_API_URL}/api/notes/quiz/submit`;
  const access_token = localStorage.getItem("access_token");

  useEffect(() => {
    const fetchQuiz = async () => {
      setLoading(true);
      const response = await axios.get(QUIZ_URL, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      if (response.data) {
        setQuestions(response.data);
        setBatch_id(response.data[0].batch_id);
      }
    };
    fetchQuiz();
    setLoading(false);
  }, []);

  const handleUpdateArray = async (value, i) => {
    // setAnswers(prev=>{
    //     const newArr=[...prev];
    //     newArr[index]=value;
    //     return newArr;
    // });
    setAnswer(i, value);
    // console.log(answers[i])
    // console.log(index)
  };

  const handleClear = async (i) => {
    removeAnswer(i);
  };

  const handleSubmitQuiz = async () => {
    // console.log(answers);
    if(submitted){
        navigate("/notes")
        return;
    }
    const response = await axios.post(
      SUBMIT_URL,
      {
        batch_id: batch_id,
        chosen_options: answers,
      },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      },
    );
    if (response) {
        setSubmitted(true);
    //   console.log("quiz submitted!");
      checkScore();
      //   navigate("/topic");
    }
  };

  const checkScore = ()=>{
    if(submitted){
        let total =0;
        for (let i = 0; i < questions.length; i++){
            if(questions[i].chosen_answer == questions[i].answer){
                total++
            }
            
        }
        setScore(total)
    }
  }

  return (
    <div className="min-h-screen mb-40 w-screen flex items-center justify-center flex-col bg-slate-50 gap-4 px-2">
      <Navbar />
      {loading && <CircularProgress aria-label="Loading…" className="absolute z-10 top-1/2 left-1/2"/>}
      <div className="flex flex-col gap-5 ">
        <div
          className="BACK BUTTON flex flex-row items-center justify-start text-[16px] rounded-md hover:bg-slate-200 w-fit px-2 py-2 cursor-pointer h-fit gap-5 font-semibold"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="size-4" />
          Back to Topics
        </div>
        <div className="text-2xl font-semibold">{topic}</div>
        <div className="text-slate-700">Answer all 10 questions below</div>

        {submitted && (<div className="p-5 w-full h-fit flex flex-col items-center justify-center rounded-md font-semibold text-xl bg-slate-300"><div>Quiz Completed!</div><div className="text-2xl">{(score*100)/10}%</div></div>)}

        {questions.map((question, i) => (
          <div
            key={question.id}
            className={`rounded-md lg:p-4 p-2 gap-5 mb-4 h-fit border ${
              submitted
                ? answers[i] === question.answer
                  ? "border-green-500 bg-green-50"
                  : "border-red-500 bg-red-50"
                : "border-slate-300"
            }`}
          >
            <div className="flex flex-row gap-10 items-center">
              <div className="mb-4 font-bold flex gap-8">
                Q{i + 1 + " "}. {question.question}
                <div
                  onClick={() => handleClear(i)}
                  className="text-red-900 border-2 border-red-300 hover:bg-red-400 h-fit w-fit px-1  rounded-sm cursor-pointer flex items-center justify-center"
                >
                  clear
                </div>
              </div>
            </div>

            <ul className="flex flex-col gap-3 font-medium">
              {question.options.map((option, index) => (
                <li
                  key={index}
                  className={`cursor-pointer w-full p-1 lg:p-2 rounded-md lg:px-8 border ${
                    answers[i] === option
                      ? "border-blue-600 bg-blue-50"
                      : "border-slate-300"
                  }`}
                  onClick={() => handleUpdateArray(option, i)}
                >
                  {option}
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div
          className="bg-slate-800 hover:bg-slate-900 cursor-pointer w-full h-10 flex items-center justify-center rounded-md text-slate-50 font-semibold"
          onClick={handleSubmitQuiz}
        >
            {submitted?`Return to Notes`:`Submit Quiz`}
          
        </div>
      </div>
    </div>
  );
};

export default Quiz;
