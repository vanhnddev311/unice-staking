import instance from '@/common/services/instance';
import axios from 'axios';

export const getVipLevels = async (): Promise<any> => (await instance.get('/api/staking/vip-staking')).data;

export const getCurrentVipTier = async (): Promise<any> => (await instance.get('/api/staking/user-status')).data;

export const getPoolInfo = async (): Promise<any> => (await instance.get('/api/staking/pools')).data;

export const getRemainingPoolSize = async (poolAddress: any): Promise<any> =>
  (await instance.get(`/api/staking/user-pool?poolAddress=${poolAddress}`)).data;

export const getPriceOfToken = async (): Promise<any> =>
  (await axios.get(`https://api.bitget.com/api/v2/spot/market/tickers?symbol=UNICEUSDT`)).data;
