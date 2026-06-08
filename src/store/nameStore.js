import { create } from "zustand";
import { persist } from "zustand/middleware";

const useNameStore = create(
  persist(
    (set) => ({
      Sname: null,
      setName: (name) =>
        set((state) => ({ Sname: name })),
      unSetName: () => set(() => ({ Sname: null })),
    }),
    {
      name: "name-storage",
    },
  ),
);

export { useNameStore };
