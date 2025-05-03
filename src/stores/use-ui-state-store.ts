import { create } from "zustand";

export type ViewContext = "screen" | "dialog";

type Store = {
  viewContext: ViewContext;
  setViewContext: (viewContext: ViewContext) => void;
};

export const useUIStateStore = create<Store>()((set) => ({
  viewContext: "screen",
  setViewContext: (viewContext) => set(() => ({ viewContext })),
}));
