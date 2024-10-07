import { getUserByUsername } from '@/actions/users';
import UserPageComponent from '@/components/custom/UserPageComponent';
import { notFound } from 'next/navigation';
import React from 'react'

export async function generateMetadata({ params }: { params: { username: string } }) {
    const { username } = params;
    const user = await getUserByUsername(username);
    if (!user) return null;

    return {
        title: `${user.name}'s Schedule | Slotly`,
        description: `Book an event with ${user.name} on Slotly, a scheduling app that helps you find the perfect time for your appointments and events.`,
    };
}

const UserPage = async ({ params }: { params: { username: string } }) => {

    const { username } = params;

    const user = await getUserByUsername(username);

    if (!user) return notFound();

    return (
        <div>
            <UserPageComponent events={user.events} imageUrl={user.imageUrl!} name={user.name!} username={username!} />
        </div>
    )
}

export default UserPage
