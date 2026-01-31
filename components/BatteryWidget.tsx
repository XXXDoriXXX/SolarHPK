'use client';
import { motion } from 'framer-motion';
import { Zap, BatteryCharging } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BatteryProps {
    soc: number;
    power: number;
}

export const BatteryWidget = ({ soc, power }: BatteryProps) => {
    let colorClass = 'bg-emerald-400';
    if (soc < 80) colorClass = 'bg-amber-400';
    if (soc < 30) colorClass = 'bg-rose-500';

    const isCharging = power < 0;

    return (
        <div className="relative h-full min-h-[160px] md:min-h-[220px] w-full bg-slate-100 rounded-3xl border border-slate-200 overflow-hidden shadow-inner">
            {/* Battery Header */}
            <div className="absolute top-4 left-0 right-0 text-center z-20">
                <span className="text-slate-400 text-xs font-bold tracking-widest uppercase">Battery</span>
            </div>

            {/* Main Percentage */}
            <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
        <span className={cn("text-4xl md:text-5xl font-black drop-shadow-sm", soc > 50 ? "text-white" : "text-slate-700")}>
            {soc}%
        </span>
                {power !== 0 && (
                    <div className={cn("flex items-center gap-1 text-xs font-bold mt-2 px-3 py-1 rounded-full backdrop-blur-md",
                        soc > 50 ? "bg-white/20 text-white" : "bg-slate-800/10 text-slate-700")}>
                        {isCharging ? <Zap className="w-3 h-3 fill-current" /> : <BatteryCharging className="w-3 h-3" />}
                        <span>{Math.abs(power)} W</span>
                    </div>
                )}
            </div>

            {/* Liquid */}
            <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${soc}%` }}
                transition={{ type: 'spring', damping: 20, stiffness: 60 }}
                className={cn("absolute bottom-0 w-full transition-colors duration-1000", colorClass)}
            >
                <div className="absolute -top-3 left-0 right-0 h-4 bg-white/40 animate-wave rounded-[100%]" />
                <div className="absolute -top-3 left-0 right-0 h-4 bg-white/20 animate-wave rounded-[100%] delay-75" style={{animationDuration: '7s'}} />
            </motion.div>
        </div>
    );
};