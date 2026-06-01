import { useEffect, useState } from "react";
import { useTopicStore } from "../../store/topicStore"
import axios from "axios";

import {} from "../../store/topicStore";

const Quiz = () => {

    const [questions, setQuestions]= useState([]);
    const [answers, setAnswers] = useState([]);
    const topic_id = useTopicStore((state)=> state.topic_id);
    const topic = useTopicStore((state)=>state.topic);
    const QUIZ_URL = `${import.meta.env.VITE_API_URL}/api/notes/quiz?topic_id=${topic_id}`;
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
                setQuestions(response.data)
            }
        }
        fetchQuiz();
    },[])

    const handleSubmitQuiz = async() =>{

    }
  return (
    <div>
        <div>
            {topic}
            {questions.map((question)=>(
                <div key={question.id}>
                    {question.question}
                    <ul>
                        {question.options.map((option, index)=>(
                            <li key={index}>{option}</li>
                        ))}
                    </ul>
                </div>
            ))}
            <div className="bg-green-400 w-30 h-10">Submit Quiz</div>
        </div>
    </div>
  )
}

export default Quiz