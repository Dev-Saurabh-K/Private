import { create } from "zustand";
import { persist } from "zustand/middleware";

const useHistoryStore = create(
  persist(
    (set) => ({
      history_id: null,
      setHistory_id: (history_id) =>
        set((state) => ({ history_id: history_id })),
      unSetHistory_id: () => set(() => ({ history_id: null })),
    }),
    {
      name: "history_group-storage",
    },
  ),
);

export { useHistoryStore };
