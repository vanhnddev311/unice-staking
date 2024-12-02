import Footer from '@/common/components/Footer';
import PageHeader from '@/common/components/Header';
import { AppContext } from '@/common/providers/contexts';
import { addReferral, getNonce, loginUser, postReferral } from '@/common/services/login';
import { setIsLogin, setTheme } from '@/common/stores/actions/appAction';
import { ellipseAddressNFT, getDiff } from '@/utils';
import { Layout, notification } from 'antd';
import { NotificationPlacement } from 'antd/es/notification';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useAccount } from 'wagmi';
import { getData, removeData, setData } from '../hooks/useLocalStoragre';

const WARNING_TIMEOUT = 5;

const { Content } = Layout;

const PageLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { userInfo, refetchUserInfo } = useContext(AppContext);
  const router = useRouter();
  const dispatch = useDispatch();
  const { address } = useAccount();

  useEffect(() => {
    if (address) refetchUserInfo();
  }, [address]);

  useEffect(() => {
    const currentTheme = getData('theme');
    if (!currentTheme) {
      setData('theme', 'dark');
      dispatch(setTheme('dark'));
    }
  }, []);

  useEffect(() => {
    (async () => {
      if (router.query.r && userInfo && router.query.r != userInfo?.referralCode) {
        await postReferral({ addr: address, referralCode: router.query.r as string });
        refetchUserInfo();
      }
    })();
  }, [router, userInfo]);

  const openNotification = (placement: NotificationPlacement) => {
    notification.error({
      message: `You changed your account, please reconnect the wallet !`,
      placement,
      duration: WARNING_TIMEOUT,
    });
  };

  return (
    <div>
      <Layout className={'relative min-h-screen overflow-hidden bg-none dark:bg-none'}>
        <div className={'relative w-full z-30'}>
          <PageHeader />
        </div>
        <Content className={'relative z-20'}>
          <div className="relative z-10 h-full px-3">{children}</div>
        </Content>
        <div className={'relative w-full z-10'}>
          <Footer />
        </div>
      </Layout>
    </div>
  );
};

export default PageLayout;
