/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  env: {
    CURRENT_NETWORK: process.env.CURRENT_NETWORK,
    API_ENDPOINT_URL: process.env.API_ENDPOINT_URL,
    API_IDO_ENDPOINT_URL: process.env.API_IDO_ENDPOINT_URL,
    APTOS_SCAN_URL: process.env.APTOS_SCAN_URL,
    LAUNCHPAD_URL: process.env.LAUNCHPAD_URL,
    MOVE_CAMPAIGN_ID: process.env.MOVE_CAMPAIGN_ID,
    AMNIS_NFT_CAMPAIGN_ID: process.env.AMNIS_NFT_CAMPAIGN_ID,
    BUY_CONTRACT_ADDRESS: process.env.BUY_CONTRACT_ADDRESS,
    CLAIM_CONTRACT_ADDRESS: process.env.CLAIM_CONTRACT_ADDRESS,
    STAKING_CONTRACT_ADDRESS: process.env.STAKING_CONTRACT_ADDRESS,
    COIN_ADDRESS: process.env.COIN_ADDRESS,
    POOL_91_ADDRESS: process.env.POOL_91_ADDRESS,
    POOL_182_ADDRESS: process.env.POOL_182_ADDRESS,
    COLLECTION_ID: process.env.COLLECTION_ID,
  },
  transpilePackages: [
    'antd',
    '@ant-design',
    'rc-util',
    'rc-pagination',
    'rc-picker',
    'rc-notification',
    'rc-tooltip',
    'rc-tree',
    'rc-table',
  ],
  images: {
    unoptimized: true,
    domains: [
      'storage.googleapis.com',
      'nft-metadata.testnet.aptoslabs.com',
      'www.google.com',
      'huggingface.co',
      'letsenhance.io',
      'img-cdn.pixlr.com',
    ],
    minimumCacheTTL: 1500000,
  },
};

export default nextConfig;
