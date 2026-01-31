'use client';
import { Inverter } from '@/types/solar';
import { formatWatts } from '@/lib/utils';
import { Activity, Power, PowerOff } from 'lucide-react';
import { cn } from '@/lib/utils';

export const LineCard = ({ data, index }: { data: Inverter; index: number }) => {
    const isOnline = data.gridStatus === 1;

    return (
        <div className="bg-white rounded-2xl p-4 shadow-lg border border-slate-100 flex flex-col justify-between relative overflow-hidden group">
            <div className={cn("absolute top-0 left-0 w-1 h-full", index === 0 ? "bg-blue-500" : "bg-purple-500")} />

            <div className="flex justify-between items-start mb-3">
                <div>
                    <h4 className="text-slate-500 text-xs font-bold uppercase tracking-wider">Мережа {data.name}</h4>
                    <p className="text-xs text-slate-300 font-mono">{data.sn}</p>
                </div>
                <div className={cn("px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1",
                    isOnline ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700")}>
                    {isOnline ? <Power className="w-3 h-3" /> : <PowerOff className="w-3 h-3" />}
                    {isOnline ? 'ON' : 'OFF'}
                </div>
            </div>

            <div className="space-y-3">
                {/* Power Grid Flow */}
                <div className="flex justify-between items-end">
                    <div className="flex items-center gap-2 text-slate-400">
                        <Activity className="w-4 h-4" />
                        <span className="text-xs">Потік</span>
                    </div>
                    <span className={cn("text-xl font-bold", data.gridFlow > 0 ? "text-rose-500" : "text-emerald-500")}>
                {formatWatts(data.gridFlow)}
             </span>
                </div>

                {/* Local Consumption */}
                <div className="pt-3 border-t border-slate-50 flex justify-between items-center">
                    <span className="text-xs text-slate-400">Навантаження лінії</span>
                    <span className="text-sm font-semibold text-slate-700">{formatWatts(data.consumption)}</span>
                </div>
            </div>
        </div>
    );
};