import { LoadingIcon1 } from '@/common/components/icon/common';
import { config, DEFAULT_DECIMALS, lockCooldownFormat } from '@/common/consts';
import { ellipseAddressNFT, formatNumberBalance } from '@/utils';
import { Button, Col, Row } from 'antd';
import moment from 'moment';
import React, { useEffect, useMemo, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

interface Props {
  data: any;
  nftsInfo: any;
  handleShowWithdraw: (nft: any) => void;
}

const InfiniteScrollComponent: React.FunctionComponent<Props> = ({ data, nftsInfo, handleShowWithdraw }) => {
  const [items, setItems] = useState(data.slice(0, 10));
  const [hasMore, setHasMore] = useState(true);

  const totalAmount = useMemo(() => {
    return Number(nftsInfo?.reduce((acc: any, item: any) => acc + parseInt(item.amount), 0));
  }, [nftsInfo]);

  const totalVotingPower = useMemo(() => {
    return Number(nftsInfo?.reduce((acc: any, item: any) => acc + parseInt(item.votingPower), 0));
  }, [nftsInfo]);

  const fetchMoreData = () => {
    if (items.length >= data.length) {
      setHasMore(false);
      return;
    }

    setTimeout(() => {
      setItems((prevItems: any) => [...prevItems, ...data.slice(prevItems.length, prevItems.length + 10)]);
    }, 1500);
  };

  return (
    <InfiniteScroll
      dataLength={items.length}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={
        <div className={'mt-6'}>
          <LoadingIcon1 />
        </div>
      }
      // loader={<div>Loading...</div>}
      // endMessage={
      //   <p style={{ textAlign: 'center' }}>
      //     <b>Yay! You have seen it all</b>
      //   </p>
      // }
    >
      <>
        <div className={'hidden sm:block'}>
          <div className={'flex flex-col font-medium gap-3'}>
            {items?.map((nft: any, index: any) => {
              return (
                <Row
                  key={index}
                  className={`nft-item rounded-[12px] ${nft.type !== 'Total' && 'border border-transparent dark:border-[#434548] hover:border-[#30D159] dark:hover:border-[#30D159] bg-[#F6F6F6] dark:bg-[#2B2D31]'}`}
                >
                  <Col sm={6} className={'px-6 py-4'}>
                    {nft.type !== 'Total' ? (
                      <div className="flex items-center text-[#131316] dark:text-[#E7E7E8] text-base gap-2">
                        {/*<Image*/}
                        {/*  className="w-[32px] h-[32px] rounded-[4px]"*/}
                        {/*  src={*/}
                        {/*    value?.current_token_data?.cdn_asset_uris?.cdn_image_uri*/}
                        {/*      ? value?.current_token_data?.cdn_asset_uris?.cdn_image_uri*/}
                        {/*      : require('@/common/assets/images/staking/defaultNFTImageList.png')*/}
                        {/*  }*/}
                        {/*  alt={''}*/}
                        {/*  width={30}*/}
                        {/*  height={24}*/}
                        {/*/>*/}
                        <img
                          className="w-[40px] h-[40px] rounded-[8px]"
                          src={
                            `${config.API_ENDPOINT_URL}api/ve-nft/@${nft?.token_data_id}` ||
                            require('@/common/assets/images/staking/defaultNFTImageList.png')
                          }
                          alt={''}
                          width={30}
                          height={24}
                        />
                        {ellipseAddressNFT(nft.token_data_id as any)}
                      </div>
                    ) : (
                      <div className={'flex items-center h-full'}>
                        <div className="text-[#131316] dark:text-[#E7E7E8] text-base font-bold">Total</div>
                      </div>
                    )}
                  </Col>
                  <Col
                    sm={6}
                    className={`flex items-center text-[#131316] dark:text-[#E7E7E8] ${nft.type == 'Total' && 'font-bold'} px-6 py-4`}
                  >
                    <div className={'text-base'}>
                      {formatNumberBalance(Number(nft.amount) / Math.pow(10, DEFAULT_DECIMALS), 2) + ' MGPT'}
                    </div>
                  </Col>
                  <Col
                    sm={6}
                    className={`flex items-center text-[#131316] dark:text-[#E7E7E8] ${nft.type == 'Total' && 'font-bold'} px-6 py-4`}
                  >
                    <div className={'text-base'}>
                      {formatNumberBalance(Number(nft.votingPower) / Math.pow(10, DEFAULT_DECIMALS), 2)} veMGPT
                    </div>
                  </Col>
                  <Col
                    sm={6}
                    className={'relative flex items-center text-[#131316] dark:text-[#E7E7E8] px-6 py-4 gap-4'}
                  >
                    {nft.type !== 'Total' && (
                      <div className={'text-base'}>
                        {moment.utc().valueOf() > nft?.endEpoch ? (
                          <div className="flex gap-2 items-center font-bold justify-end sm:justify-start">
                            <div className="h-2 w-2 rounded bg-[#00F562] "></div>
                            Redeemable
                          </div>
                        ) : (
                          <div>
                            <div className="flex gap-2 items-center font-bold justify-end sm:justify-start">
                              <div className="h-2 w-2 rounded bg-[#FFC226]"></div>
                              Locked
                            </div>
                            <div className="text-[#89898B] text-sm font-medium">
                              Exp. date: {moment(nft?.endEpoch).format(lockCooldownFormat)}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                    <div className={'nft-item-actions'}>
                      <Button
                        className={`default-button2 h-[40px] flex items-center font-semibold px-4 gap-2 sm:mr-16 md:mr-20 ${moment(nft?.endEpoch).valueOf() < moment.utc().valueOf() && 'expired-action'}`}
                        type="primary"
                        onClick={() => handleShowWithdraw(nft)}
                      >
                        {/*<div className="hidden sm:block">*/}
                        {/*  <WithdrawIcon />*/}
                        {/*</div>*/}
                        Redeem
                      </Button>
                    </div>
                  </Col>
                </Row>
              );
            })}
            {/*<div className="flex justify-center pt-5">*/}
            {/*  <Button*/}
            {/*    className="min-w-[156px] w-full h-[40px] bg-[#E7E7E8] dark:bg-[#222428] hover:bg-[#E7E7E8] disabled:bg-[#E7E7E8] disabled:text-[#44465E] text-[#131316] dark:text-[#fff] hover:text-[#1AC774] border-[0px] dark:border dark:border-[#434548] rounded-[36px] font-medium"*/}
            {/*    type="primary"*/}
            {/*    onClick={() => fetchNextPageNfts()}*/}
            {/*    disabled={nfts.length % 10 !== 0}*/}
            {/*  >*/}
            {/*    Show more*/}
            {/*  </Button>*/}
            {/*</div>*/}
          </div>
        </div>
        <div className={'block sm:hidden'}>
          <div className={'px-4 py-2 mb-4'}>
            <div className={'flex justify-between items-center'}>
              <div className={'text-[#89898B] leading-[170%]'}>Total Locked amount</div>
              <div className={'text-[#131316] dark:text-[#E7E7E8] font-bold leading-[170%]'}>
                {formatNumberBalance(totalAmount / Math.pow(10, DEFAULT_DECIMALS), 2)} MGPT
              </div>
            </div>
            <div className={'flex justify-between items-center mt-2'}>
              <div className={'text-[#89898B] leading-[170%]'}>Total veMGPT</div>
              <div className={'text-[#131316] dark:text-[#E7E7E8] font-bold leading-[170%]'}>
                {formatNumberBalance(totalVotingPower / Math.pow(10, DEFAULT_DECIMALS), 2)} veMGPT
              </div>
            </div>
          </div>
          {items?.map((nft: any, index: any) => {
            return (
              <div
                key={index}
                className={`flex flex-col rounded-[12px] border border-[#E7E7E8] dark:border-transparent bg-[#fff] dark:bg-[#222428] p-4 mt-3 gap-4 ${nft.type == 'Total' && 'hidden'}`}
              >
                <div className="flex justify-between items-center text-[#131316] dark:text-[#E7E7E8] text-base gap-2">
                  {/*<Image*/}
                  {/*  className="w-[32px] h-[32px] rounded-[4px]"*/}
                  {/*  src={*/}
                  {/*    value?.current_token_data?.cdn_asset_uris?.cdn_image_uri*/}
                  {/*      ? value?.current_token_data?.cdn_asset_uris?.cdn_image_uri*/}
                  {/*      : require('@/common/assets/images/staking/defaultNFTImageList.png')*/}
                  {/*  }*/}
                  {/*  alt={''}*/}
                  {/*  width={30}*/}
                  {/*  height={24}*/}
                  {/*/>*/}
                  <div className={'flex items-center gap-2'}>
                    <img
                      className="w-[40px] h-[40px] rounded-[8px]"
                      src={
                        `${config.API_ENDPOINT_URL}api/ve-nft/@${nft?.token_data_id}` ||
                        require('@/common/assets/images/staking/defaultNFTImageList.png')
                      }
                      alt={''}
                      width={30}
                      height={24}
                    />
                    {ellipseAddressNFT(nft.token_data_id as any)}
                  </div>
                  <div>
                    {moment.utc().valueOf() > nft?.endEpoch ? (
                      <div className="flex gap-2 items-center font-bold justify-end sm:justify-start">
                        <div className="h-2 w-2 rounded bg-[#00F562] "></div>
                        Redeemable
                      </div>
                    ) : (
                      <div className="flex gap-2 items-center font-bold justify-end sm:justify-start">
                        <div className="h-2 w-2 rounded bg-[#FFC226]"></div>
                        Locked
                      </div>
                    )}
                  </div>
                </div>
                <div className={'flex flex-col gap-3'}>
                  <div className={'flex justify-between items-center'}>
                    <div className={'text-[#89898B] leading-[150%]'}>Locked amount</div>
                    <div className={'text-[#131316] dark:text-[#E7E7E8] leading-[150%]'}>
                      {formatNumberBalance(Number(nft.amount) / Math.pow(10, DEFAULT_DECIMALS), 2) + ' MGPT'}
                    </div>
                  </div>
                  <div className={'flex justify-between items-center'}>
                    <div className={'text-[#89898B] leading-[150%]'}>veMGPT</div>
                    <div className={'text-[#131316] dark:text-[#E7E7E8] leading-[150%]'}>
                      {formatNumberBalance(Number(nft.votingPower) / Math.pow(10, DEFAULT_DECIMALS), 2) + ' veMGPT'}
                    </div>
                  </div>
                  {moment.utc().valueOf() < nft?.endEpoch ? (
                    <div className={'flex justify-between items-center'}>
                      <div className={'text-[#89898B] leading-[150%]'}>Unlock date</div>
                      <div className={'text-[#131316] dark:text-[#E7E7E8] leading-[150%]'}>
                        {moment(nft?.endEpoch).format(lockCooldownFormat)}
                      </div>
                    </div>
                  ) : (
                    <Button
                      onClick={() => handleShowWithdraw(nft)}
                      className={
                        'default-button2 w-full h-[40px] flex items-center text-[#FFFFFF] dark:text-[#131316] font-semibold mt-1'
                      }
                    >
                      Redeem
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
          {/*<div className="flex justify-center pt-5">*/}
          {/*  <Button*/}
          {/*    className="min-w-[156px] w-full h-[40px] bg-[#E7E7E8] dark:bg-[#222428] hover:bg-[#E7E7E8] disabled:bg-[#E7E7E8] disabled:text-[#44465E] text-[#131316] dark:text-[#fff] hover:text-[#1AC774] border-[0px] dark:border dark:border-[#434548] rounded-[36px] font-medium"*/}
          {/*    type="primary"*/}
          {/*    onClick={() => fetchNextPageNfts()}*/}
          {/*    disabled={nfts.length % 10 !== 0}*/}
          {/*  >*/}
          {/*    Show more*/}
          {/*  </Button>*/}
          {/*</div>*/}
        </div>
      </>
    </InfiniteScroll>
  );
};

export default InfiniteScrollComponent;
