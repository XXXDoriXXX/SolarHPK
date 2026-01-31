// src/components/EnergyFlow.tsx
'use client';
import { motion } from 'framer-motion';
import { Sun, Home, Zap, UtilityPole, Battery } from 'lucide-react';
import { cn, formatWatts } from '@/lib/utils';

interface FlowProps {
    pv: number;
    grid: number;
    load: number;
    battery: number;
    soc: number;
}

// Компонент однієї частинки
const Particle = ({ color, delay, vertical }: { color: string, delay: string, vertical: boolean }) => (
    <div
        className={cn(
            "absolute rounded-full blur-[1px]",
            vertical ? "w-2 h-2 left-1/2 -translate-x-1/2 animate-flow-particle-vertical" : "w-2 h-2 top-1/2 -translate-y-1/2 animate-flow-particle",
            delay
        )}
        style={{
            backgroundColor: color,
            boxShadow: `0 0 6px 2px ${color}80` // Додаємо світіння
        }}
    />
);

// Адаптивна лінія з частинками
const FlowLine = ({ active, reverse, vertical = false, color = "#3b82f6" }: { active: boolean; reverse?: boolean; vertical?: boolean; color?: string }) => {
    return (
        <div className={cn(
            "relative bg-slate-100/80 rounded-full transition-all duration-500 overflow-hidden",
            vertical ? "w-1.5 h-12 md:h-24" : "h-1.5 w-12 sm:w-16 md:w-32",
            reverse && (vertical ? "rotate-180" : "rotate-180") // Перевертаємо контейнер для зворотного руху
        )}>
            {active && (
                <>
                    {/* Базовий градієнт для фону лінії */}
                    <div className={cn("absolute inset-0 opacity-30", vertical ? "bg-gradient-to-b" : "bg-gradient-to-r")} style={{
                        backgroundImage: vertical
                            ? `linear-gradient(to bottom, transparent, ${color}, transparent)`
                            : `linear-gradient(to right, transparent, ${color}, transparent)`
                    }} />

                    {/* Анімовані частинки */}
                    <div className={cn("absolute inset-0", vertical ? "w-full h-full" : "w-full h-full")}>
                        <Particle color={color} delay="" vertical={vertical} />
                        <Particle color={color} delay="animation-delay-500" vertical={vertical} />
                        <Particle color={color} delay="animation-delay-1000" vertical={vertical} />
                    </div>
                </>
            )}
        </div>
    );
};

// ... (ValueBadge залишається без змін)
const ValueBadge = ({ value, label, colorClass }: { value: string, label: string, colorClass: string }) => (
    <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 min-w-[80px] text-center z-20">
        <div className="bg-white/90 backdrop-blur-md border border-slate-100 shadow-sm rounded-lg px-2 py-1">
            <span className={cn("block text-sm md:text-lg font-black leading-none", colorClass)}>{value}</span>
            <span className="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-wider">{label}</span>
        </div>
    </div>
);

export const EnergyFlow = ({ pv, grid, load, battery, soc }: FlowProps) => {
    const isExporting = grid < 0;
    const isCharging = battery < 0;

    // Визначаємо кольори для потоків (HEX коди для точного контролю)
    const colors = {
        solar: "#fbbf24", // amber-400
        gridImport: "#e11d48", // rose-600
        gridExport: "#10b981", // emerald-500
        load: "#f97316", // orange-500
        battery: "#10b981", // emerald-500
    };

    return (
        <div className="flex flex-col items-center justify-center py-10 w-full select-none relative">

            {/* 1. SOLAR (Top) */}
            <div className="flex flex-col items-center relative z-10 mb-[-5px]">
                <div className={cn(
                    "relative p-3 md:p-5 rounded-full shadow-xl transition-all duration-500 bg-white border-4 z-10",
                    pv > 0 ? "border-amber-400 shadow-amber-200/50" : "border-slate-100"
                )}>
                    {pv > 0 && <div className="absolute inset-0 bg-amber-400/20 blur-xl rounded-full animate-pulse" />}
                    <Sun className={cn("w-6 h-6 md:w-10 md:h-10 relative z-10", pv > 0 ? "text-amber-500 animate-spin-slow" : "text-slate-300")} />
                </div>
                <ValueBadge value={formatWatts(pv)} label="Generation" colorClass="text-slate-800" />
            </div>

            <FlowLine active={pv > 0} vertical color={colors.solar} />

            {/* 2. MIDDLE ROW (Grid - Hub - Home) */}
            <div className="flex items-center gap-0 relative z-10 my-[-5px]">

                {/* GRID (Left) */}
                <div className="relative group">
                    <div className={cn(
                        "p-3 md:p-4 rounded-2xl border-2 bg-white shadow-lg transition-transform hover:scale-105 relative z-10",
                        grid !== 0 ? "border-blue-500 shadow-blue-200/50" : "border-slate-100"
                    )}>
                        <UtilityPole className="w-5 h-5 md:w-8 md:h-8 text-blue-600" />
                    </div>
                    <ValueBadge
                        value={grid !== 0 ? formatWatts(Math.abs(grid)) : '0 W'}
                        label={grid > 0 ? 'Import' : 'Export'}
                        colorClass={grid > 0 ? "text-rose-600" : "text-emerald-600"}
                    />
                </div>

                <FlowLine active={grid !== 0} reverse={isExporting} color={isExporting ? colors.gridExport : colors.gridImport} />

                {/* HUB (Center) - Pulsing Heart */}
                <div className="relative z-30 mx-[-4px]">
                    <div className="absolute inset-0 bg-slate-900 rounded-full blur-md opacity-20 animate-pulse" />
                    <div className="relative p-4 md:p-6 bg-slate-900 rounded-full shadow-2xl border-4 border-slate-50">
                        <Zap className="w-6 h-6 md:w-10 md:h-10 text-yellow-400 fill-yellow-400 animate-pulse" />
                    </div>
                </div>

                <FlowLine active={load > 0} color={colors.load} />

                {/* HOME (Right) */}
                <div className="relative group">
                    <div className="p-3 md:p-4 rounded-2xl border-2 border-orange-400 bg-white shadow-lg shadow-orange-100 transition-transform hover:scale-105 relative z-10">
                        <Home className="w-5 h-5 md:w-8 md:h-8 text-orange-600" />
                    </div>
                    <ValueBadge value={formatWatts(load)} label="Consumption" colorClass="text-slate-800" />
                </div>
            </div>

            <FlowLine active={battery !== 0} vertical reverse={!isCharging} color={colors.battery} />

            {/* 3. BATTERY (Bottom) */}
            {/* ... (Решта компонента Battery залишається без змін, як у попередній версії) */}
            <div className="flex flex-col items-center relative z-10 mt-[-5px]">
                <div className={cn(
                    "relative p-3 md:p-4 rounded-[2rem] border-2 bg-white shadow-xl flex flex-col items-center gap-1 w-28 md:w-40 transition-all",
                    soc < 20 ? "border-rose-500 shadow-rose-200" : "border-emerald-500 shadow-emerald-200"
                )}>
                    <div className="absolute inset-x-1 bottom-1 top-10 md:top-14 bg-slate-50 rounded-[1.5rem] overflow-hidden">
                        <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: `${soc}%` }}
                            className={cn("absolute bottom-0 w-full transition-colors opacity-20", soc < 20 ? "bg-rose-500" : "bg-emerald-500")}
                        />
                        {/* Хвилька */}
                        <div className={cn("absolute bottom-0 w-full h-1 transition-colors", soc < 20 ? "bg-rose-500" : "bg-emerald-500")} style={{ height: `${soc}%` }} />
                    </div>

                    <Battery className={cn("w-6 h-6 md:w-8 md:h-8 relative z-10", soc < 20 ? "text-rose-500" : "text-emerald-500")} />

                    <div className="relative z-10 text-center mt-1 md:mt-2 pb-1">
                        <span className="text-xl md:text-3xl font-black text-slate-800">{soc}%</span>
                        <span className="block text-[10px] md:text-xs font-bold uppercase text-slate-400">
                    {battery === 0 ? 'Standby' : Math.abs(battery) + ' W'}
                </span>
                    </div>
                </div>
            </div>
        </div>
    );
};