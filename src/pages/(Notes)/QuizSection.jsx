import { BookOpen } from 'lucide-react';
import { useNavigate } from "react-router-dom";
const QuizSection = ({handleClickOnQuiz}) => {
    
  return (
    <div className="flex flex-col border border-slate-300 md:p-5 p-2 gap-4 rounded-md">
        <div className="flex flex-row font-semibold gap-2"><div><BookOpen/></div>Ready to Test Your Knowledge?</div>
        <div>Take a quiz to assess your understanding of this topic.</div>
        <div className="bg-slate-950 text-slate-50 font-semibold rounded-md py-2 px-3 w-fit h-fit cursor-pointer hover:bg-slate-800" onClick={handleClickOnQuiz}>Start Quiz</div>
    </div>
  )
}

export default QuizSection