import React, { Suspense } from 'react';
import { getUserAvailability } from '@/actions/availability';
import AvailabilityFormSkeleton from '@/components/custom/AvailabilityFormSkeleton';
import { defaultAvailability } from './data';
import AvailabilityForm from '@/components/custom/AvailabilityForm';


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
