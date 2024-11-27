import React from 'react';

export const APTIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_1496_101)">
      <circle cx="10" cy="10" r="10" fill="white" />
      <path
        d="M14.5746 6.94691H13.1004C12.9286 6.94691 12.7652 6.86767 12.6515 6.72975L12.0535 6.0035C11.9644 5.89511 11.8361 5.83344 11.7019 5.83344C11.5677 5.83344 11.4394 5.89548 11.3504 6.0035L10.8376 6.62659C10.6696 6.8303 10.4287 6.94729 10.1755 6.94729H2.10575C1.87592 7.65148 1.72606 8.39529 1.66626 9.16677H9.28437C9.41824 9.16677 9.54654 9.10808 9.63903 9.00418L10.3483 8.20841C10.437 8.10898 10.5594 8.05292 10.6873 8.05292H10.7165C10.8511 8.05292 10.9791 8.11496 11.0681 8.22336L11.6658 8.9496C11.7795 9.0879 11.9429 9.16677 12.1147 9.16677H18.3329C18.2731 8.39492 18.1233 7.65111 17.8934 6.94729H14.5743L14.5746 6.94691Z"
        fill="black"
      />
      <path
        d="M6.22418 13.3334C6.35992 13.3334 6.49001 13.2751 6.5838 13.1719L7.30302 12.3814C7.39293 12.2827 7.51703 12.227 7.64677 12.227H7.67638C7.81283 12.227 7.94257 12.2886 8.03282 12.3959L8.63888 13.1173C8.75417 13.2547 8.91987 13.333 9.09404 13.333H17.6387C17.9589 12.6365 18.1933 11.8891 18.3329 11.1061H10.1313C9.95711 11.1061 9.7914 11.0274 9.67612 10.8904L9.07006 10.169C8.97981 10.0613 8.84971 10 8.71362 10C8.57753 10 8.44744 10.0617 8.35718 10.169L7.83715 10.7879C7.66687 10.9902 7.42254 11.1065 7.16552 11.1065H1.66626C1.80587 11.8895 2.04068 12.6369 2.36045 13.3334H6.22418Z"
        fill="black"
      />
      <path
        d="M12.2469 5.00017C12.3804 5.00017 12.5083 4.9457 12.6005 4.84926L13.3076 4.11064C13.396 4.01835 13.518 3.96631 13.6455 3.96631H13.6746C13.8088 3.96631 13.9363 4.0239 14.025 4.12451L14.6209 4.7986C14.7342 4.92697 14.8971 5.00017 15.0683 5.00017H16.6659C15.1446 2.97617 12.7249 1.66684 9.99919 1.66684C7.27346 1.66684 4.85378 2.97617 3.33252 5.00017H12.2469Z"
        fill="black"
      />
      <path
        d="M9.08048 15.3345H6.98987C6.82602 15.3345 6.67013 15.2514 6.56167 15.1068L5.9915 14.3452C5.90659 14.2315 5.7842 14.1668 5.65617 14.1668C5.52814 14.1668 5.40575 14.2319 5.32083 14.3452L4.8316 14.9986C4.6714 15.2122 4.44154 15.3349 4.19974 15.3349H4.16724C5.62366 17.1791 7.69769 18.3335 10.0006 18.3335C12.3035 18.3335 14.3771 17.1791 15.8339 15.3349H9.08048V15.3345Z"
        fill="black"
      />
    </g>
    <defs>
      <clipPath id="clip0_1496_101">
        <rect width="20" height="20" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export const SuccessIcon = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="80" height="80" rx="40" fill="#0478FF" fillOpacity="0.2" />
    <path
      d="M35.0004 53.0328L24.6504 42.6828L29.3671 37.9661L35.0004 43.6161L51.4671 27.1328L56.1837 31.8495L35.0004 53.0328Z"
      fill="#4A7DFF"
    />
  </svg>
);

export const DotIcon: React.FunctionComponent<{ fill?: string }> = ({ fill = '#C2E23D' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
    <circle cx="4" cy="4" r="4" fill={fill} />
  </svg>
);

export const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14.0291 2.63763C14.3812 2.98976 14.3812 3.56067 14.0291 3.9128L9.60848 8.33338L14.0291 12.7539C14.3812 13.106 14.3812 13.677 14.0291 14.0291C13.677 14.3812 13.106 14.3812 12.7539 14.0291L8.33331 9.60854L3.91273 14.0291C3.5606 14.3812 2.98969 14.3812 2.63756 14.0291C2.28544 13.677 2.28544 13.106 2.63756 12.7539L7.05815 8.33338L2.63756 3.9128C2.28544 3.56067 2.28544 2.98976 2.63756 2.63763C2.98969 2.28551 3.5606 2.28551 3.91273 2.63763L8.33331 7.05822L12.7539 2.63763C13.106 2.28551 13.677 2.28551 14.0291 2.63763Z"
      fill="#717681"
    />
  </svg>
);

export const ArrowDownIcon: React.FunctionComponent<{ fill: string }> = ({ fill }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M4.6665 6.66667L7.99984 10"
      stroke={fill}
      strokeWidth="1.33333"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M8 10L11.3333 6.66667" stroke={fill} strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const LargeArrowDownIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M17 14L12 9" stroke="#89898B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 9L7 14" stroke="#89898B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const LargeArrowUpIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
    <path d="M7.5 10L12.5 15" stroke="#89898B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12.5 15L17.5 10" stroke="#89898B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const CopyIcon: React.FunctionComponent<{ width?: number; height?: number }> = ({ width = 24, height = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
    <path
      d="M4.75599 17H11.578C12.889 17 13.9645 16.016 14.1325 14.75H14.578C15.2644 14.7492 15.9225 14.4762 16.4078 13.9908C16.8932 13.5055 17.1662 12.8474 17.167 12.161V4.589C17.1662 3.9026 16.8932 3.24454 16.4078 2.75918C15.9225 2.27382 15.2644 2.00079 14.578 2H7.75599C7.06959 2.00079 6.41153 2.27382 5.92617 2.75918C5.44081 3.24454 5.16779 3.9026 5.16699 4.589V5H4.75599C4.06959 5.00079 3.41153 5.27382 2.92617 5.75918C2.44081 6.24454 2.16779 6.9026 2.16699 7.589V14.411C2.16779 15.0974 2.44081 15.7555 2.92617 16.2408C3.41153 16.7262 4.06959 16.9992 4.75599 17ZM6.66699 4.589C6.66699 3.989 7.15524 3.5 7.75599 3.5H14.578C15.178 3.5 15.667 3.98825 15.667 4.589V12.161C15.667 12.761 15.1787 13.25 14.578 13.25H14.167V7.589C14.1662 6.9026 13.8932 6.24454 13.4078 5.75918C12.9225 5.27382 12.2644 5.00079 11.578 5H6.66699V4.589ZM3.66699 7.589C3.66699 6.989 4.15524 6.5 4.75599 6.5H11.578C12.178 6.5 12.667 6.98825 12.667 7.589V14.411C12.667 15.011 12.1787 15.5 11.578 15.5H4.75599C4.15599 15.5 3.66699 15.0118 3.66699 14.411V7.589Z"
      fill="#89898B"
    />
  </svg>
);

// export const PendingIcon = () => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     xmlnsXlink="http://www.w3.org/1999/xlink"
//     style={{
//       margin: 'auto',
//       background: 'none',
//       display: 'block',
//       shapeRendering: 'auto',
//       width: '52px',
//       height: '52px',
//       // borderRadius: '12px',
//     }}
//     viewBox="0 0 100 100"
//     preserveAspectRatio="xMidYMid"
//   >
//     <circle
//       cx="50"
//       cy="50"
//       fill="none"
//       stroke="#4A7DFF"
//       strokeWidth="10"
//       strokeLinecap="round"
//       r="32"
//       strokeDasharray="150.79644737231007 52.26548245743669"
//     >
//       <animateTransform
//         attributeName="transform"
//         type="rotate"
//         repeatCount="indefinite"
//         dur="1s"
//         values="0 50 50;360 50 50"
//         keyTimes="0;1"
//       ></animateTransform>
//     </circle>
//   </svg>
// );

export const PendingIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    style={{
      margin: 'auto',
      background: 'none',
      display: 'block',
      shapeRendering: 'auto',
      width: '52px',
      height: '52px',
      // borderRadius: '12px',
    }}
    viewBox="0 0 100 100"
    preserveAspectRatio="xMidYMid"
  >
    <circle
      cx="50"
      cy="50"
      fill="none"
      stroke="#4A7DFF"
      strokeWidth="10"
      strokeLinecap="round"
      r="32"
      strokeDasharray="150.79644737231007 52.26548245743669"
    >
      <animateTransform
        attributeName="transform"
        type="rotate"
        repeatCount="indefinite"
        dur="1s"
        values="0 50 50;360 50 50"
        keyTimes="0;1"
      ></animateTransform>
    </circle>
  </svg>
);

export const LoadingIcon1 = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    style={{
      margin: 'auto',
      background: 'none',
      display: 'block',
      shapeRendering: 'auto',
      width: '48px',
      height: '48px',
    }}
    viewBox="0 0 100 100"
    preserveAspectRatio="xMidYMid"
  >
    <circle
      cx="50"
      cy="50"
      fill="none"
      stroke="#717173"
      strokeWidth="10"
      strokeLinecap={'round'}
      r="32"
      strokeDasharray="150.79644737231007 52.26548245743669"
    >
      <animateTransform
        attributeName="transform"
        type="rotate"
        repeatCount="indefinite"
        dur="1s"
        values="0 50 50;360 50 50"
        keyTimes="0;1"
      ></animateTransform>
    </circle>
  </svg>
);

export const FailedIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="80" height="81" viewBox="0 0 80 81" fill="none">
    <g clipPath="url(#clip0_7740_26472)">
      <path
        d="M77.5828 20.6031C75.4828 12.8734 67.4437 4.83281 59.7125 2.73281C54.9719 1.55156 48.6219 0.334375 40 0.3125C31.3813 0.334375 25.0312 1.55156 20.2906 2.73281C12.5609 4.83281 4.52031 12.8719 2.42031 20.6031C1.23906 25.3422 0.021875 31.6938 0 40.3125C0.021875 48.9328 1.23906 55.2828 2.42031 60.0234C4.52031 67.7547 12.5609 75.7937 20.2906 77.8937C25.0312 79.075 31.3844 80.2922 40.0016 80.3125C48.6203 80.2922 54.9719 79.075 59.7125 77.8937C67.4437 75.7937 75.4828 67.7547 77.5828 60.0234C78.7641 55.2828 79.9813 48.9297 80.0016 40.3125C79.9813 31.6938 78.7641 25.3438 77.5828 20.6031Z"
        fill="#FFEEEC"
      />
      <path
        d="M40 13.7383C34.7439 13.7383 29.6058 15.2969 25.2356 18.2171C20.8653 21.1373 17.4591 25.2878 15.4478 30.1438C13.4364 34.9999 12.9102 40.3433 13.9357 45.4984C14.9613 50.6535 17.4925 55.3887 21.2092 59.1052C24.9259 62.8217 29.6613 65.3526 34.8164 66.3778C39.9716 67.4031 45.315 66.8766 50.1709 64.8649C55.0268 62.8533 59.1772 59.4469 62.0971 55.0764C65.017 50.706 66.5753 45.5678 66.575 40.3117C66.5746 33.2639 63.7745 26.5048 58.7908 21.5214C53.8071 16.5379 47.0479 13.7383 40 13.7383Z"
        fill="#FF5740"
      />
      <path
        d="M44.164 40.3116L50.9703 33.5069C51.5219 32.9544 51.8317 32.2056 51.8317 31.4249C51.8317 30.6442 51.5219 29.8954 50.9703 29.3429C50.4178 28.7913 49.669 28.4815 48.8883 28.4815C48.1075 28.4815 47.3587 28.7913 46.8062 29.3429L40 36.1491L33.1953 29.3429C32.6431 28.7907 31.8942 28.4805 31.1133 28.4805C30.3323 28.4805 29.5834 28.7907 29.0312 29.3429C28.479 29.8951 28.1688 30.644 28.1688 31.4249C28.1688 32.2058 28.479 32.9547 29.0312 33.5069L35.8375 40.3116L29.0312 47.1179C28.4797 47.6701 28.17 48.4187 28.17 49.1991C28.17 49.9796 28.4797 50.7281 29.0312 51.2804C29.3046 51.5539 29.6292 51.7708 29.9864 51.9188C30.3437 52.0669 30.7266 52.1431 31.1133 52.1431C31.5 52.1431 31.8829 52.0669 32.2401 51.9188C32.5973 51.7708 32.9219 51.5539 33.1953 51.2804L40 44.4757L46.8047 51.2804C47.3566 51.8326 48.1054 52.1429 48.8861 52.143C49.6669 52.1432 50.4158 51.8331 50.9679 51.2812C51.5201 50.7292 51.8304 49.9804 51.8306 49.1997C51.8307 48.4189 51.5207 47.6701 50.9687 47.1179L44.164 40.3116Z"
        fill="white"
      />
    </g>
    <defs>
      <clipPath id="clip0_7740_26472">
        <rect width="80" height="80" fill="white" transform="translate(0 0.3125)" />
      </clipPath>
    </defs>
  </svg>
);

export const WarningIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80" fill="none">
    <path
      d="M40 5C49.2826 5 58.185 8.68749 64.7487 15.2513C71.3125 21.815 75 30.7174 75 40C75 49.2826 71.3125 58.185 64.7487 64.7487C58.185 71.3125 49.2826 75 40 75C30.7174 75 21.815 71.3125 15.2513 64.7487C8.68749 58.185 5 49.2826 5 40C5 30.7174 8.68749 21.815 15.2513 15.2513C21.815 8.68749 30.7174 5 40 5ZM40 20C39.3652 19.9994 38.7372 20.1313 38.1563 20.3871C37.5753 20.6429 37.0541 21.0171 36.6259 21.4858C36.1977 21.9544 35.872 22.5072 35.6695 23.1089C35.467 23.7106 35.3923 24.3478 35.45 24.98L37.275 45.01C37.3458 45.6834 37.6634 46.3068 38.1665 46.7599C38.6697 47.213 39.3229 47.4637 40 47.4637C40.6771 47.4637 41.3303 47.213 41.8335 46.7599C42.3366 46.3068 42.6542 45.6834 42.725 45.01L44.545 24.98C44.6027 24.3482 44.5281 23.7114 44.3259 23.1101C44.1237 22.5088 43.7985 21.9562 43.3708 21.4876C42.9432 21.0191 42.4225 20.6448 41.8422 20.3886C41.2618 20.1325 40.6344 20.0001 40 20ZM40 60C41.0609 60 42.0783 59.5786 42.8284 58.8284C43.5786 58.0783 44 57.0609 44 56C44 54.9391 43.5786 53.9217 42.8284 53.1716C42.0783 52.4214 41.0609 52 40 52C38.9391 52 37.9217 52.4214 37.1716 53.1716C36.4214 53.9217 36 54.9391 36 56C36 57.0609 36.4214 58.0783 37.1716 58.8284C37.9217 59.5786 38.9391 60 40 60Z"
      fill="#FFAB2D"
    />
  </svg>
);

export const GasIcon = () => (
  <svg width="100" height="101" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect y="0.5" width="100" height="100" rx="50" fill="#693F25" />
    <g clipPath="url(#clip0_266_1376)">
      <path
        d="M56.25 65.5H31.25C30.5625 65.5 30 66.0625 30 66.75V69.25C30 69.9375 30.5625 70.5 31.25 70.5H56.25C56.9375 70.5 57.5 69.9375 57.5 69.25V66.75C57.5 66.0625 56.9375 65.5 56.25 65.5ZM68.5312 38.8828L62.2031 32.5547C61.7188 32.0703 60.9219 32.0703 60.4375 32.5547L59.5547 33.4375C59.0703 33.9219 59.0703 34.7188 59.5547 35.2031L62.5 38.1484V43C62.5 45.1953 64.1328 47.0078 66.25 47.3125V59.875C66.25 60.9062 65.4062 61.75 64.375 61.75C63.3438 61.75 62.5 60.9062 62.5 59.875V57.375C62.5 53.5781 59.4219 50.5 55.625 50.5H55V35.5C55 32.7422 52.7578 30.5 50 30.5H37.5C34.7422 30.5 32.5 32.7422 32.5 35.5V63H55V54.25H55.625C57.3516 54.25 58.75 55.6484 58.75 57.375V59.5469C58.75 62.4922 60.8594 65.1719 63.7891 65.4766C67.1484 65.8125 70 63.1719 70 59.875V42.4219C70 41.0938 69.4688 39.8203 68.5312 38.8828ZM50 45.5H37.5V35.5H50V45.5Z"
        fill="#FF9F2F"
      />
    </g>
    <defs>
      <clipPath id="clip0_266_1376">
        <rect width="40" height="40" fill="white" transform="translate(30 30.5)" />
      </clipPath>
    </defs>
  </svg>
);

export const StakingWarningIcon = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="80" height="80" rx="40" fill="#FF932F" fillOpacity="0.2" />
    <path
      d="M21.6667 55.0002L40 23.3335L58.3334 55.0002H21.6667ZM40 50.0002C40.4722 50.0002 40.8684 49.8402 41.1884 49.5202C41.5084 49.2002 41.6678 48.8046 41.6667 48.3335C41.6656 47.8624 41.5056 47.4668 41.1867 47.1468C40.8678 46.8268 40.4722 46.6668 40 46.6668C39.5278 46.6668 39.1322 46.8268 38.8134 47.1468C38.4945 47.4668 38.3345 47.8624 38.3334 48.3335C38.3322 48.8046 38.4922 49.2007 38.8134 49.5218C39.1345 49.8429 39.53 50.0024 40 50.0002ZM38.3334 45.0002H41.6667V36.6668H38.3334V45.0002Z"
      fill="#FF932F"
    />
  </svg>
);

export const LockIcon: React.FunctionComponent<{ fill: string; style: string }> = ({ fill = 'white', style }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none" className={style}>
    <path
      d="M4.25002 14.6667C3.88335 14.6667 3.56958 14.5363 3.30869 14.2754C3.0478 14.0145 2.91713 13.7005 2.91669 13.3334V6.66675C2.91669 6.30008 3.04735 5.9863 3.30869 5.72541C3.57002 5.46453 3.8838 5.33386 4.25002 5.33341H4.91669V4.00008C4.91669 3.07786 5.2418 2.29186 5.89202 1.64208C6.54224 0.992304 7.32824 0.667192 8.25002 0.666748C9.17224 0.666748 9.95847 0.991859 10.6087 1.64208C11.2589 2.2923 11.5838 3.0783 11.5834 4.00008V5.33341H12.25C12.6167 5.33341 12.9307 5.46408 13.192 5.72541C13.4534 5.98675 13.5838 6.30053 13.5834 6.66675V13.3334C13.5834 13.7001 13.4529 14.0141 13.192 14.2754C12.9311 14.5367 12.6171 14.6672 12.25 14.6667H4.25002ZM8.25002 11.3334C8.61669 11.3334 8.93069 11.203 9.19202 10.9421C9.45335 10.6812 9.5838 10.3672 9.58335 10.0001C9.58335 9.63341 9.45291 9.31964 9.19202 9.05875C8.93113 8.79786 8.61713 8.66719 8.25002 8.66675C7.88335 8.66675 7.56958 8.79741 7.30869 9.05875C7.0478 9.32008 6.91713 9.63386 6.91669 10.0001C6.91669 10.3667 7.04735 10.6807 7.30869 10.9421C7.57002 11.2034 7.8838 11.3339 8.25002 11.3334ZM6.25002 5.33341H10.25V4.00008C10.25 3.44453 10.0556 2.9723 9.66669 2.58341C9.2778 2.19453 8.80558 2.00008 8.25002 2.00008C7.69447 2.00008 7.22224 2.19453 6.83335 2.58341C6.44446 2.9723 6.25002 3.44453 6.25002 4.00008V5.33341Z"
      fill={fill}
    />
  </svg>
);

export const AdjustIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M20.25 16.875H18.2527C17.928 15.7942 16.935 15 15.75 15C14.565 15 13.5728 15.7942 13.2473 16.875H3.74999C3.33599 16.875 3 17.211 3 17.625C3 18.039 3.33599 18.375 3.74999 18.375H13.2472C13.572 19.4557 14.565 20.25 15.75 20.25C16.935 20.25 17.9272 19.4557 18.2527 18.375H20.25C20.6647 18.375 21 18.039 21 17.625C21 17.211 20.6647 16.875 20.25 16.875ZM15.75 18.75C15.1297 18.75 14.625 18.2453 14.625 17.625C14.625 17.0047 15.1297 16.5 15.75 16.5C16.3703 16.5 16.875 17.0047 16.875 17.625C16.875 18.2453 16.3702 18.75 15.75 18.75ZM20.25 4.87499H18.2527C17.9272 3.79425 16.935 3 15.75 3C14.565 3 13.5728 3.79425 13.2472 4.87499H3.74999C3.33599 4.87499 3 5.21098 3 5.62498C3 6.03898 3.33599 6.37496 3.74999 6.37496H13.2472C13.5728 7.45574 14.565 8.24999 15.75 8.24999C16.935 8.24999 17.9273 7.45574 18.2527 6.375H20.25C20.6647 6.375 21 6.03901 21 5.62501C21 5.21101 20.6647 4.87499 20.25 4.87499ZM15.75 6.74998C15.1297 6.74998 14.625 6.24524 14.625 5.62498C14.625 5.00471 15.1297 4.49998 15.75 4.49998C16.3703 4.49998 16.875 5.00471 16.875 5.62498C16.875 6.24524 16.3702 6.74998 15.75 6.74998ZM20.25 10.875H10.7528C10.4272 9.79426 9.435 9.00001 8.25002 9.00001C7.06505 9.00001 6.07276 9.79426 5.74729 10.875H3.74999C3.33599 10.875 3 11.211 3 11.625C3 12.039 3.33599 12.375 3.74999 12.375H5.74725C6.07276 13.4557 7.06501 14.25 8.24999 14.25C9.43496 14.25 10.4272 13.4557 10.7527 12.375H20.25C20.6647 12.375 21 12.039 21 11.625C21 11.211 20.6647 10.875 20.25 10.875ZM8.24999 12.75C7.62973 12.75 7.12499 12.2453 7.12499 11.625C7.12499 11.0047 7.62973 10.5 8.24999 10.5C8.87025 10.5 9.37499 11.0047 9.37499 11.625C9.37499 12.2453 8.87025 12.75 8.24999 12.75Z"
      fill="black"
    />
  </svg>
);

export const HotIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <g clipPath="url(#clip0_3306_2055)">
      <path
        d="M0.786133 9.99997L10.0005 0.785645L19.2148 9.99997L10.0005 19.2143L0.786133 9.99997Z"
        stroke="#A3A1AC"
        strokeOpacity="0.5"
        strokeWidth="1.11111"
      />
      <path d="M9.99989 4.44434L15.5554 9.99989L9.99989 15.5554L4.44434 9.99989L9.99989 4.44434Z" fill="#C2E23D" />
    </g>
    <defs>
      <clipPath id="clip0_3306_2055">
        <rect width="20" height="20" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export const LightIcon: React.FC<{ fill?: string }> = ({ fill = '#14161A' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <g clipPath="url(#clip0_5472_18364)">
      <path
        d="M10.0003 3.33366V1.66699M10.0003 16.667V18.3337M5.3455 5.3455L4.16699 4.16699M14.7737 14.7737L15.9522 15.9522M3.33366 10.0003H1.66699M16.667 10.0003H18.3337M14.7741 5.3455L15.9526 4.16699M5.34591 14.7737L4.1674 15.9522M10.0003 14.167C7.69914 14.167 5.83366 12.3015 5.83366 10.0003C5.83366 7.69914 7.69914 5.83366 10.0003 5.83366C12.3015 5.83366 14.167 7.69914 14.167 10.0003C14.167 12.3015 12.3015 14.167 10.0003 14.167Z"
        stroke={fill}
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_5472_18364">
        <rect width="20" height="20" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export const DarkIcon: React.FC<{ fill?: string }> = ({ fill = '#89898B' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path
      d="M7.5 4.99984C7.5 9.14197 10.8579 12.4998 15 12.4998C15.7577 12.4998 16.4892 12.3878 17.1787 12.1788C16.2453 15.2584 13.3844 17.4997 10 17.4997C5.85786 17.4997 2.5 14.1421 2.5 9.99995C2.5 6.61553 4.74173 3.75469 7.82134 2.82129C7.61236 3.51076 7.5 4.24212 7.5 4.99984Z"
      stroke={fill}
      strokeWidth="1.66667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const HeaderStar: React.FunctionComponent<{ fill: string }> = ({ fill }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
    <path
      d="M4.16369 1.27569C4.55856 0.673368 5.44144 0.673369 5.83631 1.27569L6.86584 2.84612C6.94107 2.96088 7.03912 3.05893 7.15388 3.13416L8.72431 4.16369C9.32663 4.55856 9.32663 5.44144 8.72431 5.83631L7.15388 6.86584C7.03912 6.94107 6.94107 7.03912 6.86584 7.15388L5.83631 8.72431C5.44144 9.32663 4.55856 9.32663 4.16369 8.72431L3.13416 7.15388C3.05893 7.03912 2.96088 6.94107 2.84612 6.86584L1.27569 5.83631C0.673368 5.44144 0.673369 4.55856 1.27569 4.16369L2.84612 3.13416C2.96088 3.05893 3.05893 2.96088 3.13416 2.84612L4.16369 1.27569Z"
      fill={fill}
    />
  </svg>
);

export const WalletIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.16667 5.20844C3.55888 5.20844 2.97598 5.44988 2.54621 5.87965C2.11644 6.30942 1.875 6.89231 1.875 7.5001V15.0001C1.875 15.6079 2.11644 16.1908 2.54621 16.6206C2.97598 17.0503 3.55888 17.2918 4.16667 17.2918H15.8333C16.4411 17.2918 17.024 17.0503 17.4538 16.6206C17.8836 16.1908 18.125 15.6079 18.125 15.0001V7.5001C18.125 6.89231 17.8836 6.30942 17.4538 5.87965C17.024 5.44988 16.4411 5.20844 15.8333 5.20844H4.16667ZM13.75 10.2084C13.4737 10.2084 13.2088 10.3182 13.0134 10.5135C12.8181 10.7089 12.7083 10.9738 12.7083 11.2501C12.7083 11.5264 12.8181 11.7913 13.0134 11.9867C13.2088 12.182 13.4737 12.2918 13.75 12.2918C14.0263 12.2918 14.2912 12.182 14.4866 11.9867C14.6819 11.7913 14.7917 11.5264 14.7917 11.2501C14.7917 10.9738 14.6819 10.7089 14.4866 10.5135C14.2912 10.3182 14.0263 10.2084 13.75 10.2084Z"
      fill="white"
    />
    <path
      d="M13.7375 2.55755C13.9842 2.49179 14.2428 2.48361 14.4932 2.53364C14.7436 2.58366 14.9791 2.69055 15.1817 2.84605C15.3842 3.00156 15.5483 3.20152 15.6613 3.4305C15.7743 3.65948 15.8331 3.91137 15.8333 4.16671H7.5L13.7375 2.55755Z"
      fill="white"
    />
  </svg>
);

export const TwitterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M22.4601 6C21.6901 6.35 20.8601 6.58 20.0001 6.69C20.8801 6.16 21.5601 5.32 21.8801 4.31C21.0501 4.81 20.1301 5.16 19.1601 5.36C18.3701 4.5 17.2601 4 16.0001 4C13.6501 4 11.7301 5.92 11.7301 8.29C11.7301 8.63 11.7701 8.96 11.8401 9.27C8.2801 9.09 5.1101 7.38 3.0001 4.79C2.6301 5.42 2.4201 6.16 2.4201 6.94C2.4201 8.43 3.1701 9.75 4.3301 10.5C3.6201 10.5 2.9601 10.3 2.3801 10V10.03C2.3801 12.11 3.8601 13.85 5.8201 14.24C5.19094 14.4129 4.53014 14.4369 3.8901 14.31C4.16171 15.1625 4.69364 15.9084 5.41112 16.4429C6.1286 16.9775 6.99555 17.2737 7.8901 17.29C6.37377 18.4905 4.49411 19.1394 2.5601 19.13C2.2201 19.13 1.8801 19.11 1.5401 19.07C3.4401 20.29 5.7001 21 8.1201 21C16.0001 21 20.3301 14.46 20.3301 8.79C20.3301 8.6 20.3301 8.42 20.3201 8.23C21.1601 7.63 21.8801 6.87 22.4601 6Z"
      fill="#8D8E92"
    />
  </svg>
);

export const TelegramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M12.0001 2C6.48006 2 2.00006 6.48 2.00006 12C2.00006 17.52 6.48006 22 12.0001 22C17.5201 22 22.0001 17.52 22.0001 12C22.0001 6.48 17.5201 2 12.0001 2ZM16.6401 8.8C16.4901 10.38 15.8401 14.22 15.5101 15.99C15.3701 16.74 15.0901 16.99 14.8301 17.02C14.2501 17.07 13.8101 16.64 13.2501 16.27C12.3701 15.69 11.8701 15.33 11.0201 14.77C10.0301 14.12 10.6701 13.76 11.2401 13.18C11.3901 13.03 13.9501 10.7 14.0001 10.49C14.007 10.4582 14.0061 10.4252 13.9974 10.3938C13.9887 10.3624 13.9724 10.3337 13.9501 10.31C13.8901 10.26 13.8101 10.28 13.7401 10.29C13.6501 10.31 12.2501 11.24 9.52006 13.08C9.12006 13.35 8.76006 13.49 8.44006 13.48C8.08006 13.47 7.40006 13.28 6.89006 13.11C6.26006 12.91 5.77006 12.8 5.81006 12.45C5.83006 12.27 6.08006 12.09 6.55006 11.9C9.47006 10.63 11.4101 9.79 12.3801 9.39C15.1601 8.23 15.7301 8.03 16.1101 8.03C16.1901 8.03 16.3801 8.05 16.5001 8.15C16.6001 8.23 16.6301 8.34 16.6401 8.42C16.6301 8.48 16.6501 8.66 16.6401 8.8Z"
      fill="#8D8E92"
    />
  </svg>
);

export const DiscordIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M19.2702 5.33C17.9402 4.71 16.5002 4.26 15.0002 4C14.9738 4.00038 14.9486 4.01116 14.9302 4.03C14.7502 4.36 14.5402 4.79 14.4002 5.12C12.8092 4.88015 11.1912 4.88015 9.60018 5.12C9.46018 4.78 9.25018 4.36 9.06018 4.03C9.05018 4.01 9.02018 4 8.99018 4C7.49018 4.26 6.06018 4.71 4.72018 5.33C4.71018 5.33 4.70018 5.34 4.69018 5.35C1.97018 9.42 1.22018 13.38 1.59018 17.3C1.59018 17.32 1.60018 17.34 1.62018 17.35C3.42018 18.67 5.15018 19.47 6.86018 20C6.89018 20.01 6.92018 20 6.93018 19.98C7.33018 19.43 7.69018 18.85 8.00018 18.24C8.02018 18.2 8.00018 18.16 7.96018 18.15C7.39018 17.93 6.85018 17.67 6.32018 17.37C6.28018 17.35 6.28018 17.29 6.31018 17.26C6.42018 17.18 6.53018 17.09 6.64018 17.01C6.66018 16.99 6.69018 16.99 6.71018 17C10.1502 18.57 13.8602 18.57 17.2602 17C17.2802 16.99 17.3102 16.99 17.3302 17.01C17.4402 17.1 17.5502 17.18 17.6602 17.27C17.7002 17.3 17.7002 17.36 17.6502 17.38C17.1302 17.69 16.5802 17.94 16.0102 18.16C15.9702 18.17 15.9602 18.22 15.9702 18.25C16.2902 18.86 16.6502 19.44 17.0402 19.99C17.0702 20 17.1002 20.01 17.1302 20C18.8502 19.47 20.5802 18.67 22.3802 17.35C22.4002 17.34 22.4102 17.32 22.4102 17.3C22.8502 12.77 21.6802 8.84 19.3102 5.35C19.3002 5.34 19.2902 5.33 19.2702 5.33ZM8.52018 14.91C7.49018 14.91 6.63018 13.96 6.63018 12.79C6.63018 11.62 7.47018 10.67 8.52018 10.67C9.58018 10.67 10.4202 11.63 10.4102 12.79C10.4102 13.96 9.57018 14.91 8.52018 14.91ZM15.4902 14.91C14.4602 14.91 13.6002 13.96 13.6002 12.79C13.6002 11.62 14.4402 10.67 15.4902 10.67C16.5502 10.67 17.3902 11.63 17.3802 12.79C17.3802 13.96 16.5502 14.91 15.4902 14.91Z"
      fill="#8D8E92"
    />
  </svg>
);

export const DocsIcon1 = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M8.00061 13H16.0006V11H8.00061V13ZM8.00061 16H16.0006V14H8.00061V16ZM8.00061 19H13.0006V17H8.00061V19ZM6.00061 22C5.45061 22 4.97994 21.8043 4.58861 21.413C4.19728 21.0217 4.00128 20.5507 4.00061 20V4C4.00061 3.45 4.19661 2.97933 4.58861 2.588C4.98061 2.19667 5.45128 2.00067 6.00061 2H14.0006L20.0006 8V20C20.0006 20.55 19.8049 21.021 19.4136 21.413C19.0223 21.805 18.5513 22.0007 18.0006 22H6.00061ZM13.0006 9V4H6.00061V20H18.0006V9H13.0006Z"
      fill="#8D8E92"
    />
  </svg>
);
