import instance from '@/common/services/instance';
import axios from 'axios';

export const getPoolInfo = async (): Promise<any> => (await instance.get('/pool')).data;

export const postStakingData = async (data: any): Promise<any> => (await instance.post('/staking-data', data)).data;

export const getPriceOfToken = async (): Promise<any> =>
  (await axios.get(`https://api.bitget.com/api/v2/spot/market/tickers?symbol=UNICEUSDT`)).data;

export const getPriceOfFrensToken = async (): Promise<any> =>
  (await axios.get(`https://contract-openapi.weex.com/api/spot/v1/market/ticker?symbol=FRENSUSDT_SPBL`)).data;
