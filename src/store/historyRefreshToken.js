

import { create } from "zustand";

const useHistoryRefreshStore = create((set) => ({
    historyRefreshToken:1,
    sethrt: () => set((state)=> ({historyRefreshToken: state.historyRefreshToken + 1})),
}))


export {useHistoryRefreshStore}