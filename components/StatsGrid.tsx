'use client';
import { Leaf, Wallet, Activity, Zap, TrendingUp, TrendingDown } from 'lucide-react';
import { AnimatedNumber } from './ui/AnimatedNumber';
import { cn } from '@/lib/utils';

interface StatsProps {
    yieldToday: number;
    importToday: number;
    exportToday: number;
    selfUseRate: number;
}

const TARIFF_UAH = 9.0; // Орієнтовна вартість кВт для юр. осіб

export const StatsGrid = ({ yieldToday, importToday, exportToday, selfUseRate }: StatsProps) => {
    // Конвертуємо Wh в kWh для імпорту/експорту, якщо API віддає в Wh (судячи з JSON importToday=34166.76, це швидше за все Wh, тобто 34 kWh)
    const importKwh = importToday / 1000;
    const exportKwh = exportToday / 1000;

    const savedMoney = Math.round(yieldToday * TARIFF_UAH);

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Картка 1: Економія грошей (Головний акцент) */}
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex flex-col justify-between hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-2">
                    <div className="p-2.5 bg-emerald-100 rounded-xl text-emerald-700">
                        <Wallet className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-md">
                ~{TARIFF_UAH} грн/кВт
            </span>
                </div>
                <div>
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Заощаджено сьогодні</p>
                    <h3 className="text-3xl font-black text-slate-800 mt-1">
                        <AnimatedNumber value={savedMoney} /> <span className="text-lg font-bold text-slate-400">₴</span>
                    </h3>
                </div>
            </div>

            {/* Картка 2: Ефективність (Self Use) */}
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex flex-col justify-between hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-2">
                    <div className="p-2.5 bg-blue-100 rounded-xl text-blue-700">
                        <Activity className="w-6 h-6" />
                    </div>
                    <div className="flex items-center gap-1">
                        {/* Кільцевий графік CSS */}
                        <div className="relative w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center"
                             style={{ background: `conic-gradient(#3b82f6 ${selfUseRate}%, #e2e8f0 0)` }}>
                            <div className="w-6 h-6 bg-white rounded-full" />
                        </div>
                    </div>
                </div>
                <div>
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">ККД Використання</p>
                    <h3 className="text-3xl font-black text-slate-800 mt-1">
                        <AnimatedNumber value={selfUseRate} /> <span className="text-lg font-bold text-slate-400">%</span>
                    </h3>
                </div>
            </div>

            {/* Картка 3: Екологія */}
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex flex-col justify-between hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-2">
                    <div className="p-2.5 bg-teal-100 rounded-xl text-teal-700">
                        <Leaf className="w-6 h-6" />
                    </div>
                </div>
                <div>
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Еко-вплив (CO2)</p>
                    <h3 className="text-3xl font-black text-slate-800 mt-1">
                        <AnimatedNumber value={yieldToday * 0.7} /> <span className="text-lg font-bold text-slate-400">кг</span>
                    </h3>
                </div>
            </div>

            {/* Картка 4: Баланс Мережі (Import vs Export) */}
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex flex-col justify-between hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-2">
                    <div className="p-2.5 bg-violet-100 rounded-xl text-violet-700">
                        <Zap className="w-6 h-6" />
                    </div>
                </div>
                <div className="space-y-2">
                    <div className="flex justify-between items-end">
                        <span className="text-xs font-bold text-slate-500 uppercase">Імпорт</span>
                        <span className="text-lg font-black text-rose-600 flex items-center gap-1">
                    <TrendingDown className="w-4 h-4" /> {importKwh.toFixed(1)} <span className="text-xs text-slate-400">kWh</span>
                </span>
                    </div>
                    <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-rose-500" style={{ width: `${(importKwh / (importKwh + exportKwh || 1)) * 100}%` }} />
                    </div>
                    <div className="flex justify-between items-end">
                        <span className="text-xs font-bold text-slate-500 uppercase">Експорт</span>
                        <span className="text-lg font-black text-green-600 flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" /> {exportKwh.toFixed(1)} <span className="text-xs text-slate-400">kWh</span>
                </span>
                    </div>
                </div>
            </div>
        </div>
    );
};