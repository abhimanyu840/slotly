import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { getUserAvailability } from '@/actions/availability';
import AvailabilityFormSkeleton from '@/components/custom/AvailabilityFormSkeleton';
import { defaultAvailability } from './data';

// Dynamically import AvailabilityForm and ensure it's treated as a client component
const AvailabilityForm = dynamic(() => import('@/components/custom/AvailabilityForm'), {
    loading: () => <AvailabilityFormSkeleton />,
    ssr: false,
});

const Availability = async () => {
    const data = await getUserAvailability();

    return (
        <Suspense fallback={<AvailabilityFormSkeleton />}>
            {/* @ts-ignore */}
            <AvailabilityForm initialData={data || defaultAvailability} />
        </Suspense>
    );
};

export default Availability;
