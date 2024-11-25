import { Button, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import { useClient } from 'wagmi';

interface Props {
  isModalOpen: boolean;
  handleClose: () => void;
}

const ModalWrongNetwork: React.FunctionComponent<Props> = ({ isModalOpen, handleClose }) => {
  const client = useClient();

  const handleTryAgain = async () => {
    try {
      // await disconnect();
      handleClose();
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Modal
      className={'modal-customize'}
      centered
      open={isModalOpen}
      footer={false}
      title={''}
      width={460}
      closable={false}
    >
      <div className={'flex flex-col items-center gap-3'}>
        <div className={'text-center text-2xl text-[#131316] dark:text-[#E7E7E8] font-bold'}>
          Please switch to {client?.chain?.name}
        </div>
        <Button
          className={'default-button2 w-full h-[48px] text-base text-[#14161A] font-semibold'}
          onClick={handleTryAgain}
        >
          I Understand
        </Button>
      </div>
    </Modal>
  );
};

export default ModalWrongNetwork;
