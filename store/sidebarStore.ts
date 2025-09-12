import { create } from 'zustand';

interface SidebarState {
    active: string;
    setActive: (active: string) => void;
}

export const useSidebarStore = create<SidebarState>((set) => ({
    active: 'feed',
    setActive: (active) => set({ active }),
}));
