# ⚡ HPK Solar Monitoring Dashboard

![Project Banner](https://img.shields.io/badge/Status-Production-emerald?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)

A production-grade, real-time telemetry dashboard designed for **Khmelnytskyi Polytechnic College**. This application visualizes energy flow from solar arrays, battery storage, and grid consumption using advanced SVG animations and a "Bento Grid" layout.




## ✨ Key Features

### 🎨 Visual & UI
- **Real-time Energy Flow:** Custom SVG animations with particle effects simulating energy transfer between Solar, Grid, Battery, and Load.
- **Glassmorphism & Neumorphism:** Modern UI aesthetic with blur effects, soft shadows, and dynamic gradients.
- **Adaptive "TV Mode":** High-contrast typography (`Inter` & `Geist Mono`) optimized for large displays in the college lobby (viewable from 5+ meters).
- **Responsive Design:** - **Desktop:** "Single Viewport" interface (no scrolling required).
    - **Mobile:** Adaptive stacked layout with touch-friendly interactions.

### 🚀 Technical
- **Live Telemetry:** Powered by **SWR** (Stale-While-Revalidate) for instant data updates without page reloads (1-minute polling interval).
- **Impact Analysis:** Real-time calculation of financial savings (UAH) and CO2 reduction based on yield data.
- **Hardware Status:** Detailed monitoring of individual inverter lines with "Online/Offline" health checks.
- **Animation Engine:** **Framer Motion** for 60FPS GPU-accelerated transitions and micro-interactions.

---

## 🛠️ Tech Stack

| Category | Technology | Purpose |
| :--- | :--- | :--- |
| **Framework** | Next.js 14 (App Router) | Core application architecture & SSR |
| **Language** | TypeScript | Strict type safety for API responses |
| **Styling** | Tailwind CSS | Utility-first styling & responsiveness |
| **Animation** | Framer Motion | Complex SVG path animations & layout transitions |
| **Data Fetching** | SWR | caching, revalidation, and polling |
| **Icons** | Lucide React | Lightweight, consistent SVG icons |
| **Deployment** | Vercel | Edge network deployment |

---

## 🏗️ Architecture

```bash
src/
├── app/                 # Next.js App Router
├── components/
│   ├── EnergyFlow.tsx   # Core visualization logic (Particles & Paths)
│   ├── LineCard.tsx     # Individual inverter status cards
│   ├── StatsGrid.tsx    # Financial & Ecological impact metrics
│   └── ui/              # Reusable UI atoms (Badges, AnimatedNumber)
├── hooks/
│   └── useSolarData.ts  # Custom SWR hook for data fetching
├── lib/
│   └── utils.ts         # CN helper & formatters
└── types/               # TypeScript interfaces (SolarResponse, Inverter)