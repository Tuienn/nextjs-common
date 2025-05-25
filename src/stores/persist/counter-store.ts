import { create } from 'zustand'
import { persist, PersistOptions } from 'zustand/middleware'
import { createJSONStorage } from 'zustand/middleware'

interface AppState {
  count: number
  increment: () => void
  decrement: () => void
}

type PersistAppState = PersistOptions<AppState>

export const UseCounterStore = create<AppState>()(
  persist(
    (set) => ({
      count: 0,
      increment: () => set((state) => ({ count: state.count + 1 })),
      decrement: () => set((state) => ({ count: state.count - 1 }))
    }),
    {
      name: 'app-storage',
      storage: createJSONStorage(() => localStorage),
      skipHydration: true
    } as PersistAppState
  )
)
