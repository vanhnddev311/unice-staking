import instance from '@/common/services/instance';

export const getUserInfo = async (address: string): Promise<any> =>
  (await instance.get(`/api/user?address=${address}`)).data;
