// src/components/StatCard.tsx
'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
    label: string;
    value: number;
    unit: string;
    icon: LucideIcon;
    colorClass: string;
    subValue?: string;
}

export const StatCard = ({ label, value, unit, icon: Icon, colorClass, subValue }: StatCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`relative overflow-hidden rounded-2xl p-6 bg-white shadow-xl border border-slate-100 ${colorClass} group hover:shadow-2xl transition-all duration-300`}
        >
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">{label}</p>
                    <div className="flex items-baseline gap-1">
                        <h3 className="text-3xl font-extrabold text-slate-800">
                            {value.toLocaleString()}
                        </h3>
                        <span className="text-sm font-medium text-slate-400">{unit}</span>
                    </div>
                    {subValue && <p className="text-xs text-slate-400 mt-2">{subValue}</p>}
                </div>
                <div className="p-3 rounded-full bg-slate-50 group-hover:bg-white/50 transition-colors">
                    <Icon className="w-6 h-6 text-slate-600" />
                </div>
            </div>
        </motion.div>
    );
};