import { create } from "zustand";

const useZustandStore = create((set, get) => ({
  count: 0,
  text: "",
  items: [],
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  resetCount: () => set({ count: 0 }),
  setText: (text) => set({ text }),
  addItem: (label) =>
    set((state) => ({
      items: [...state.items, { id: Date.now(), label }],
    })),
  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),
  incrementByItems: () => set((state) => ({ count: state.count + get().items.length })),
  resetAll: () => set({ count: 0, text: "", items: [] }),
}));

export default useZustandStore;
