// src/hooks/useSolarData.ts
'use client';

import useSWR from 'swr';
import { SolarResponse } from '@/types/solar';

const API_URL = 'https://solar-panel-hpfk.onrender.com/api/solax/realtime';
const REFRESH_INTERVAL = 10000; // Оновлення кожні 10 секунд

// Fetcher функція, оптимізована для обробки помилок
const fetcher = async (url: string): Promise<SolarResponse> => {
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error('Failed to fetch energy data');
    }
    return res.json();
};

export const useSolarData = () => {
    const { data, error, isLoading, mutate } = useSWR<SolarResponse>(API_URL, fetcher, {
        refreshInterval: REFRESH_INTERVAL,
        revalidateOnFocus: true,
    });

    return {
        data,
        isLoading,
        isError: error,
        mutate,
    };
};