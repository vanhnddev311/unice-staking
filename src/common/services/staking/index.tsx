import instance from '@/common/services/instance';
import axios from 'axios';

export const getPoolInfo = async (): Promise<any> => (await instance.get('/pool')).data;

export const postStakingData = async (data: any): Promise<any> => (await instance.post('/staking-data', data)).data;

export const getPriceOfToken = async (): Promise<any> =>
  (await axios.get(`https://api.bitget.com/api/v2/spot/market/tickers?symbol=UNICEUSDT`)).data;
