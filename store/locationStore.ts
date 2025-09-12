import { create } from 'zustand';

interface LocationState {
    location: string | null;
    setLocation: (location: string) => void;
}

export const useLocationStore = create<LocationState>((set) => ({
    location: null,
    setLocation: (location) => set({ location }),
}));
