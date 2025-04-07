import type { NextConfig } from 'next';


const nextConfig: NextConfig = {
    /* config options here */
    images: {
        dangerouslyAllowSVG: true,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '*',
            },
        ],
    },
    
    // experimental: {
    //     ppr: 'incremental',
    // },
    rewrites: async () => {
        return [
            {
                source: '/user',
                destination: '/user/profile',
            },
        ];
    },
    env: {
        BACKEND_URL: process.env.BACKEND_URL,
    },
};

export default nextConfig;
