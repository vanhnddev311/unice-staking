import { getLeaderboardData } from '@/common/services/staking';
import { ellipseAddress } from '@/utils';
import { useQuery } from '@tanstack/react-query';
import { Col, Row, Select } from 'antd';
import { NextSeo } from 'next-seo';
import React from 'react';

const Leaderboard = () => {
  const { data: leaderboardData = [] } = useQuery(['leaderboardData'], async () => {
    const res = await getLeaderboardData();
    return res?.Data;
  });

  console.log('leaderboardData', leaderboardData);

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
          siteName: ' UNICE Staking',
          url: 'https://staking.unicelab.io',
          images: [{ url: 'https://staking.unicelab.io/thumbnail.png' }],
          type: 'website',
        }}
      />
      <section
        className={
          'max-w-[1096px] flex flex-col items-center text-white text-base relative pt-20 mt-20 pb-[200px] sm:pb-[240px] mx-auto'
        }
      >
        <div className={'text-center text-[48px] font-medium'}>Leaderboard</div>
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
        <div className={'w-full flex flex-col rounded-[16px] bg-[#1C1D25] p-8'}>
          <Row>
            <Col xs={4} className={'font-medium'}>
              Wallet
            </Col>
            <Col xs={10} className={'text-center font-medium'}>
              Friends staked
            </Col>
            <Col xs={10} className={'text-center font-medium'}>
              Total Commission
            </Col>
          </Row>
          {leaderboardData.map((item: any, index: number) => {
            return (
              <Row key={index} className={'w-full flex'}>
                <Col xs={4} className={'text-[#717681]'}>
                  {ellipseAddress(item?.self, 8)}
                </Col>
                <Col xs={10} className={'text-center text-[#fff] font-medium'}>
                  {item?.friendRefer ?? 0} {Number(item?.friendRefer) >= 2 ? 'friends' : 'friend'}
                </Col>
                <Col xs={10} className={'text-center text-[#fff] font-medium'}>
                  {item?.friendRefer ?? 0} {Number(item?.friendRefer) >= 2 ? 'friends' : 'friend'}
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
