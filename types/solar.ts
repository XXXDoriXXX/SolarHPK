// src/types/solar.ts

export interface SolarStats {
    pvPower: number;
    consumption: number;
    batteryFlow: number;
    gridFlow: number;
    soc: number;
    yieldToday: number;
    importToday: number;
    exportToday: number;
    selfUseRate: number;
}

export interface Inverter {
    sn: string;
    name: string;
    pvPower: number;
    batteryFlow: number;
    gridStatus: number;
    gridFlow: number;
    soc: number;
    consumption: number;
    yieldToday: number;
    importToday: number;
    exportToday: number;
    selfUseRate: number;
}

export interface SolarResponse {
    success: boolean;
    timestamp: string;
    total: SolarStats;
    inverters: Inverter[];
}