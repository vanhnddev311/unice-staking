import { THEME } from '@/common/components/Header';
import { DiscordIcon, DocsIcon1, TelegramIcon, TwitterIcon } from '@/common/components/icon/common';
import { copyToClipboard } from '@/utils';
import { Tooltip } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const Footer: React.FunctionComponent = () => {
  const [copyText, setCopyText] = useState('Copy');
  const [currentTheme, setCurrentTheme] = useState<THEME>(THEME.DARK);
  const app = useSelector((state: any) => state.app);

  useEffect(() => {
    setCurrentTheme(app?.theme == 'light' ? THEME.DARK : THEME.DARK);
  }, [app]);

  const handleCopy = (value: string) => {
    setCopyText('Copied!');
    setTimeout(() => {
      setCopyText('Copy');
    }, 2000);
    copyToClipboard(value);
  };

  return (
    <div
      className={
        'relative footer w-full border-t border-[#E7E7E8] dark:border-[#2B2B2D] bg-[#F6F6F6] dark:bg-[#1C1D25] py-4 px-4 sm:px-6'
      }
    >
      <div
        className={
          'max-w-[1440px] flex flex-col-reverse sm:flex-row items-center justify-between font-dmsans mx-auto gap-6'
        }
      >
        <div className={'text-[#8D8E92]'}>© 2024 Unice Lab Pte., Ltd.</div>
        <div className={'flex items-center gap-4'}>
          <Link href={'https://twitter.com/unicelab'} target={'_blank'}>
            <TwitterIcon />
          </Link>
          <Link href={'https://t.me/unicemember'} target={'_blank'}>
            <TelegramIcon />
          </Link>
          <Link href={'https://twitter.com/unicelab'} target={'_blank'}>
            <DiscordIcon />
          </Link>
          <Link href={'https://docs.unicelab.io/'} target={'_blank'}>
            <DocsIcon1 />
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Footer;
