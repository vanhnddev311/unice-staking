import { CloseIcon } from '@/common/components/icon/common';
import { config, DEFAULT_DECIMALS } from '@/common/consts';
import useEnv from '@/common/hooks/useEnv';
import useStaking from '@/common/hooks/useStaking';
import { STATUS } from '@/common/types/comon';
import { ellipseAddressNFT, formatNumberBalance } from '@/utils';
import { Button, Modal } from 'antd';
import moment from 'moment';
import { useState } from 'react';

interface Props {
  isModalOpen: boolean | undefined;
  handleClose: () => void;
  selectedNft: any;
  setShowVeNft: (value: boolean) => void;
  setVeNftMessage: (value: string) => void;
  setVeNftStatus: (value: STATUS) => void;
}

const ModalClaimNFT: React.FunctionComponent<Props> = ({
  isModalOpen,
  handleClose,
  selectedNft,
  setShowVeNft,
  setVeNftMessage,
  setVeNftStatus,
}) => {
  // const { refetchNfts, nfts } = useStaking();
  const { dataEnv } = useEnv();

  const [loading, setLoading] = useState(false);

  const handleWithdraw = async () => {
    // const accessToken = getData('accessToken');
    // if (!accessToken) {
    //   const res = await handleSignMessage();
    //   if (!res) return;
    // }
    setLoading(true);
    try {
      const payload = {
        type: 'entry_function_payload',
        function: `${dataEnv?.claimContractAddress}::voting_escrow::withdraw_entry`,
        type_arguments: [],
        arguments: [selectedNft?.token_data_id],
      };
      // await run(payload);

      setVeNftStatus(STATUS.SUCCESS);
      setShowVeNft(true);
    } catch (e: any) {
      console.log('e', e);
      setVeNftStatus(STATUS.FAIL);
      setShowVeNft(true);
    } finally {
      setLoading(false);
      handleClose();
    }
  };

  return (
    <Modal
      className="modal-customize"
      centered
      open={isModalOpen}
      footer={false}
      title={''}
      width={467}
      onCancel={handleClose}
      closable={false}
    >
      <div className="flex flex-col gap-6">
        <div>
          <div className={'flex justify-between items-center'}>
            <div className={'text-[#131316] dark:text-white text-3xl font-semibold'}>Redeem veNFT</div>
            <div onClick={handleClose} className={'bg-[#fff] dark:bg-[#14141A] rounded-full p-2 cursor-pointer'}>
              <CloseIcon />
            </div>
          </div>
          {/*<div className="text-[#89898B] text-base font-medium">Redeem veNFT to claim MGPT token</div>*/}
        </div>

        <div className="flex gap-4 w-full justify-between items-center rounded-[12px] border border-[#E7E7E8] dark:border-none dark:bg-[#2B2D31] p-4">
          <div className="flex gap-4">
            <div className={'flex flex-col items-center gap-2'}>
              <img
                className="w-[88px] h-[88px] rounded-[6px]"
                src={
                  `${config.API_ENDPOINT_URL}api/ve-nft/@${selectedNft?.token_data_id}` ||
                  require('@/common/assets/images/staking/defaultNFTImageList.png')
                }
                width={88}
                height={52}
                alt={''}
              />
              <span className="block sm:hidden text-sm text-[#131316] dark:text-[#E7E7E8] font-medium">
                {ellipseAddressNFT(selectedNft?.token_data_id as any)}
              </span>
            </div>
            <div className={'flex flex-col gap-1 sm:gap-0'}>
              <span className="text-[#131316] dark:text-white text-xl font-bold">
                {formatNumberBalance(Number(selectedNft?.amount) / Math.pow(10, DEFAULT_DECIMALS), 2)} MGPT
              </span>
              <span className="hidden sm:block text-sm text-[#131316] dark:text-[#E7E7E8] font-medium">
                {ellipseAddressNFT(selectedNft?.token_data_id as any)}
              </span>
              <span className="text-sm text-[#89898B]">
                Voting power: <br className={'block sm:hidden'} />
                <span className={'text-[#131316] dark:text-[#E7E7E8] font-medium'}>
                  {formatNumberBalance(selectedNft?.votingPower, 2)} veMGPT
                </span>
              </span>
              <span className="text-sm text-[#89898B]">
                Expiry date: <br className={'block sm:hidden'} />
                <span className={'text-[#131316] dark:text-[#E7E7E8] font-medium'}>
                  {moment(selectedNft?.endEpoch).format('MMMM DD, YYYY')}
                </span>
              </span>
            </div>
          </div>
        </div>
        <div className="w-full">
          <Button
            size="small"
            className="default-button2 w-full h-[48px] flex items-center text-white text-base font-semibold"
            onClick={() => handleWithdraw()}
            loading={loading}
          >
            Redeem
          </Button>
        </div>
      </div>
    </Modal>
  );
};
export default ModalClaimNFT;
