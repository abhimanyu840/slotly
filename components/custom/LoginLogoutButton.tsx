"use client";
import React from 'react'
import { Button } from '../ui/button'
import { SignedIn, SignedOut, SignInButton } from '@clerk/nextjs'
import { UserMenu } from './UserMenu'

const LoginLogoutButton = () => {
    return (
        <div>
            <SignedOut>
                <SignInButton forceRedirectUrl={'/dashboard'}>
                    <Button variant={'outline'}>Login</Button>
                </SignInButton>
            </SignedOut>
            <SignedIn>
                <UserMenu />
            </SignedIn>
        </div>
    )
}

export default LoginLogoutButton
