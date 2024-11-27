import { STATUS } from '@/common/types/comon';
import React from 'react';
import ModalNotification from '../../Modal/ModalNotification';

interface Props {
  status: STATUS;
  show: boolean | undefined;
  toggle: () => void;
  setShow: (show: boolean) => void;
  message?: string;
}

const ModalReceiveBnb: React.FunctionComponent<Props> = ({ status, show, message, toggle, setShow }) => {
  if (status === STATUS.FAIL) {
    return (
      <ModalNotification
        type={'FAILED'}
        title={'Failed'}
        desc={message || 'Something went wrong'}
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
        desc={message || 'Thank you, you have successfully staked $MGPT. You can stake more at any time.'}
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
      width={224}
      desc={
        <div className={'text-center text-[#BFBFC1] mt-2'}>
          <div>Processing...</div>
          <div className={'mt-1'}>Please wait ~5 minutes</div>
        </div>
      }
      isModalOpen={!!show}
    />
  );
};
export default ModalReceiveBnb;
