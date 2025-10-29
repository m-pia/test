import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, {
    isServer
  }) => {
    if (isServer) {
      config.externals = [...config.externals, "@tensorflow/tfjs-node", "@mapbox/node-pre-gyp", "nock", "aws-sdk"];
    }
    return config;
  }
};

export default nextConfig;
