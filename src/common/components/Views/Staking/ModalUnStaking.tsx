import ModalNotification from '@/common/components/Modal/ModalNotification';
import { STATUS } from '@/common/types/comon';
import React from 'react';

interface Props {
  isExpired: boolean;
  timeExpired: string;
  status: STATUS;
  show: boolean | undefined;
  unstakeInfo: any;
  txHash?: string;
  txVersion?: string;
  networkCfg?: any;
  error?: string;
  toggle: () => void;
  setShow: (show: boolean) => void;
  setIsConfirmUnstake: (val: boolean) => void;
  confirmUnstake: (pool: any) => void;
}

const errorCase = {
  not_registered: "Campaign's user not found",
};

enum ERROR_TEXT {
  NOT_REGISTERED = 'The wallet is not whitelisted!',
}

const ModalUnStaking: React.FunctionComponent<Props> = ({
  unstakeInfo,
  isExpired,
  timeExpired,
  status,
  show,
  error,
  toggle,
  setShow,
  setIsConfirmUnstake,
  confirmUnstake,
}) => {
  if (status === STATUS.FAIL) {
    return (
      <div>
        {isExpired ? (
          <ModalNotification
            type={'FAILED'}
            title={'Failed'}
            desc={(error === errorCase.not_registered && ERROR_TEXT.NOT_REGISTERED) || 'Something went wrong'}
            isModalOpen={!!show}
            handleClose={() => setShow(false)}
          />
        ) : (
          <ModalNotification
            type={'FAILED'}
            title={'Unstake $MGPT'}
            desc={
              <div>
                You can’t unstake until <span className={'text-[#FF612F]'}>{timeExpired}</span>
              </div>
            }
            isModalOpen={!!show}
            handleClose={() => setShow(false)}
            buttonTitle={'Okay, I got it'}
          />
        )}
      </div>
    );
  }
  if (status === STATUS.SUCCESS) {
    return (
      <ModalNotification
        width={448}
        type={'SUCCESS'}
        title={'Successfully'}
        desc={'Thank you, you have successfully unstaked $UNICE.'}
        unstakeInfo={unstakeInfo}
        isModalOpen={!!show}
        handleClose={() => {
          toggle();
          window.location.reload();
        }}
      />
    );
  }
  if (status === STATUS.WARNING) {
    return (
      <ModalNotification
        width={448}
        type={'WARNING'}
        title={'Unstake?'}
        desc={<div className={'text-base text-[#fff]'}>Do you want to unstake?</div>}
        isModalOpen={!!show}
        handleClose={() => {
          toggle();
        }}
        setIsConfirmUnstake={setIsConfirmUnstake}
        confirmCallback={() => confirmUnstake({})}
      />
    );
  }
  return (
    <ModalNotification
      type={'PENDING'}
      title={'Unstake $UNICE'}
      desc={'Please confirm this transaction in your wallet to unstake $UNICE'}
      isModalOpen={!!show}
      width={400}
    />
  );
};

export default ModalUnStaking;
