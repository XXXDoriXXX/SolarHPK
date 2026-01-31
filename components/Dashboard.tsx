'use client';

import { useSolarData } from '@/hooks/useSolarData';
import { Header } from './Header';
import { EnergyFlow } from './EnergyFlow';
import { StatsGrid } from './StatsGrid';
import { LineCard } from './LineCard';
import { RefreshCw, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Dashboard() {
    const { data, isLoading, isError, mutate } = useSolarData();

    if (isLoading || !data) return <LoadingScreen />;
    if (isError) return <ErrorScreen retry={mutate} />;

    const { total, inverters, timestamp } = data;

    return (
        // На Desktop (lg) фіксуємо висоту екрану і забороняємо скрол сторінки
        <main className="min-h-screen lg:h-screen bg-[#F8FAFC] font-sans text-slate-900 selection:bg-blue-100 relative overflow-x-hidden lg:overflow-hidden flex flex-col">

            {/* Background Blobs (Fixed) */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-400/10 blur-[100px] animate-blob" />
                <div className="absolute top-[20%] -right-[10%] w-[40%] h-[40%] rounded-full bg-yellow-400/10 blur-[100px] animate-blob animation-delay-2000" />
                <div className="absolute -bottom-[10%] left-[20%] w-[40%] h-[40%] rounded-full bg-emerald-400/10 blur-[100px] animate-blob animation-delay-4000" />
            </div>

            {/* Main Content Container */}
            <div className="relative z-10 w-full max-w-[1920px] mx-auto px-4 md:px-6 py-4 flex flex-col h-full">

                {/* 1. Header Area (Compact) */}
                <div className="flex-none mb-4">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <Header />

                        {/* Status Badge (Desktop: Top Right) */}
                        <div className="hidden md:flex items-center gap-3 bg-white/60 backdrop-blur-md px-4 py-2 rounded-full border border-white shadow-sm">
                            <div className="relative flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                            </div>
                            <span className="text-xs font-bold text-slate-600 tracking-wide">SYSTEM ONLINE</span>
                            <span className="text-[10px] text-slate-400 border-l border-slate-300 pl-3">
                        {new Date(timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </span>
                        </div>
                    </div>
                </div>

                {/* 2. Dashboard Grid (Flex-1 fills remaining height) */}
                <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 pb-2 min-h-0">

                    {/* LEFT COLUMN (Main Vis + Stats) - Spans 9 cols */}
                    <div className="lg:col-span-9 flex flex-col gap-4 h-full min-h-0">

                        {/* Visualizer (Takes available space) */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}

                            className="flex-1 bg-white/80 backdrop-blur-xl rounded-[2rem] shadow-sm border border-white px-4 pt-6 pb-12 md:p-6 relative overflow-hidden flex flex-col justify-center min-h-[350px]"
                        >
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-yellow-400 to-emerald-500 opacity-60" />
                            <EnergyFlow
                                pv={total.pvPower}
                                grid={total.gridFlow}
                                load={total.consumption}
                                battery={total.batteryFlow}
                                soc={total.soc}
                            />
                        </motion.div>

                        {/* Stats Strip (Fixed Height) */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="flex-none"
                        >
                            <StatsGrid
                                yieldToday={total.yieldToday}
                                importToday={total.importToday}
                                exportToday={total.exportToday}
                                selfUseRate={total.selfUseRate}
                            />
                        </motion.div>
                    </div>

                    {/* RIGHT COLUMN (Sidebar / Inverters) - Spans 3 cols */}
                    <div className="lg:col-span-3 flex flex-col gap-4 h-full min-h-0">

                        {/* Control Header */}
                        <div className="flex justify-between items-center px-1">
                            <div className="flex items-center gap-2">
                                <Zap className="w-4 h-4 text-slate-400 fill-slate-400" />
                                <h3 className="text-slate-400 text-xs font-black uppercase tracking-widest">Inverters</h3>
                            </div>
                            <button
                                onClick={() => mutate()}
                                className="flex items-center gap-1.5 text-[10px] font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors"
                            >
                                <RefreshCw className="w-3 h-3" /> REFRESH
                            </button>
                        </div>

                        {/* Scrollable Container for Inverters if screen is small, otherwise fits */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="flex-1 flex flex-col gap-4 overflow-y-auto pr-1 custom-scrollbar"
                        >
                            {inverters.map((inv, idx) => (
                                <LineCard key={inv.sn} data={inv} index={idx} />
                            ))}

                            {/* Mobile Only Timestamp (Duplicate for mobile layout) */}
                            <div className="md:hidden text-center mt-4 pb-8">
                         <span className="text-xs font-bold text-slate-400">
                            Last updated: {new Date(timestamp).toLocaleTimeString()}
                        </span>
                            </div>
                        </motion.div>
                    </div>

                </div>
            </div>
        </main>
    );
}

const LoadingScreen = () => (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center gap-6">
        <div className="relative">
            <div className="w-16 h-16 border-4 border-slate-200 rounded-full" />
            <div className="absolute top-0 left-0 w-16 h-16 border-4 border-t-blue-500 rounded-full animate-spin" />
        </div>
        <p className="text-slate-400 font-bold tracking-widest text-xs animate-pulse">ESTABLISHING CONNECTION...</p>
    </div>
);

const ErrorScreen = ({ retry }: { retry: () => void }) => (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="text-center max-w-sm w-full bg-white p-8 rounded-3xl shadow-xl border border-rose-100">
            <h2 className="text-lg font-black text-slate-800 mb-2">Connection Lost</h2>
            <button onClick={retry} className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold text-sm hover:scale-[1.02] transition-transform">
                Try Again
            </button>
        </div>
    </div>
);