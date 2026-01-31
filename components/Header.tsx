// src/components/Header.tsx
import Image from 'next/image';

export const Header = () => {
    return (
        <header className="flex flex-col items-center justify-center py-8 gap-4 animate-fade-in-down">
            <div className="relative w-32 h-32 md:w-40 md:h-40 drop-shadow-2xl hover:scale-105 transition-transform duration-300">
                {/* Використовуємо повне URL посилання, яке ми дозволили в конфігу */}
                <Image
                    src="https://solar-light-xi.vercel.app/assets/HPK.png"
                    alt="HPK Logo"
                    fill
                    className="object-contain"
                    priority
                    sizes="(max-width: 768px) 128px, 160px"
                />
            </div>
            <div className="text-center space-y-2">
                <h1 className="text-2xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-yellow-500">
                    Хмельницький Політехнічний Фаховий Коледж
                </h1>
                <p className="text-slate-500 font-medium tracking-wide">
                    СИСТЕМА ЕНЕРГОМОНІТОРИНГУ
                </p>
            </div>
        </header>
    );
};