// import AvailabilityForm from '@/components/custom/AvailabilityForm'
import React, { Suspense } from 'react'
import { getUserAvailability } from '@/actions/availability';
import AvailabilityFormSkeleton from '@/components/custom/AvailabilityFormSkeleton';
import { defaultAvailability } from './data';
import dynamic from 'next/dynamic';

const AvailabilityForm = dynamic(() => import('@/components/custom/AvailabilityForm'), { loading: () => <AvailabilityFormSkeleton /> });

const Availability = async () => {
    const data = await getUserAvailability();

    return (
        <Suspense fallback={<AvailabilityFormSkeleton />}>
            {/* @ts-ignore */}
            <AvailabilityForm initialData={data || defaultAvailability} />
        </Suspense>
    )
}

export default Availability;
