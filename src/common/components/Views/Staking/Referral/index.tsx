import { CopyIcon, LinkIcon, SuccessIconNoti } from '@/common/components/icon/common';
import ModalTopReferrers from '@/common/components/Views/Staking/Referral/ModalTopReferrers';
import { useModal } from '@/common/hooks/useModal';
import { AppContext } from '@/common/providers/contexts';
import { postReferral } from '@/common/services/login';
import { copyToClipboard, ellipseAddress } from '@/utils';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { Button, Col, Input, notification, Row, Select } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { useAccount } from 'wagmi';

const Referral: React.FunctionComponent = () => {
  const { userInfo } = useContext(AppContext);
  const [refCode, setRefCode] = useState();
  const [validate, setValidate] = useState({
    refCode: true,
  });
  const [copyText, setCopyText] = useState('Copy');
  const { show: showReferral, setShow: setShowReferral, toggle: toggleShowReferral } = useModal();
  const { address, isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();

  const handleCopy = (value: string) => {
    setCopyText('Copied!');
    setTimeout(() => {
      setCopyText('Copy');
    }, 2000);
    copyToClipboard(value);
  };
  useEffect(() => {}, []);

  const handleSubmitRef = async () => {
    if (!address) {
      if (openConnectModal) {
        openConnectModal();
      }
      return;
    }
    try {
      const res = await postReferral({
        addr: address,
        referralCode: refCode,
      });
      if (res?.AdditionalData == 'Invalid referral code') {
        setValidate({ ...validate, refCode: false });
        return;
      }
      setValidate({ ...validate, refCode: true });
      notification.success({
        message: '',
        description: (
          <div>
            <div className={'text-base text-[#fff] font-medium'}>Success!</div>
            <div className={'text-[#FFFFFFB2]'}>You have successfully entered the code.</div>
          </div>
        ),
        placement: 'bottomRight',
        icon: <SuccessIconNoti />,
      });
    } catch (e: any) {
      console.log('e', e);
    }
  };

  return (
    <section>
      <div>
        <div className={'flex items-center gap-4'}>
          <div className={'text-[fff] text-[28px] font-medium'}>Referral</div>
          <Select
            defaultValue="1"
            style={{ width: 120 }}
            // onChange={handleChange}
            className={'select-season'}
            options={[
              {
                value: '1',
                label: 'Season 1',
              },
            ]}
          />
        </div>
        <div className={'flex flex-col sm:flex-row justify-between h-full mt-5'}>
          <div className={'w-full h-full'}>
            <Row className={'h-full rounded-[16px] bg-[#1C1D25]'}>
              <Col
                xs={12}
                md={8}
                className={
                  'flex flex-col items-center border-r border-[#393C46] sm:border-none py-6 sm:py-8 px-6 gap-2'
                }
              >
                <div className={'text-[#717681]'}>Total Referrals</div>
                <div className={'text-xl text-[#fff] font-medium'}>10 friends</div>
              </Col>
              <Col xs={12} md={8} className={'flex flex-col items-center py-6 sm:py-8 px-6 gap-2'}>
                <div className={'text-[#717681]'}>Friends Staked</div>
                <div className={'text-xl text-[#fff] font-medium'}>0.00 UNICE</div>
              </Col>
              <Col
                xs={24}
                md={8}
                className={
                  'flex flex-col items-center border-t border-[#393C46] sm:border-none py-6 sm:py-8 px-6 gap-2'
                }
              >
                <div className={'text-[#717681]'}>Total Commission</div>
                <div className={'text-xl text-[#fff] font-medium'}>0.00 USDT</div>
              </Col>
            </Row>
          </div>
          <div></div>
        </div>
        <Row className={'mt-4'} gutter={[16, 0]}>
          <Col xs={16} className={''}>
            <div className={'w-full flex items-center rounded-[16px] bg-[#1C1D25] gap-6 p-6'}>
              <div className={'w-full'}>
                <div className={'text-[#717681]'}>My Referral Code</div>
                <div className={'h-[60px] flex justify-between items-center bg-[#050A11] rounded-[8px] mt-3 p-4'}>
                  {userInfo?.referralCode} <CopyIcon />
                </div>
              </div>
              <div className={'w-full'}>
                <div className={'text-[#717681]'}>My Referral Link</div>
                <div className={'h-[60px] flex justify-between items-center bg-[#050A11] rounded-[8px] mt-3 p-4'}>
                  https://staking.unicelab.io/{userInfo?.referralCode} <CopyIcon />
                </div>
              </div>
            </div>
          </Col>
          <Col xs={8} className={''}>
            {userInfo?.referredBy ? (
              <div className={'w-full rounded-[16px] bg-[#1C1D25] p-6'}>
                <div className={'text-[#717681]'}>Invited by</div>
                <div
                  className={
                    'h-[60px] flex justify-between items-center border border-transparent text-[#4A7DFF] bg-[#252730] rounded-[8px] mt-3 px-4 py-3'
                  }
                >
                  {ellipseAddress(userInfo?.referredBy, 5)}
                  <LinkIcon />
                </div>
              </div>
            ) : (
              <div className={'w-full rounded-[16px] bg-[#1C1D25] p-6'}>
                <div className={'flex justify-between items-center'}>
                  <div className={'text-[#717681]'}>Enter Referral Code</div>
                  <div className={`${validate.refCode && 'hidden'} text-[#FC5858]`}>Invalid code</div>
                </div>
                <Input
                  value={refCode}
                  onChange={(e) => setRefCode(e.target.value as any)}
                  className={`flex justify-between items-center border ${validate.refCode ? 'border-transparent' : 'border-[#FC5858]'} bg-[#050A11] rounded-[8px] mt-3 px-4 py-3`}
                  placeholder={'Enter your referral code'}
                  suffix={
                    <Button
                      onClick={handleSubmitRef}
                      className={'h-[36px] text-[#4A7DFF] border-none bg-[#4A7DFF33] rounded-[8px] px-4'}
                    >
                      Apply
                    </Button>
                  }
                />
              </div>
            )}
          </Col>
        </Row>
      </div>
      <ModalTopReferrers isModalOpen={!!showReferral} handleClose={toggleShowReferral} />
    </section>
  );
};

export default Referral;