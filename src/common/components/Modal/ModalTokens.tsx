// import TokenBalance from '@/common/components/Views/Swap/TokenBalance';
// import { AppContext } from '@/common/components/providers';
// import useBalanceToken from '@/common/hooks/useBalanceToken';
// import useCoinInfo from '@/common/hooks/useCoinInfo';
// import useToken, { TOKEN_SYMBOL } from '@/common/hooks/useToken';
// import { Token } from '@/common/types/comon';
// import { filterToken } from '@/utils';
// import { useWallet } from '@amnis_finance/aptos-wallet-adapter';
// import { Avatar, Button, Divider, Input, Modal } from 'antd';
// import Image from 'next/image';
// import React, { useContext, useEffect, useMemo, useState } from 'react';
//
// interface Props {
//   isModalOpen: boolean;
//   handleClose: () => void;
//   setTokenSelected?: any;
//   blacklist?: any[];
// }
//
// enum MODE_TOKENS {
//   LIST,
//   MANAGE,
// }
//
// const ModalTokens: React.FunctionComponent<Props> = ({ isModalOpen, handleClose, setTokenSelected, blacklist }) => {
//   const [search, setSearch] = useState('');
//   const [mode, setMode] = useState<MODE_TOKENS>(MODE_TOKENS.LIST);
//   const [common, setCommon] = useState<Token[]>([]);
//   const [coinInfo, setCoinInfo] = useState<any>(null);
//   const { account } = useWallet();
//   const { tokens } = useContext(AppContext);
//   const { getBalanceTokenAddress } = useBalanceToken();
//   const { getCoinInfo } = useCoinInfo();
//   const { getTokenBySymbol } = useToken();
//
//   const handleSelectToken = (token: any) => {
//     setTokenSelected?.(token);
//     handleClose();
//   };
//
//   useEffect(() => {
//     if (tokens.length > 0) {
//       setCommon([
//         getTokenBySymbol(TOKEN_SYMBOL.APT_SYMBOL) as Token,
//         getTokenBySymbol(TOKEN_SYMBOL.BASE_SYMBOL) as Token,
//         getTokenBySymbol(TOKEN_SYMBOL.USDT_SYMBOL) as Token,
//         getTokenBySymbol(TOKEN_SYMBOL.USDC_SYMBOL) as Token,
//       ]);
//     }
//   }, [tokens]);
//
//   const filteredTokens = useMemo(() => {
//     return tokens.filter((token) => !blacklist?.includes(token.symbol)).filter(filterToken(search));
//   }, [tokens, search]);
//
//   const getCoinAddress = (coinAddress: string) => {
//     return coinAddress.slice(0, coinAddress.indexOf(':'));
//   };
//
//   const handleChange = async (e: any) => {
//     try {
//       const info = await getCoinInfo(e.target.value, getCoinAddress(e.target.value));
//       if (info) {
//         setCoinInfo(info);
//       }
//     } catch (e) {
//       setCoinInfo(null);
//       console.log(e);
//     }
//   };
//
//   return (
//     <Modal
//       className={'ModalTokens dark:border-[1px] dark:border-[#434B54] rounded-[32px]'}
//       width={450}
//       centered
//       title={
//         mode === MODE_TOKENS.LIST ? (
//           <div className={'text-[#000] text-2xl dark:text-white'}> Select a Token</div>
//         ) : (
//           <div className={'relative'}>
//             <i
//               onClick={() => setMode(MODE_TOKENS.LIST)}
//               className="text-sm text-[#000] dark:text-white fa-solid fa-chevron-left absolute left-1 cursor-pointer"
//             ></i>
//             <div className={'text-[#000] dark:text-white'}>Manage</div>
//           </div>
//         )
//       }
//       visible={isModalOpen}
//       onCancel={handleClose}
//       footer={false}
//       // footer={
//       //   mode === MODE_TOKENS.LIST ? (
//       //     <div className={'text-center p-4 text-[#3575ed] font-bold'}>
//       //       <a onClick={() => setMode(MODE_TOKENS.MANAGE)} href="#">
//       //         Manage Tokens
//       //       </a>
//       //     </div>
//       //   ) : null
//       // }
//     >
//       {mode === MODE_TOKENS.LIST && (
//         <div className={'pb-5'}>
//           <div className={'px-2 sm:px-4'}>
//             <Input
//               className={'dark:bg-[#101119] dark:border-solid dark:border-[#434B54] dark:text-gray-400'}
//               onChange={(e) => setSearch(e.target.value)}
//               placeholder={'Symbol or Address...'}
//               prefix={<i className="fa-solid fa-magnifying-glass text-[#000] text-lg dark:text-gray-400 pr-2"></i>}
//             />
//             <div className={'mt-6 dark:text-gray-400'}>Common Tokens</div>
//             <div className={'w-full font-medium flex mt-2 flex-wrap gap-2'}>
//               {common.map((item) => {
//                 return (
//                   <div
//                     onClick={() => handleSelectToken(item)}
//                     key={item?.symbol}
//                     className={'CommonTokenItem dark:border-[#434B54] dark:bg-[#101119] cursor-pointer'}
//                   >
//                     <div className={'flex items-center gap-2'}>
//                       <Avatar
//                         className={'w-[22px] h-[22px]'}
//                       ></Avatar>
//                       <div className={'text-sm text-[#000] dark:text-white'}>{item.symbol}</div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//             <Divider className={'my-3'} />
//           </div>
//           <div
//             className={
//               'TokenBalance min-h-[280px] max-h-[280px] sm:max-h-[352px] dark:border-[1px] dark:border-[#434B54] rounded-2xl bg-[#101119] overflow-y-scroll mx-2 sm:mx-4'
//             }
//           >
//             {filteredTokens.map((item) => {
//               return (
//                 <TokenBalance
//                   handleSelectToken={handleSelectToken}
//                   key={item.symbol}
//                   address={account?.address as any}
//                   item={item}
//                   getBalanceTokenAddress={getBalanceTokenAddress}
//                 />
//               );
//             })}
//           </div>
//         </div>
//       )}
//       {mode == MODE_TOKENS.MANAGE && (
//         <div className={'px-6 pb-6  text-[#000] dark:text-white'}>
//           <div>
//             <div className={'text-[#000] dark:text-white'}>Put a token address</div>
//             <div className={'mt-2'}>
//               <Input
//                 onChange={handleChange}
//                 className={'p-3 rounded-xl bg-[#c5c5c536] border-0'}
//                 placeholder={'0x0000'}
//               />
//             </div>
//             {coinInfo && (
//               <div className={'w-full flex justify-between items-center mt-5 rounded-xl bg-[#242424a3] p-3'}>
//                 <div className={'flex items-center  gap-2'}>
//                   <div>
//                     <Image src={require('@/common/assets/images/wallet-avatar.png')} alt={''} />
//                   </div>
//                   <div>
//                     <div className={'leading-4'}>{coinInfo.data.symbol}</div>
//                     <span className={'text-xs text-[#e5e4fa]'}>{coinInfo.data.name}</span>
//                   </div>
//                 </div>
//                 <div>
//                   <Button className={'bg-[#3575ed] border-0 text-[#000]'}>Import</Button>
//                 </div>
//               </div>
//             )}
//             <div className={'text-lg text-[#000] dark:text-white font-bold text-center mt-3'}>No custom tokens</div>
//             <div className={'mt-3 text-center'}>Search by token contract address</div>
//             <div className={'mt-20 text-center'}>Custom tokens stored locally in your browser</div>
//           </div>
//         </div>
//       )}
//     </Modal>
//   );
// };
// export default ModalTokens;
