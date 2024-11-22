// const useUser = () => {
//   const connectWallet = async () => {
//     try {
//       let { nonce } = await connectApi(addr);
//       nonce = nonce + '';
//       const message = `Welcome to Spores Launchpad!\n\nClick \"Sign\" to sign in. No password needed!\n\nWallet address:\n${addr}\n\nNonce:\n${nonce}`;
//       const rawSig = await web3.eth.personal.sign(message, addr);
//       const splitAt = rawSig.length - 2;
//
//       // for Ethereum, last bytes of the signature must be 1b or 1c
//       // Metamask did this automatically but for hardware wallet like Trezor or Ledger,
//       // this must be done manually
//       let v = rawSig.slice(-2);
//       if (v === '00') {
//         v = '1b';
//       } else if (v === '01') {
//         v = '1c';
//       }
//       const signature = rawSig.substring(0, splitAt) + v;
//
//       const currentUrl = window.location.href;
//       const referCode = currentUrl.split('?refer=').filter((part) => part !== '')[1];
//
//     } catch (error) {
//       console.log('connectWallet', JSON.stringify(error));
//     }
//   };
// };
