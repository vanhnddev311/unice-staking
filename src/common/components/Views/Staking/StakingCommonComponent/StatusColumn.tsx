import { AdjustIcon, DotIcon } from '@/common/components/icon/common';
import { Button } from 'antd';
import React, { useMemo } from 'react';

const StatusColumn: React.FunctionComponent<{ record: any; isMobile: boolean }> = ({ record, isMobile }) => {
  return (
    <div className={''}>
      <div className={'staking-pools-status'}>
        <div>
          <div className={'text-base text-[#717681]'}>
            <div className={`flex items-center gap-2 ${isMobile && 'justify-end text-sm'}`}>
              <DotIcon fill={'#00F562'} />
              <div className={'text-title font-bold'}>Open</div>
            </div>
          </div>
        </div>
      </div>
      <div className={'staking-pools-actions'}>
        <Button className="default-button2 h-[40px] font-semibold flex gap-2" type="primary">
          Stake now
        </Button>
      </div>
    </div>
  );
};

export default StatusColumn;
