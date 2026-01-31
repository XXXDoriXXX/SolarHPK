import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const formatWatts = (watts: number) => {
    if (watts >= 1000) return `${(watts / 1000).toFixed(2)} kW`;
    return `${watts} W`;
};