"use client";
import React from 'react'
import { Button } from '../ui/button'
import { SignedIn, SignedOut, SignInButton, useUser } from '@clerk/nextjs'
import { UserMenu } from './UserMenu'

const LoginLogoutButton = () => {

    const { user } = useUser();

    return (
        <div>
            {!user && <SignedOut>
                <SignInButton forceRedirectUrl={'/dashboard'}>
                    <Button variant={'outline'}>Login</Button>
                </SignInButton>
            </SignedOut>}
            {user && <SignedIn>
                <UserMenu />
            </SignedIn>}
        </div>
    )
}

export default LoginLogoutButton
