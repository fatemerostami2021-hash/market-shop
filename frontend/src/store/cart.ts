'use client'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem { id: number; name: string; price: number; image: string; qty: number }
interface CartState {
  items: CartItem[]
  add: (i: Omit<CartItem, 'qty'>) => void
  setQty: (id: number, qty: number) => void
  remove: (id: number) => void
  clear: () => void
}

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      add: (i) => set((s) => {
        const ex = s.items.find((x) => x.id === i.id)
        return { items: ex ? s.items.map((x) => (x.id === i.id ? { ...x, qty: x.qty + 1 } : x)) : [...s.items, { ...i, qty: 1 }] }
      }),
      setQty: (id, qty) => set((s) => ({ items: qty <= 0 ? s.items.filter((x) => x.id !== id) : s.items.map((x) => (x.id === id ? { ...x, qty } : x)) })),
      remove: (id) => set((s) => ({ items: s.items.filter((x) => x.id !== id) })),
      clear: () => set({ items: [] }),
    }),
    { name: 'kimia-cart' }
  )
)
