import { routes } from '@/common/components/Header/routers';
import { GasIcon, HotIcon, WalletIcon } from '@/common/components/icon/common';
import ModalConnectWallet from '@/common/components/Modal/ModalConnectWallet';
import ModalNotification from '@/common/components/Modal/ModalNotification';
import ModalReceiveBnb from '@/common/components/Views/Staking/ModalReceiveBnb';
import { config } from '@/common/configs/config';
import { setData } from '@/common/hooks/useLocalStoragre';
import { useModal } from '@/common/hooks/useModal';
import { login } from '@/common/services/login';
import { setTheme, showConnect } from '@/common/stores/actions/appAction';
import { STATUS } from '@/common/types/comon';
import { ellipseAddress } from '@/utils';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { signMessage } from '@wagmi/core';
import { Drawer, Layout, Menu, notification } from 'antd';
import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAccount, useBalance, useClient, useDisconnect, useSwitchChain } from 'wagmi';

const { Header } = Layout;

export enum THEME {
  LIGHT = 'light',
  DARK = 'dark',
}

const PageHeader: React.FunctionComponent = () => {
  const router = useRouter();
  const param: any = router.query;
  const app = useSelector((state: any) => state.app);
  const [mode, setMode] = useState(true);
  const [currentTheme, setCurrentTheme] = useState<THEME>(THEME.DARK);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [receiveBnbStatus, setReceiveBnbStatus] = useState<STATUS>(STATUS.PENDING);

  const { show, setShow, toggle } = useModal();
  const { show: showReceiveBnb, setShow: setShowReceiveBnb, toggle: toggleShowReceiveBnb } = useModal();
  const dispatch = useDispatch();
  const { address } = useAccount();
  const { switchChainAsync } = useSwitchChain();
  const { disconnect } = useDisconnect();
  const { connector, chainId } = useAccount();
  const client = useClient();

  const { data: balanceBnb, refetch } = useBalance({
    address,
    chainId: client?.chain?.id,
  });

  const checkAndSwitchNetwork = async () => {
    const targetChainId = client?.chain.id ?? 1;
    if (connector) {
      try {
        if (chainId !== targetChainId) {
          try {
            await switchChainAsync({ chainId: targetChainId });
            await refetch();
            console.log('switched network');
          } catch (error) {
            console.error('Failed to switch network:', error);
          }
        }
      } catch (error) {
        console.error('Failed to get network:', error);
      }
    }
  };

  const handleSignMessage = async () => {
    const hash = await signMessage(config, {
      connector,
      message: 'UNICE Staking',
    });

    await login({
      addr: address,
      message: 'UNICE Staking',
      signature: hash,
    });
  };

  const handleRecieveBnb = async () => {
    setShow(false);
    setShowReceiveBnb(true);
    setReceiveBnbStatus(STATUS.PENDING);
    await handleSignMessage();
    setReceiveBnbStatus(STATUS.SUCCESS);
  };

  useEffect(() => {
    if (connector) {
      checkAndSwitchNetwork();
    }
  }, [chainId, connector]);

  // useEffect(() => {
  //   if (balanceBnb && Number(balanceBnb?.value) < 0.01) {
  //     setShow(true);
  //   }
  // }, [balanceBnb]);

  useEffect(() => {
    document.body.dataset.theme = app.theme;
    setCurrentTheme(app?.theme == 'light' ? THEME.DARK : THEME.DARK);
    setMode(app.theme === 'dark');
  }, [app]);

  function openNewTab(url: string) {
    window.open(url, '_blank');
  }

  const SideMenu = ({ currentPageName, onRouteSelected }: any) => {
    return (
      <div className="h-full flex flex-col justify-between">
        <div className="w-full flex flex-col">
          {routes
            .filter((r) => r.path !== '*' && !r.hidden)
            .map(({ name, path, target, hot, comingSoon }, index) => {
              const isCurrent = currentPageName.toLowerCase().includes(name.toLowerCase());
              return (
                <Link
                  href={!target ? `/${path}` : path}
                  target={target ? '_blank' : ''}
                  key={`${name}-${index}-${isCurrent}`}
                  onClick={() => {
                    if (comingSoon) {
                      notification.warning({ message: 'Coming Soon!' });
                      return;
                    }
                    onRouteSelected();
                  }}
                  className={classNames(
                    'w-full font-semibold text-[#131316] relative py-4 dark:text-[#E8E8E8] menuItem',
                    {
                      'hip-btn-selected': isCurrent,

                      // hot: hot,
                    },
                  )}
                >
                  <div className={'relative w-fit'}>
                    {name}
                    <div className={`absolute right-[-20px] top-[-16px] ${!hot && 'hidden'}`}>
                      <HotIcon />
                    </div>
                  </div>
                </Link>
              );
            })}
        </div>
      </div>
    );
  };

  const renderNavItems: any = () => {
    return routes.map(({ name, path, hidden, type, target, comingSoon, hot }: any) => {
      if (path === '*' || hidden) return null;
      const currentPageName = router.asPath;
      const isCurrent = currentPageName.toLowerCase().includes(path.toLowerCase());
      return (
        <Menu.Item className={``} key={name}>
          {(type === 'Page' || !type) && (
            <a
              onClick={() => {
                const myObject: any = {};
                const dynamicKey = Object.keys(param)[0];
                myObject[dynamicKey] = dynamicKey;
                if (comingSoon) {
                  notification.warning({ message: 'Coming Soon!' });
                  return;
                }
                if (target) {
                  openNewTab(path);
                } else {
                  router.push({
                    pathname: `/${path}`,
                    // query: Object.keys(param).length > 0 ? param : undefined,
                  });
                }
              }}
              target={target ? '_blank' : ''}
              className={`flex items-center w-full h-full text-base font-medium nav-link px-2 hover:text-[#4A7DFF]
              
              `}
            >
              {name}
              {/*<div className={`absolute right-8 top-3 ${!hot && 'hidden'}`}>*/}
              {/*  <HotIcon />*/}
              {/*</div>*/}
            </a>
          )}
        </Menu.Item>
      );
    });
  };

  const toggleModalConnect = () => {
    dispatch(showConnect(!app.showConnect));
  };

  const isBlockVPN = router.pathname.includes('/error');

  return (
    <Header
      className={`header z-20 w-full fixed flex items-center pb-0 h-[58px] sm:h-[72px] mobile:py-2 mobile:h-[56px] px-6`}
    >
      <div className="mx-auto container max-w-[1440px] h-full w-full top-0 left-0 flex justify-between items-center relative">
        <div className={'left-0 top-0 flex items-center relative'}>
          <Link
            href={'/'}
            className={'flex gap-[10px] items-center relative'}
            target={'_blank'}
            aria-label={'Go to home'}
          >
            <Image
              className="block sm:hidden logo w-auto h-[24px]"
              src={require('@/common/assets/images/logo-mb.png')}
              alt=""
            />
            <Image
              className="hidden sm:block logo w-auto h-[24px] sm:h-[32px]"
              src={require('@/common/assets/images/staking/unice-logo 1.png')}
              alt=""
            />
          </Link>
        </div>
        {!isBlockVPN && (
          <div className="grow items-center justify-start h-full hidden md:block">
            <Menu
              mode="horizontal"
              theme="dark"
              className={'flex justify-center h-full min-w-[200px] w-full !bg-transparent'}
            >
              {renderNavItems()}
            </Menu>
          </div>
        )}
        {address && address?.toString()?.length > 0 ? (
          <div
            onClick={() => disconnect()}
            className={'flex items-center rounded-full border border-[#33343E] bg-[#1C1D25] gap-2 p-2 cursor-pointer'}
          >
            <WalletIcon />
            <div className={'text-sm sm:text-base text-[#fff] font-medium uppercase'}>{ellipseAddress(address, 5)}</div>
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="5" viewBox="0 0 10 5" fill="none">
              <path d="M1 0.499023L5 3.50098L9 0.499023" stroke="white" strokeOpacity="0.4" />
            </svg>
          </div>
        ) : (
          <ConnectButton />
        )}
      </div>
      <div className={'ml-4 p-2 border rounded-full border-[#33343E] block md:hidden'}>
        <svg
          onClick={() => setIsSideMenuOpen(true)}
          className={`${!isSideMenuOpen ? 'block' : 'hidden'}`}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M6 8H18M6 12H18M6 16H18"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <svg
          onClick={() => setIsSideMenuOpen(false)}
          className={`${isSideMenuOpen ? 'block' : 'hidden'}`}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M6.758 17.2431L12.001 12.0001L17.244 17.2431M17.244 6.75708L12 12.0001L6.758 6.75708"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <Drawer open={isSideMenuOpen} placement="right" closable={false} onClose={() => setIsSideMenuOpen(false)}>
        <SideMenu currentPageName={router.asPath} onRouteSelected={() => setIsSideMenuOpen(false)} />
      </Drawer>

      <ModalConnectWallet isModalOpen={app.showConnect} handleClose={toggleModalConnect} />
      <ModalNotification
        type={'CUSTOM'}
        width={384}
        iconTitle={<GasIcon />}
        title={'Oops!!!'}
        desc={"Your BNB balance is too low, but don't worry; UNICE Lab will send BNB to cover the gas fee."}
        isModalOpen={!!show}
        buttonTitle={'I understand'}
        handleClose={toggle}
        confirmAction={handleRecieveBnb}
      />
      <ModalReceiveBnb
        status={receiveBnbStatus}
        show={showReceiveBnb}
        message={'hehe'}
        toggle={toggleShowReceiveBnb}
        setShow={setShowReceiveBnb}
      />
    </Header>
  );
};
export default PageHeader;
