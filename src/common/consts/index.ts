export const enum envNane {
  MAINNET = 'mainnet',
  TESTNET = 'testnet',
  STG = 'staging',
}

// export const ENV = process.env.CURRENT_NETWORK;
export const ENV: any = envNane.MAINNET;
// export const ENV: envNane = envNane.TESTNET;

export const config = {
  API_ENDPOINT_URL: 'https://staking-api.unicelab.io/',
  API_IDO_ENDPOINT_URL: process.env.API_IDO_ENDPOINT_URL,
  APTOS_SCAN_URL: process.env.APTOS_SCAN_URL,
};

//Testnet
export const tokenAddress =
  ENV === envNane.TESTNET ? '0xb84c75479bb9e7cf635ebb216e13c159c2647444' : '0xA0CF89eE581313D84d28409Eb6BB1D1F9B55d410';
export const contractAddress =
  ENV === envNane.TESTNET ? '0xDe86488e46ACBe88D9e352296419d6EC7E800C1F' : '0x0a06EF3CB550eea678C2b1D329e685a902324Fe5';
export const contractFrensAddress =
  ENV === envNane.TESTNET ? '0x56B6eE96a96F597D3BB633695d2A0F1e9c0F1ECf' : '0x417756Bf8D03e8190c7D73B31A0EF4F2210bd87D';

export const MAX_INT = '115792089237316195423570985008687907853269984665640564039457584007913129639935';

export const DEFAULT_DECIMALS = 8;

export const dateFormat = 'MMMM DD YYYY HH:mm (UTC)';

export const lockCooldownFormat = 'MMM DD, YYYY';
