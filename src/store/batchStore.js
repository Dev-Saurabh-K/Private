import { create } from "zustand";
import { persist } from "zustand/middleware";

const useBatchStore = create(
  persist(
    (set) => ({
      batch_id: null,
      setBatch_id: (batch_id) =>
        set((state) => ({ batch_id: batch_id })),
      unSetBatch_id: () => set(() => ({ batch_id: null })),
    }),
    {
      name: "batch_group-storage",
    },
  ),
);

export { useBatchStore };
