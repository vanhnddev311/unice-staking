import { CloseIcon } from '@/common/components/icon/common';
import { Col, Modal, Pagination, PaginationProps, Row } from 'antd';
import React, { useState } from 'react';

interface Props {
  isModalOpen: boolean;
  handleClose: () => void;
}

const ModalTopReferrers: React.FunctionComponent<Props> = ({ isModalOpen, handleClose }) => {
  const [pageReferrer, setPageReferrer] = useState(1);
  const [currentPageReferrer, setCurrentPageReferrer] = useState(1);

  const onShowSizeChangeReferrer: PaginationProps['onShowSizeChange'] = (current, pageSize) => {
    setPageReferrer(current);
    setCurrentPageReferrer(current);
  };

  return (
    <Modal
      className={'modal-customize modal-top-referral'}
      centered
      open={isModalOpen}
      footer={false}
      title={''}
      onCancel={handleClose}
      width={548}
      closable={false}
    >
      <div className={'w-full py-2'}>
        <div className={'flex justify-between items-center'}>
          <div className={'text-[#131316] dark:text-[#E7E7E8] text-2xl font-bold mb-2'}>Top referrers</div>
          <div onClick={handleClose} className={'bg-none rounded-full p-2 cursor-pointer'}>
            <CloseIcon />
          </div>
        </div>
        {/*<div className={'w-full mt-6'}>*/}
        {/*  <div className={'w-full overflow-x-auto'}>*/}
        {/*    <div className={'w-full sm:min-w-[498px]'}>*/}
        {/*      <Row className={'text-[13px] sm:text-base text-[#717681] font-medium pb-2'}>*/}
        {/*        <Col className={'px-3'} xs={6} md={4}>*/}
        {/*          Rank*/}
        {/*        </Col>*/}
        {/*        <Col className={'px-4'} xs={9} md={10}>*/}
        {/*          Wallet*/}
        {/*        </Col>*/}
        {/*        <Col className={'text-end px-3'} xs={9} md={10}>*/}
        {/*          Friends Staked*/}
        {/*        </Col>*/}
        {/*      </Row>*/}
        {/*      {!isFetchingReferrer && leaderboardInfo.length > 0 && (*/}
        {/*        <div className={'flex flex-col gap-1'}>*/}
        {/*          {leaderboardInfo?.map((item: any, index: number) => {*/}
        {/*            return (*/}
        {/*              <Row*/}
        {/*                // style={{ background: index % 2 === 0 ? 'rgba(255, 255, 255, 0.05)' : '' }}*/}
        {/*                key={pageReferrer * 10 + index}*/}
        {/*                className={'bg-[#2B2D31] text-[#fff] sm:text-base'}*/}
        {/*              >*/}
        {/*                <Col className={'px-3 py-2'} xs={6} md={4}>*/}
        {/*                  <div>{item?.rank}</div>*/}
        {/*                </Col>*/}
        {/*                <Col className={'px-3 py-2'} xs={9} md={10}>*/}
        {/*                  <div className={'block sm:hidden'}>{ellipseAddress(item?.address, 4)}</div>*/}
        {/*                  <div className={'hidden sm:block'}>{ellipseAddress(item?.address, 8)}</div>*/}
        {/*                </Col>*/}
        {/*                <Col className={'text-end font-semibold px-3 py-2'} xs={9} md={10}>*/}
        {/*                  <div>{formatNumber(item?.totalAmount)}</div>*/}
        {/*                </Col>*/}
        {/*              </Row>*/}
        {/*            );*/}
        {/*          })}*/}
        {/*        </div>*/}
        {/*      )}*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*  <div className={'flex flex-col sm:flex-row justify-between mt-3 gap-3'}>*/}
        {/*    <div className={'text-base text-center sm:text-start text-[#717681] font-semibold tracking-tight'}>*/}
        {/*      Total {totalLeaderboardItem} participants*/}
        {/*    </div>*/}
        {/*    <Pagination*/}
        {/*      className={''}*/}
        {/*      size={'small'}*/}
        {/*      onChange={onShowSizeChangeReferrer}*/}
        {/*      // defaultCurrent={1}*/}
        {/*      current={currentPageReferrer}*/}
        {/*      showSizeChanger={false}*/}
        {/*      total={totalLeaderboardItem}*/}
        {/*    />*/}
        {/*  </div>*/}
        {/*  <div className={'mt-5'}>*/}
        {/*    <div className={'text-[#717681] text-base font-medium tracking-tight'}>Your rank</div>*/}
        {/*    <Row className={'border-[0.5px] border-[#393C46] bg-[#050A11] rounded-[4px] text-base mt-2'}>*/}
        {/*      <Col className={'px-3 py-3'} xs={6} md={4}>*/}
        {/*        <div>{userReferralInfo?.rank ? userReferralInfo?.rank : '--'}</div>*/}
        {/*      </Col>*/}
        {/*      <Col className={'font-semibold px-3 py-3'} xs={11} md={10}>*/}
        {/*        <div className={'block sm:hidden'}>*/}
        {/*          {connected ? ellipseAddress(account?.address as string, 5) : '--'}*/}
        {/*        </div>*/}
        {/*        <div className={'hidden sm:block'}>*/}
        {/*          {connected ? ellipseAddress(account?.address as string, 8) : '--'}*/}
        {/*        </div>*/}
        {/*      </Col>*/}
        {/*      <Col className={'text-end font-semibold px-3 py-3'} xs={7} md={10}>*/}
        {/*        <div>{formatNumber(userReferralInfo?.totalAmount)}</div>*/}
        {/*      </Col>*/}
        {/*    </Row>*/}
        {/*  </div>*/}
        {/*</div>*/}
      </div>
    </Modal>
  );
};

export default ModalTopReferrers;
