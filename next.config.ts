import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'solar-light-xi.vercel.app',
                pathname: '/assets/**',
            },
        ],
    },
};

export default nextConfig;
