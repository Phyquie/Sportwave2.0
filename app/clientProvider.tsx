"use client";

import { ClerkProvider } from '@clerk/nextjs';
import { Provider } from 'react-redux';
import store from '@/redux/store';

export default function ClientProviders({ children }: { children: React.ReactNode }) {
    return (
        <ClerkProvider
            appearance={{
                cssLayerName: 'clerk',
            }}
        >
            <Provider store={store}>
                {children}
            </Provider>
        </ClerkProvider>
    );
}