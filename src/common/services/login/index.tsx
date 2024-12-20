import instance from '@/common/services/instance';

export const loginUser = async (data: any): Promise<any> => await instance.post('/api/auth/user/login', data);

export const getNonce = async (addr: string): Promise<any> => (await instance.get(`/api/auth/user/nonce/${addr}`)).data;
export const addReferral = async (data: { code: string }): Promise<any> =>
  (await instance.post(`/api/user/referral`, data)).data;

export const getFEEnvConfig = async (): Promise<any> => await instance.get('/api/system-config/feEnvConfig');

export const login = async (data: any): Promise<any> => await instance.post('/auth/user', data);

export const getUserInfo = async (address: string): Promise<any> => await instance.get(`/user/${address}`);

export const postReferral = async (data: any): Promise<any> => (await instance.post('/user/referral', data)).data;
