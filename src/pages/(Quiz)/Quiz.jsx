import axios from "axios";
import { useNavigate } from "react-router-dom"

import { useEffect, useState } from "react";
import { useTopicStore } from "../../store/topicStore"
import { useQuizStore } from "../../store/quizStore";
import { useBatchStore } from "../../store/batchStore"

const Quiz = () => {

    const navigate = useNavigate();

    const [questions, setQuestions]= useState([]);
    const batch_id = useBatchStore((state)=>state.batch_id);
    const setBatch_id = useBatchStore((state)=>state.setBatch_id);
    const answers = useQuizStore((state)=> state.answers);
    const setAnswer = useQuizStore((state)=> state.setAnswer);
    const topic_id = useTopicStore((state)=> state.topic_id);
    const topic = useTopicStore((state)=>state.topic);
    const QUIZ_URL = `${import.meta.env.VITE_API_URL}/api/notes/quiz?topic_id=${topic_id}`;
    const SUBMIT_URL = `${import.meta.env.VITE_API_URL}/api/notes/quiz/submit`;
    const access_token = localStorage.getItem("access_token")


    useEffect(()=>{
        const fetchQuiz = async()=>{
            const response = await axios.get(QUIZ_URL,
                {
                    headers:{
                        Authorization: `Bearer ${access_token}`
                    }
                }
            )
            if(response.data){
                setQuestions(response.data);
                setBatch_id(response.data[0].batch_id);
            }
        }
        fetchQuiz();
    },[])

    const handleUpdateArray = async(value, index) =>{
        // setAnswers(prev=>{
        //     const newArr=[...prev];
        //     newArr[index]=value;
        //     return newArr;
        // });
        setAnswer(index, value);
    }

    const handleSubmitQuiz = async()=>{
        console.log(answers)
        const response = await axios.post(SUBMIT_URL,
            {
                batch_id:batch_id,
                chosen_options: answers,
            },
            {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            },
        );
        if(response){
            console.log("quiz submitted!")
            navigate("/topic")
        }
    };
  return (
    <div>
        <div>
            {topic}
            {questions.map((question, i)=>(
                <div key={question.id}>
                    {question.question}
                    <ul>
                        {question.options.map((option, index)=>(
                            <li key={index} className="cursor-pointer w-300" onClick={()=> handleUpdateArray(option, i)}>{option}</li>
                        ))}
                    </ul>
                </div>
            ))}
            <div className="bg-green-400 w-30 h-10" onClick={handleSubmitQuiz}>Submit Quiz</div>
        </div>
    </div>
  )
}

export default Quiz