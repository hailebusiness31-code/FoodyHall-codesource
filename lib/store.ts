import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FoodyState {
  isAuthed: boolean;
  setAuthed: (v: boolean) => void;

  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
  sidebarWidth: number;
  setSidebarWidth: (w: number) => void;

  weather: number;
  eventImpact: number;
  setWeather: (v: number) => void;
  setEventImpact: (v: number) => void;

  supplyLevel: number;
  setSupplyLevel: (v: number) => void;
  nudgeSupply: () => void;

  rescueTime: number;
  setRescueTime: (v: number) => void;

  commandOpen: boolean;
  setCommandOpen: (v: boolean) => void;
}

export const useFoodyStore = create<FoodyState>()(
  persist(
    (set) => ({
      isAuthed: false,
      setAuthed: (v) => set({ isAuthed: v }),

      sidebarCollapsed: false,
      toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
      sidebarWidth: 240,
      setSidebarWidth: (w) => set({ sidebarWidth: w }),

      weather: 30,
      eventImpact: 20,
      setWeather: (v) => set({ weather: v }),
      setEventImpact: (v) => set({ eventImpact: v }),

      supplyLevel: 64,
      setSupplyLevel: (v) => set({ supplyLevel: v }),
      nudgeSupply: () =>
        set((s) => ({
          supplyLevel: Math.max(
            0,
            Math.min(100, s.supplyLevel + Math.floor(Math.random() * 11) - 5)
          ),
        })),

      rescueTime: 18,
      setRescueTime: (v) => set({ rescueTime: v }),

      commandOpen: false,
      setCommandOpen: (v) => set({ commandOpen: v }),
    }),
    {
      name: "foodyhall-store",
      partialize: (state) => ({
        isAuthed: state.isAuthed,
        sidebarCollapsed: state.sidebarCollapsed,
        sidebarWidth: state.sidebarWidth,
      }),
    }
  )
);
