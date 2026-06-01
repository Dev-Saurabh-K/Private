import { create } from "zustand";
import { persist } from "zustand/middleware";

const useNotesStore = create(
    persist(
        (set)=>({
            
            notes: null,
            setNotes: (notes)=>
                set((state)=>({notes: notes})),
            unSetNotes: ()=> set(()=>({notes: null})),
        }),
        {
            name: "notes_id-storage",
        },
    ),
);

export { useNotesStore };