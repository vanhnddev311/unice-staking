import ModalNotification from '@/common/components/Modal/ModalNotification';
import { STATUS } from '@/common/types/comon';
import React from 'react';

interface Props {
  amount: number;
  status: STATUS;
  show: boolean | undefined;
  txHash?: string;
  txVersion?: string;
  networkCfg?: any;
  error?: string;
  toggle: () => void;
  setShow: (show: boolean) => void;
}

const errorCase = {
  not_registered: "Campaign's user not found",
};

enum ERROR_TEXT {
  NOT_REGISTERED = 'The wallet is not whitelisted!',
}

const ModalStaking: React.FunctionComponent<Props> = ({ amount, status, show, error, toggle, setShow }) => {
  if (status === STATUS.FAIL) {
    return (
      <ModalNotification
        type={'FAILED'}
        title={'Failed'}
        desc={(error === errorCase.not_registered && ERROR_TEXT.NOT_REGISTERED) || 'Something went wrong'}
        isModalOpen={!!show}
        handleClose={() => setShow(false)}
      />
    );
  }
  if (status === STATUS.SUCCESS) {
    return (
      <ModalNotification
        width={448}
        type={'SUCCESS'}
        title={'Successfully'}
        desc={
          <div>
            You have successfully staked <span className={'text-[#4A7DFF]'}>{amount} UNICE.</span>
          </div>
        }
        isModalOpen={!!show}
        handleClose={() => {
          toggle();
          window.location.reload();
        }}
      />
    );
  }
  return (
    <ModalNotification
      type={'PENDING'}
      title={'Stake $UNICE'}
      desc={'Please confirm this transaction in your wallet to stake $UNICE'}
      isModalOpen={!!show}
      width={400}
    />
  );
};

export default ModalStaking;
