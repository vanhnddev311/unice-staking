import { formatNumber } from '@/utils';
import { Row } from 'antd';
import Image from 'next/image';
import React from 'react';

interface Props {
  vipLevels: any;
}

const VipLevelDetails: React.FunctionComponent<Props> = ({ vipLevels }) => {
  return (
    <section className={'dark:bg-[#1C1D25]'}>
      <Row className={'hidden sm:flex justify-center w-full py-6'}>
        <div className={'w-1/5 flex flex-col justify-end text-title bottom-0 gap-6'}>
          <div className={'text-base font-semibold'}>Tier Levels</div>
          <div className={'text-base font-semibold'}>Voting power Required</div>
          <div className={'text-base font-semibold'}>Allocation</div>
        </div>
        <div className={'w-4/5 flex justify-between'}>
          {vipLevels?.map(({ name, amount }: any) => {
            return (
              <div key={name} className={'flex flex-col items-center gap-6'}>
                <Image
                  src={require(`@/common/assets/images/staking/${name}.png`)}
                  alt=""
                  className={'text-title w-[66px] h-[66px]'}
                />
                <div className={'bg-[#ffffff0d] text-title border border-[#ffffff1a] rounded-full font-semibold px-5'}>
                  {name}
                </div>
                <div className={'text-title text-base'}>{formatNumber(amount)}</div>
                <div className={'text-title text-base'}>{formatNumber(amount)}</div>
              </div>
            );
          })}
        </div>
      </Row>
      <Row className={'relative flex sm:hidden w-full p-6'}>
        <div className={'table-scroll'}>
          <table>
            <tbody>
              <tr>
                <td className={'title-board'}></td>
                {vipLevels?.map(({ name }: any) => {
                  return (
                    <td key={name} className={'board-item'}>
                      <Image
                        src={require(`@/common/assets/images/staking/${name}.png`)}
                        alt=""
                        className={'inline-block mb-4'}
                      />
                    </td>
                  );
                })}
              </tr>
              <tr>
                <td className={'title-board text-base font-semibold'}>VIP Levels</td>
                {vipLevels?.map(({ name }: any) => {
                  return (
                    <td key={name}>
                      <div
                        className={'bg-[#ffffff0d] border border-[#ffffff1a] rounded-full font-semibold mx-6 py-1 my-4'}
                      >
                        {name}
                      </div>
                    </td>
                  );
                })}
              </tr>
              <tr>
                <td className={'title-board text-base font-semibold'}>
                  Voting power <br /> Required
                </td>
                {vipLevels?.map(({ name, amount }: any) => {
                  return <td key={name}>{formatNumber(amount)}</td>;
                })}
              </tr>
            </tbody>
          </table>
        </div>
      </Row>
    </section>
  );
};

export default VipLevelDetails;
