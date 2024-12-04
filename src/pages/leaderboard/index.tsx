import { getLeaderboardData, getPriceOfToken } from '@/common/services/staking';
import { ellipseAddress, formatNumber, formatNumberBalance } from '@/utils';
import { useQuery } from '@tanstack/react-query';
import { Col, Row, Select } from 'antd';
import { NextSeo } from 'next-seo';
import React from 'react';

const Leaderboard = () => {
  const { data: leaderboardData = [] } = useQuery(['leaderboardData'], async () => {
    const res = await getLeaderboardData();
    return res?.Data;
  });

  const { data: unicePrice = 0 } = useQuery(
    ['unicePrice'],
    async () => {
      const res = await getPriceOfToken();
      return Number(res?.data[0].lastPr);
    },
    {
      refetchInterval: 10000,
    },
  );

  const title = 'UNICE Leaderboard';
  return (
    <>
      <NextSeo
        title={title}
        // description={description}
        additionalMetaTags={[{ name: 'og:image:alt', content: title }]}
        openGraph={{
          title,
          description:
            'UNICE Staking Phase 2: Stake your UNICE tokens to earn additional FRENS tokens. Enhance your healthcare experience and contribute to our growing community.',
          siteName: ' UNICE Leaderboard',
          url: 'https://staking.unicelab.io',
          // images: [{ url: 'https://staking.unicelab.io/thumbnail.png' }],
          type: 'website',
        }}
      />
      <section
        className={
          'max-w-[1096px] flex flex-col items-center text-white text-base relative pt-20 mt-20 pb-[200px] sm:pb-[240px] mx-auto'
        }
      >
        <div className={'text-center text-[48px] leading-normal font-medium mb-2'}>Leaderboard</div>
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
        <div
          className={
            'leaderboard-data w-full flex flex-col text-sm sm:text-base rounded-[16px] bg-[#1C1D25] p-3 sm:p-8 mt-10'
          }
        >
          <Row>
            <Col xs={6} className={'font-medium'}>
              Rank
            </Col>
            <Col xs={9} className={'font-medium'}>
              Wallet
            </Col>
            <Col xs={9} className={'text-center font-medium'}>
              Friends staked
            </Col>
          </Row>
          {leaderboardData.map((item: any, index: number) => {
            return (
              <Row key={index} className={'w-full flex'}>
                <Col xs={6} className={`text-[#B7BDD3] ${index & 1 ? 'bg-transparent' : 'bg-[#DDE7FF0F]'}`}>
                  #{index + 1}
                </Col>
                <Col xs={9} className={`text-[#B7BDD3] ${index & 1 ? 'bg-transparent' : 'bg-[#DDE7FF0F]'}`}>
                  <div className={'hidden sm:block'}>{ellipseAddress(item?.self, 8)}</div>
                  <div className={'block sm:hidden'}>{ellipseAddress(item?.self, 4)}</div>
                </Col>
                <Col xs={9} className={`text-center text-[#B7BDD3] ${index & 1 ? 'bg-transparent' : 'bg-[#DDE7FF0F]'}`}>
                  {formatNumberBalance(item?.child_staked ?? 0, 2)} UNICE
                </Col>
              </Row>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default Leaderboard;
