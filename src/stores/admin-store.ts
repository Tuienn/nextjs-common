import { create } from 'zustand'

type State = {
  filterSearch: any
  id: string | null | undefined
  idDelete: string | undefined
}

type Action = {
  setFilterSearch: (filter: any) => void
  resetFilterSearch: () => void
  setId: (id: string | null | undefined) => void
  resetId: () => void
  setIdDelete: (idDelete: string | undefined) => void
}

const initialState: State = {
  filterSearch: {},
  id: undefined,
  idDelete: undefined
}

const UseAdminStore = create<State & Action>((set) => ({
  ...initialState,
  setFilterSearch: (filter: any) => set({ filterSearch: filter }),
  resetFilterSearch: () => set({ filterSearch: {} }),
  setId: (id: string | null | undefined) => set({ id }),
  resetId: () => set({ id: undefined }),
  setIdDelete: (idDelete: string | undefined) => set({ idDelete })
}))

export default UseAdminStore
