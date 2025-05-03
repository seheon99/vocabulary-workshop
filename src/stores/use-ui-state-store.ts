import { create } from "zustand";

type ViewContext = "window" | "dialog";

type Store = {
  viewContext: ViewContext;
  setViewContext: (viewContext: ViewContext) => void;
};

export const useUIStateStore = create<Store>()((set) => ({
  viewContext: "window",
  setViewContext: (viewContext) => set(() => ({ viewContext })),
}));
