import { Tooltip } from 'antd';
import classNames from 'classnames';
import React, { useCallback, useState } from 'react';
import Skeleton from '../../Skeleton';

interface TProps {
  logoSrc?: string;
  className?: string;
  token?: any;
  size?: number;
  isShowSymbol?: boolean;
  isFetching?: boolean;
}

// Use size instead of className to set the size of images
const CoinIcon: React.FC<TProps> = ({ logoSrc, size = 24, className, token, isShowSymbol = false, isFetching }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const onImgError = () => {
    setIsLoaded(false);
  };
  const onImgLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  const bridgeArray = token?.extensions.data.find((a: any) => a[0] === 'bridge');
  const bridge = (bridgeArray && bridgeArray[1]) ?? '';

  return (
    <div className={classNames('relative', className)} style={{ width: `${size}px`, height: `${size}px` }}>
      {(!logoSrc || isFetching) && (
        <Skeleton className="absolute left-0 top-0 w-full h-full" circle={true} height={'100%'} />
      )}
      <Tooltip
        title={isShowSymbol && token && `${token?.official_symbol}${bridge !== 'native' ? `(${bridge})` : ''}`}
        placement="top"
      >
        {logoSrc && (
          <img
            src={logoSrc}
            className={classNames('w-ful h-full rounded-full', { invisible: !isLoaded })}
            alt="coin icon"
            onError={onImgError}
            onLoad={onImgLoad}
          />
        )}
      </Tooltip>
    </div>
  );
};

export default CoinIcon;
