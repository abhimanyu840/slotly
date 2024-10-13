/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['images.unsplash.com', 'assets.aceternity.com'],
    },
    webpack: (config, { isServer }) => {
        if (!isServer) {
            // Exclude Framer Motion from the server-side bundle
            config.resolve.alias['framer-motion'] = 'framer-motion/dist/framer-motion';
        }
        return config;
    },
};

export default nextConfig;
