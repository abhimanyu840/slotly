'use client';
import React from 'react';
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { RecoilRoot } from 'recoil';
import { ClerkProvider } from '@clerk/nextjs';

export const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
            <NextThemesProvider defaultTheme="system" attribute="class" enableSystem>
                <RecoilRoot>
                    {children}
                </RecoilRoot>
            </NextThemesProvider>
        </ClerkProvider>
    );
};
