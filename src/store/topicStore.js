import { create } from "zustand";
import { persist } from "zustand/middleware";

const useTopicStore = create(
    persist(
        (set)=>({
            topic_id: null,
            topic: null,
            setTopic: (topic)=>
                set((state)=>({topic: topic})),
            unSetTopic: ()=> set(()=>({topic: null})),
            setTopic_id: (topic_id)=>
                set((state)=>({ topic_id: topic_id})),
            unSetTopic_id: ()=> set(()=>({topic_id: null}))
        }),
        {
            name: "topic_id-storage",
        },
    ),
);

export { useTopicStore };