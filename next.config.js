/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Exclude submodule from build process
  webpack: (config, { isServer }) => {
    // Ignore the submodule directory during build
    config.resolve.alias = {
      ...config.resolve.alias,
    };
    
    // Exclude submodule from module resolution
    config.module.rules.push({
      test: /src\/app\/games\/generator/,
      use: 'ignore-loader'
    });
    
    return config;
  }
}

module.exports = nextConfig