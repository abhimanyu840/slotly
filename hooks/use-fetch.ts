"use client";
import { atom, useRecoilState } from 'recoil';
import { useCallback } from 'react';

// Define the types for data and error
type DataType = any; // Replace with actual type if needed
type ErrorType = Error | null;

// Recoil atoms for data, loading, and error
const dataState = atom<DataType | undefined>({
    key: 'dataState',
    default: undefined,
});

const loadingState = atom<boolean>({
    key: 'loadingState',
    default: false,
});

const errorState = atom<ErrorType>({
    key: 'errorState',
    default: null,
});

// Custom Hook using Recoil
const useFetch = <T>(cb: (...args: any[]) => Promise<T>) => {
    const [data, setData] = useRecoilState(dataState);
    const [loading, setLoading] = useRecoilState(loadingState);
    const [error, setError] = useRecoilState(errorState);

    const fn = useCallback(
        async (...args: any[]) => {
            setLoading(true);
            setError(null);

            try {
                const response = await cb(...args);
                setData(response);
            } catch (error: any) {
                setError(error);
            } finally {
                setLoading(false);
            }
        },
        [cb, setData, setLoading, setError]
    );

    return { data, loading, error, fn };
};

export default useFetch;
