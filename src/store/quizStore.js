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
        }),
        {
            name: "quiz-storage",
        }
    )
)

export {useQuizStore}