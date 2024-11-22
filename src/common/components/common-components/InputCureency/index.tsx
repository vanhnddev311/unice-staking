import PositiveFloatNumInput from '@/common/components/PositiveFloatNumInput';
import { APTIcon } from '@/common/components/icon/common';
import { useModal } from '@/common/hooks/useModal';
import { formatNumber, formatNumberBalance } from '@/utils';
import Image from 'next/image';
import React, { useMemo } from 'react';
import Skeleton from '../../Skeleton';

interface InputProps {
  max?: number;
  min?: number;
  handleChange?: (value: string) => void;
  amount: string;
  token: any;
  balance: any;
  subTitle?: string;
  setShowTokens?: (value: boolean) => void;
  disabled?: boolean;
  isAllowDecimal?: boolean;
  isOnSelected?: boolean;
  setTokenSelected?: any;
  enableUseMax?: boolean;
  label?: string;
  hiddenBalance?: boolean;
  className?: string;
  maxDecimals?: number;
  loading?: boolean;
  enableBalance?: string;
}

const MIN_AMOUNT_DEFAULT = 0.15;

const InputCurrency: React.FunctionComponent<InputProps> = ({
  handleChange,
  amount,
  token,
  balance,
  subTitle,
  disabled = false,
  isAllowDecimal,
  isOnSelected = true,
  loading = false,
  enableUseMax,
  label,
  hiddenBalance = false,
  maxDecimals,
  className,
  max,
  enableBalance = '',
}) => {
  const { setShow: setShowModalTokens } = useModal();

  const useMaxBalance = () => {
    enableUseMax && !!handleChange && handleChange?.(String(MaxBalance));
  };

  const MaxBalance = useMemo(() => {
    const blBigIntUnit = balance * Math.pow(10, 8) - MIN_AMOUNT_DEFAULT * Math.pow(10, 8);
    if (token?.symbol === 'APT' && balance > 0.15) {
      return (blBigIntUnit / Math.pow(10, 8)).toFixed(token.decimals);
    } else if (token?.symbol === 'APT' && balance <= 0.15) {
      return 0;
    } else {
      return balance;
    }
  }, [balance, token]);

  const onChangeInput = (value: any) => {
    handleChange?.(value);
  };

  return (
    <div className={`${className} bg-[#101119] p-4 `}>
      {label && (
        <div className={'flex justify-between text-default mb-6'}>
          <div className={'text-base text-[#8E929B]'}>{label}</div>
          {!hiddenBalance && (
            <div className={'flex items-center justify-between'}>
              {loading ? (
                <span className="loader-spin"></span>
              ) : (
                <div className={'text-gray-400'}>${formatNumberBalance(Number(amount) * token?.price, 4)}</div>
              )}
              <div onClick={useMaxBalance} className={'text-base text-[#8E929B] cursor-pointer'}>
                {subTitle ? subTitle : 'Balance'}: {''}
                <span className={''}>{`${formatNumber(balance, 2)}`}</span>
              </div>
            </div>
          )}
          {enableBalance == 'top' && (
            <div className="text-right pr-2 text-sm">
              <span className="cursor-pointer" onClick={useMaxBalance}>
                <span className="text-default">Max: </span>
                <span className="text-white">{`${formatNumber(balance, 2)}`}</span>
              </span>
            </div>
          )}
        </div>
      )}
      <div className={'currency-input'}>
        <span className={'currency-input__from'}>
          <PositiveFloatNumInput
            max={max ?? 1000000000}
            placeholder={'0.00'}
            maxDecimals={maxDecimals}
            className={`w-full bg-transparent border-0 h-full text-default font-medium pl-0 text-[24px] sm:text-[32px]`}
            isAllowDecimal={isAllowDecimal}
            isDisabled={disabled}
            inputAmount={amount}
            onInputChange={onChangeInput}
            showCommas
          />
        </span>
        {/*<span*/}
        {/*  onClick={() => isOnSelected && setShowModalTokens(true)}*/}
        {/*  className={*/}
        {/*    'rounded-full border border-[#434548] bg-[#14161A] flex items-center justify-center py-1 px-4 sm:px-3 gap-2 cursor-pointer h-auto'*/}
        {/*  }*/}
        {/*>*/}
        {/*  {token && token.symbol === 'MGPT' ? (*/}
        {/*    // <CoinIcon*/}
        {/*    //   className={'w-[20px] h-[20px] mr-1'}*/}
        {/*    //   logoSrc={``}*/}
        {/*    //   isFetching={false}*/}
        {/*    // />*/}
        {/*    // <MoveGPTIcon />*/}
        {/*    <Image*/}
        {/*      className={'w-[24px] h-[24px]'}*/}
        {/*      src={require('@/common/assets/images/moveGPTTokenNoBG.png')}*/}
        {/*      alt={''}*/}
        {/*    />*/}
        {/*  ) : (*/}
        {/*    <APTIcon />*/}
        {/*  )}*/}
        {/*  <div className={'text-start text-[#000] font-semibold h-full items-center flex gap-1'}>*/}
        {/*    {!token?.symbol && <Skeleton className="w-[60px] h-[20px] mb-1" />}*/}
        {/*    {!!token?.symbol && (*/}
        {/*      <div>*/}
        {/*        <div className={'leading-none text-[#FFFFFF] text-base'}>{token?.symbol}</div>*/}
        {/*      </div>*/}
        {/*    )}*/}
        {/*  </div>*/}
        {/*</span>*/}
        <div className="text-right pr-2 text-sm">
          <span className="text-[#fff] rounded-[8px] cursor-pointer px-2 py-1 bg-[#272830]" onClick={useMaxBalance}>
            Max
          </span>
        </div>
      </div>

      {enableBalance == 'bottom' && (
        <div className="text-right pr-2 text-sm">
          <span className="cursor-pointer" onClick={useMaxBalance}>
            <span className="text-default">Max: </span>
            <span>{`${formatNumber(balance, 2)}`}</span>
          </span>
        </div>
      )}

      {/*<ModalTokens*/}
      {/*  setTokenSelected={setTokenSelected}*/}
      {/*  isModalOpen={!!showModalTokens}*/}
      {/*  handleClose={toggleModalTokens}*/}
      {/*/>*/}
    </div>
  );
};
export default InputCurrency;
