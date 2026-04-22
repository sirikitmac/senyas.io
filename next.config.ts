import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Required to silence the "webpack config but no turbopack config" error
  turbopack: {},

  // Transpile MediaPipe packages to fix WASM loading issues in the bundler
  transpilePackages: ['@mediapipe/tasks-vision'],

  experimental: {
    optimizePackageImports: ['@mediapipe/tasks-vision'],
  },

  // Webpack config is still used when running with the --webpack flag
  webpack: (config) => {
    // Fix for "canvas" module error which often triggers in browser environments
    config.resolve.alias = {
      ...config.resolve.alias,
      canvas: false,
    };
    return config;
  },
};

export default nextConfig;