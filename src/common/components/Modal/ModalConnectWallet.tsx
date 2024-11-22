import fewcha from '@/common/assets/images/logo-fewcha.png';

import { CloseIcon, DotIcon } from '@/common/components/icon/common';
import { config } from '@/common/consts';
import { showConnect } from '@/common/stores/actions/appAction';
import { Modal } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { isIOS, isMobile } from 'react-device-detect';
import { useDispatch } from 'react-redux';
import { Connector, useConnect } from 'wagmi';

interface Props {
  isModalOpen: boolean;
  handleClose: () => void;
}

enum WalletName {
  Petra = 'Petra',
  Pontem = 'Pontem',
  Martian = 'Martian',
  Fewcha = 'Fewcha',
  RiseWallet = 'Rise Wallet',
  OKXWallet = 'OKX Wallet',
}

const ModalConnectWallet: React.FunctionComponent<Props> = ({ isModalOpen, handleClose }) => {
  const { connectors, connect } = useConnect();
  const [connectSuccess, setConnectSuccess] = useState(false);
  const dispatch = useDispatch();

  const [isOkApp, setIsOkApp] = useState(false);
  const [encodedUrl, setEncodedUrl] = useState('');

  useEffect(() => {
    const ua = navigator.userAgent;
    const check = /OKApp/i.test(ua);
    setIsOkApp(check);
    const url =
      'https://www.okx.com/download?deeplink=' +
      encodeURIComponent('okx://wallet/dapp/url?dappUrl=' + encodeURIComponent(location.href));
    setEncodedUrl(url);
  }, []);

  // useEffect(() => {
  //   (async () => {
  //     if (connectSuccess) {
  //       await handleSignMessage();
  //     }
  //   })();
  // }, [connectSuccess]);

  // const handleSignMessage = async () => {
  //   try {
  //     // const {data} = await getMessage({publicKey: account?.publicKey as string});
  //     const nonce = await getNonce(account?.address as string);
  //     const res: any = (await signMessage({
  //       address: false,
  //       message: `Click to sign in and accept the MOVEGPT Terms of Service. This request will not cost any gas fees.`,
  //       nonce: nonce.nonce,
  //     })) as SignMessageResponse;
  //     if (res) {
  //       const resLogin = await loginUser({
  //         addr: account?.address as string,
  //         massage: res.fullMessage,
  //         signature: res.signature.data
  //           ? new Buffer(res.signature).toString('hex')
  //           : typeof res.signature === 'string'
  //             ? res.signature
  //             : HexString.fromUint8Array(res.signature as any).toString(),
  //         publicKey: account?.publicKey as string,
  //       });
  //       setData('accessToken', resLogin.data.token);
  //       await refetchUser();
  //       setConnectSuccess(false);
  //     } else {
  //       setConnectSuccess(false);
  //       await removeData('accessToken');
  //       await disconnect();
  //     }
  //   } catch (e) {
  //     console.log('e', e);
  //     setConnectSuccess(false);
  //     await removeData('accessToken');
  //     await disconnect();
  //   }
  // };

  return (
    <Modal
      className={'modal-customize'}
      centered
      open={isModalOpen}
      footer={false}
      title={''}
      onCancel={handleClose}
      width={526}
      closable={false}
    >
      <div className={'py-2'}>
        <div className={'flex justify-between items-center'}>
          <div className={'text-[#131316] dark:text-[#E7E7E8] text-2xl font-bold mb-2'}>Connect wallet</div>
          <div onClick={handleClose} className={'bg-none dark:bg-[#14141A] rounded-full p-2 cursor-pointer'}>
            <CloseIcon />
          </div>
        </div>
        <div className={'text-base text-[#8E929B]'}>Choose a wallet you want connect to</div>
        <div className={'mt-5'}>
          <ul className={'space-y-3'}>
            {connectors.map((connector: Connector) => {
              return (
                <li
                  onClick={() => {
                    connect({ connector });
                    handleClose();
                  }}
                  className={'wallet-item cursor-pointer p-4 rounded-[6px]'}
                  key={connector.uid}
                >
                  <div className={'flex justify-between items-center'}>
                    <div className={'w-full flex justify-between items-center'}>
                      <div className={'flex items-center gap-3'}>
                        <img className={'w-[40px] h-auto rounded-full'} src={connector.icon} alt="" />
                        <div>
                          <div
                            className={'text-[#131316] dark:text-white font-semibold text-base sm:text-lg sm:leading-5'}
                          >
                            {connector.name}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </Modal>
  );
};
export default ModalConnectWallet;
