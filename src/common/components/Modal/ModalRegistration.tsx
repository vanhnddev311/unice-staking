import { CloseIcon } from '@/common/components/icon/common';
import { useModal } from '@/common/hooks/useModal';
import { STATUS } from '@/common/types/comon';
import { useQuery } from '@tanstack/react-query';
import { Button, Input, Modal } from 'antd';
import React, { useState } from 'react';
import ModalNotification from './ModalNotification';

const { TextArea } = Input;

interface Props {
  campaignId: string;
  campaign: Campaign;
  isModalOpen: boolean;
  handleClose: () => void;
  mode: any;
  registrationInfo: RegistrationInfo;
  refetchRegistration: () => void;
}

const ModalRegistration: React.FunctionComponent<Props> = ({ isModalOpen, handleClose, mode, registrationInfo }) => {
  const { show, setShow, toggle } = useModal();
  const [email, setEmail] = useState('');
  const [twitter, setTwitter] = useState('');
  const [telegram, setTelegram] = useState('');
  const [discord, setDiscord] = useState('');
  const [status, setStatus] = useState<STATUS>(STATUS.PENDING);
  const [error, setError] = useState<string>('');
  const [validation, setValidation] = useState({
    email: false,
    telegram: false,
    twitter: false,
    discord: false,
  });

  const { data: validate } = useQuery(['validate', validation.email, registrationInfo, mode], () => {
    return validation.email;
    // && validation.telegram && validation.twitter && validation.discord;
  });

  const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const renderRegisterForm = () => (
    <div className={'flex flex-col gap-6'}>
      <div className={'flex justify-between items-center'}>
        <div className={'text-4xl font-semibold mb-2'}>Registration</div>
        <div onClick={handleClose} className={'bg-[#14141A] rounded-full p-2 cursor-pointer'}>
          <CloseIcon />
        </div>
      </div>
      <div>
        <div className={'text-[#8E929B] pb-1'}>Receiving Wallet</div>
        <div className={'bg-[#2A2B38] p-2'}>
          <TextArea
            disabled={true}
            autoSize
            className={'bg-transparent border-none text-[#61646B] text-lg font-medium'}
          />
        </div>
      </div>
      <div>
        <div className={'text-[#8E929B] pb-1'}>
          Email address <span className={'text-red-600 text-xl font-bold'}>*</span>
        </div>
        <Input
          value={email}
          onChange={(e) => {
            setValidation({ ...validation, email: validateEmail(e.target.value) });
            setEmail(e.target.value);
          }}
          placeholder={'Enter your email address'}
          className={
            'bg-[#101119] border-none text-[#fff] placeholder:text-[#61646B] text-lg focus:border-none focus:bg-[#000] p-4'
          }
        />
        {email && !validation.email && <p className={'text-red-500 mt-1 font-medium'}>Email invalid</p>}
      </div>
      <Button
        disabled={!validate}
        size="small"
        className="default-button2 mb-2 min-w-[156px] h-[52px] disabled:bg-[#ccc] text-[#000] dark:text-[#000] font-bold disabled:border-none w-full text-lg"
      >
        Submit
      </Button>
    </div>
  );
  const renderNotification = () => {
    if (status === STATUS.SUCCESS) {
      return (
        <ModalNotification
          type={'SUCCESS'}
          title={'Submitted'}
          desc={'Once we have identified that you are qualified for VIP status, you will be whitelisted!'}
          isModalOpen={!!show && status === STATUS.SUCCESS}
          handleClose={toggle}
        />
      );
    }
    if (status === STATUS.FAIL) {
      return (
        <ModalNotification
          type={'FAILED'}
          title={'Failed'}
          desc={error || 'Something went wrong. Please try again!'}
          isModalOpen={!!show && status === STATUS.FAIL}
          handleClose={toggle}
        />
      );
    }
    return (
      <ModalNotification
        type={'PENDING'}
        title={'Pending'}
        // desc={'Please complete the social tasks to get whitelisted.'}
        desc={''}
        isModalOpen={!!show && status === STATUS.PENDING}
        handleClose={toggle}
      />
    );
  };

  return (
    <div>
      <Modal
        className={'modal-customize'}
        centered
        open={isModalOpen}
        footer={false}
        title={''}
        onCancel={handleClose}
        width={600}
        closable={false}
      >
        {renderRegisterForm()}
      </Modal>
      {renderNotification()}
    </div>
  );
};

export default ModalRegistration;
