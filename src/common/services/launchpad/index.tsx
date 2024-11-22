import { campaignId } from '@/common/consts';
import instance from '@/common/services/instance';
import axios from 'axios';

interface UploadFile {
  name: string;
  type: string;
}

export const filterAllCampaign = async (limit?: number): Promise<any> =>
  (await instance.get(`/api/campaign?limit=${limit}`)).data;

export const fetchAllStatusCampaign = async (
  limit: number,
  page: number,
  status?: string,
  isParticipant?: boolean,
  includeCurated?: boolean,
  keyword?: string,
): Promise<any> =>
  (
    await instance.get(
      `/api/campaign?limit=${limit}&page=${page}&status=${status}${isParticipant ? `&includePurchasedAmount=${isParticipant}` : ''}${includeCurated ? `&includeCurated=${includeCurated}` : ''}${keyword ? `&keyword=${keyword}` : ''}`,
    )
  ).data;

export const fetchCampaign = async (campaignId: any): Promise<any> =>
  (await instance.get(`/api/campaign/${campaignId}?section=0`)).data;

export const getCampaignItems = async (campId: string): Promise<any> =>
  (await instance.get(`/api/campaign/${campId}/items`)).data;

export const getCampaignItemsTest = async (campaignId: any): Promise<any> =>
  (await instance.get(`/api/campaign/${campaignId}/items`)).data;

export const getSaleStatus = async (campaignId: any): Promise<any> =>
  (await instance.get(`/api/item/${campaignId}/sale-status`)).data;

export const orderCampaign = async (campaignId: any, data: any): Promise<any> =>
  await instance.post(`/api/campaign/${campaignId}/order`, data);

export const updateOrder = async (campaignId: any, orderId: any, data: any): Promise<any> =>
  await instance.put(`/api/order/${orderId}`, data);

export const getPaymentToken = async (): Promise<any> => (await instance.get(`/api/payment-token`)).data;

export const getPaymentTokenByName = async (name: string): Promise<any> =>
  (await instance.get(`/api/payment-token/${name}`)).data;

export const getUserQuota = async (campaignId: any, address: string): Promise<any> =>
  (await instance.get(`/api/campaign/${campaignId}/user-quota?address=${address}`)).data;

export const getCampaignRemainQuota = async (campaignId: any): Promise<any> =>
  (await instance.get(`/api/campaign/${campaignId}/remain-quota`)).data;

export const getUserOrderHistoryOfCampaign = async (campaignId: any, address: string): Promise<any> =>
  (await instance.get(`/api/order/history/${campaignId}/user?address=${address}&limit=30`)).data;

export const registerCampaign = async (
  campaignId: any,
  data: {
    buyingWallet: string;
    receivingWallet: string;
    email: string;
    telegram: string;
    twitter: string;
    discord: string;
  },
): Promise<any> => (await instance.post(`/api/campaign/${campaignId}/registration`, data)).data;

export const getRegistrationInfo = async (campaignId: any, address: string): Promise<any> =>
  (await instance.get(`/api/campaign/registration/${campaignId}?address=${address}`)).data;

// LBP Page
export const postLBPCampaign = async (data: any): Promise<any> => (await instance.post(`/api/lbpCampaign`, data)).data;

export const verifyCampaignName = async (campName: string): Promise<any> =>
  await instance.get(`/api/campaign/verify-cp-name?name=${campName}`);

export const getOrderHistoryOfLBPCampaign = async (campaignId: any): Promise<any> =>
  (await instance.get(`/api/order/lbpHistory/${campaignId}?limit=100`)).data;

export const getUserOrderHistoryOfLBPCampaign = async (campaignId: any, keywork: string): Promise<any> =>
  (await instance.get(`/api/order/lbpHistory/${campaignId}?keyword=${keywork}&limit=100`)).data;

export const getLBPVolume = async (campaignId: any): Promise<any> =>
  (await instance.get(`/api/order/lbpHistory/volume/${campaignId}`)).data;

export const getLBPPreviewChartData = async (
  asset_in: any,
  decimals_in: any,
  decimals_out: any,
  asset_out: any,
  weightStart: any,
  weightEnd: any,
  startDate: any,
  endDate: any,
  currency: any,
): Promise<any> =>
  (
    await instance.get(
      `/api/lbpCampaign/lbpPreviewChart?asset_in=${asset_in}&decimals_in=${decimals_in}&decimals_out=${decimals_out}&asset_out=${asset_out}&shareWeightStart=${weightStart}&shareWeightEnd=${weightEnd}&startDate=${startDate}&endDate=${endDate}&&currency=${currency}`,
    )
  ).data;

export const getLBPDetailsChartData = async (campaignId: string): Promise<any> =>
  (await instance.get(`/api/lbpCampaign/lbpChart?id=${campaignId}`)).data;

export const getRateAPTToUSD = async (): Promise<any> =>
  (await axios.get(`https://api-v2.cellana.finance/api/v1/token`)).data;

export const getTokenBalanceLBP = async (campaignId: string): Promise<any> =>
  (await instance.get(`/api/lbpCampaign/tokenBalance?id=${campaignId}`)).data;

export const deleteCampaign = async (campaignId: string): Promise<any> =>
  (await instance.delete(`/api/lbpCampaign/${campaignId}`)).data;

export const postBase64Img = async (data: { fileName: string; type: string }): Promise<any> =>
  (await instance.post(`/api/upload/image/gcp`, data)).data;

export const putBase64Img = async (url: string, file: UploadFile): Promise<any> =>
  (
    await axios.put(url, file, {
      headers: {
        'Content-Type': file.type,
      },
    })
  ).data;
