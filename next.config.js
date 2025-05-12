const nextConfig = {
    typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true,
    },
    webpack: (config) => {
        config.resolve.fallback = {}; // Evita que Webpack busque archivos fuera del proyecto
        return config;
    },
    experimental: {},
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "utfs.io",
                pathname: "/**"
            }
        ]
    }
};

module.exports = nextConfig;