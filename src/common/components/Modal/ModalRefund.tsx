import { WarningIcon } from '@/common/components/icon/common';
import { Button, Checkbox, Modal } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import classNames from 'classnames';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

interface Props {
  campaign: Campaign;
  activeCamp?: string | number;
  allocate?: any;
  isModalOpen: boolean;
  handleClose: () => void;
  handleRefund: (subTitle: string) => Promise<void>;
}

const ModalRefund: React.FunctionComponent<Props> = ({
  campaign,
  activeCamp,
  allocate,
  isModalOpen,
  handleClose,
  handleRefund,
}) => {
  const [checked, setChecked] = useState<boolean>(false);
  const [subTitle, setSubTitle] = useState<string>('');

  useEffect(() => {
    if (activeCamp == 1) {
      setSubTitle('_mgpt');
    } else if (activeCamp == 2) {
      setSubTitle('_spore');
    }
  }, [activeCamp]);

  const onChange = (e: CheckboxChangeEvent) => {
    setChecked(e.target.checked);
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
        width={480}
        closable={false}
      >
        <div className={'flex flex-col items-center gap-6'}>
          <WarningIcon />
          <div className={'flex flex-col text-base gap-4'}>
            <div className={'text-2xl text-center font-semibold'}>Refund request?</div>
            <div
              className={'rounded-[24px] border border-[#292B2F] bg-[#14161A] text-base font-light tracking-tight p-4'}
            >
              By choosing to proceed with the refund, please note that you will no longer be eligible to claim the
              tokens. This action cannot be undone.
            </div>
            <div className={'flex font-light gap-2 px-4'}>
              <Checkbox onChange={onChange} />
              <div>
                I have read and understand the{' '}
                <span className={'text-[#1AC774]'}>
                  <Link
                    className={'hover:text-[#C2E23D] '}
                    href={
                      activeCamp == 1
                        ? 'https://movegpt.gitbook.io/movegpt/about-us/guidelines/safeguard-policy#id-24h-optional-refund-safeguard'
                        : 'https://spores.medium.com/spores-24h-optional-refund-policy-a131c3864ae0'
                    }
                    target={'_blank'}
                  >
                    refund policy.
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className={'flex justify-between mt-6 gap-4'}>
          <Button
            disabled={!checked || allocate?.is_refund}
            onClick={() => handleRefund(subTitle)}
            size="small"
            className={classNames(
              'default-button w-6/12 min-w-[156px] h-[52px] text-[#fff] text-base font-medium sm:px-5',
              // { 'hover:bg-[#1AC774]': checked },
            )}
          >
            Yes, I want to refund
          </Button>
          <Button
            onClick={handleClose}
            size="small"
            className="default-button w-6/12 min-w-[156px] h-[52px] text-[#fff] text-base font-medium sm:px-5"
          >
            Cancel
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default ModalRefund;
