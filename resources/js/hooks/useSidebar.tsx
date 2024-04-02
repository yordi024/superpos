import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface SidebarStore {
  isOpen: boolean;
  toggle: () => void;
}

export const useSidebar = create<SidebarStore>()(
  persist(
    set => ({
      isOpen: true,
      toggle: () => set(state => ({ isOpen: !state.isOpen })),
    }),
    {
      name: "sidebar",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
