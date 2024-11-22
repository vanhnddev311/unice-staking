import { campaignId } from '@/common/consts';
import instance from '@/common/services/instance';

export const postRefundClaim = async (data: any): Promise<any> =>
  (await instance.post(`/api/refund-claim/${campaignId}`, data)).data;

export const updateRefundClaim = async (id: string, data: any): Promise<any> =>
  await instance.put(`/api/refund-claim/${campaignId}/${id}`, data);
