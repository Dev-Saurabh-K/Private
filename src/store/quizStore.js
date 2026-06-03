import { create } from "zustand";
import { persist } from "zustand/middleware"


const useQuizStore = create(
    persist(
        (set)=>({
            answers:[],
            setAnswer: (index, answer) =>
                set((state) => {
                    const answers = [...state.answers];
                    answers[index] = answer;
                    return {answers};
                }),
            removeAnswer: (index) =>
                set((state)=>{
                    const answers = [...state.answers];
                    answers[index] = "";
                    return {answers}
                }),
        }),
        {
            name: "quiz-storage",
        }
    )
)

export {useQuizStore}