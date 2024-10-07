'use client';
import React from 'react';
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { RecoilRoot } from 'recoil';
import { ClerkProvider } from '@clerk/nextjs';

export const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <ClerkProvider>
            <NextThemesProvider defaultTheme="system" attribute="class" enableSystem>
                <RecoilRoot>
                    {children}
                </RecoilRoot>
            </NextThemesProvider>
        </ClerkProvider>
    );
};
