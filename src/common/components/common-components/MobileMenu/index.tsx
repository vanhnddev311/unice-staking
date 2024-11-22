import { LargeArrowDownIcon, LargeArrowUpIcon } from '@/common/components/icon/common';
import React, { useEffect, useRef, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import styles from './BottomMenu.module.css';

const BottomMenu: React.FunctionComponent<{ campaign?: Campaign; childCmp: any; title: any; currentStep?: number }> = ({
  campaign,
  childCmp,
  title,
  currentStep,
}) => {
  const [visible, setVisible] = useState(false);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [contentHeight, setContentHeight] = useState('0px');

  const toggleComponent = () => {
    setVisible((prev) => !prev);
  };

  useEffect(() => {
    if (visible && contentRef.current) {
      setContentHeight(`${contentRef.current.scrollHeight}px`);
    } else {
      setContentHeight('0px');
    }
  }, [visible]);

  const handlers = useSwipeable({
    onSwipedUp: () => setVisible(true),
    onSwipedDown: () => setVisible(false),
    // preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  return (
    <div className={styles.container} {...handlers}>
      <div
        onClick={toggleComponent}
        className={
          'relative w-full flex justify-between items-center bg-[#fff] rounded-t-[16px] text-start text-[18px] text-default font-bold py-4 px-5 z-50'
        }
      >
        {title}
        <span className={`${styles.arrow} ${visible ? styles.arrowUp : styles.arrowDown}`}>
          {!visible ? <LargeArrowDownIcon /> : <LargeArrowUpIcon />}
        </span>
      </div>
      <div
        ref={contentRef}
        style={{
          height: contentHeight,
          transition: 'height 0.3s ease, opacity 0.3s ease',
          opacity: visible ? 1 : 0,
        }}
        className={`${styles.menu} ${visible ? styles.visible : ''}`}
      >
        {childCmp}
      </div>
      {visible && <div className={styles.blurOverlay} onClick={() => setVisible(false)} />}
    </div>
  );
};

export default BottomMenu;
