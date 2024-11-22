import { DEFAULT_DECIMALS } from '@/common/consts';
import { postBase64Img, putBase64Img } from '@/common/services/launchpad';
import moment from 'moment';

export function ellipseAddress(address: string = '', width: number = 10): string {
  return `${String(address).slice(0, width)}...${String(address).slice(-width)}`;
}

export function ellipseAddressNFT(address: string = '', width1: number = 4, width2: number = 3): string {
  return `${String(address).slice(0, width1)}...${String(address).slice(-width2)}`;
}

function roundDownToDecimals(number: any, decimalPlaces: number) {
  const powerOfTen = Math.pow(10, decimalPlaces);
  return Math.floor(Number(number) * powerOfTen) / powerOfTen;
}

function formatDecimal(number: any, decimalPlaces: number = 4) {
  if (isNaN(number) || isNaN(decimalPlaces)) {
    return 'Invalid input';
  }

  return number.toFixed(decimalPlaces).replace(/\.?0+$/, '');
}

export function isValidUrl(url: string) {
  try {
    new URL(url);
    return true;
  } catch (_) {
    return false;
  }
}

export const formatNumber = (number: number | string = '0', infractionDigit: number = 2) => {
  let formatPrice = '';
  if (Number(number) > 0 && Number(number) < 0.01) {
    formatPrice = '< 0.01';
  } else if (Number(number) === 0) {
    formatPrice = '0.00';
  } else if (isNaN(Number(number))) {
    formatPrice = '0.00';
  } else {
    formatPrice = roundDownToDecimals(number, infractionDigit).toLocaleString('en-US') as any;
  }
  return formatPrice;
};

export const formatDecimalNumber = (number: number | string, decimal: number = DEFAULT_DECIMALS) => {
  return Number(number) / Math.pow(10, decimal);
};

export const formatSmallNumber = (number: number | string = '0', infractionDigit: number = 2) => {
  let formatPrice = '';
  if (Number(number) === 0) {
    formatPrice = '0.00';
  } else if (isNaN(Number(number))) {
    formatPrice = '0.00';
  } else {
    formatPrice = formatDecimal(number, infractionDigit).toLocaleString('en-US') as any;
  }
  return formatPrice;
};

export const formatPercentNumber = (number: number | string = '0', infractionDigit: number = 1) => {
  let formatPrice = '';
  if (Number(number) === 0) {
    formatPrice = '0';
  } else if (isNaN(Number(number))) {
    formatPrice = '0';
  } else {
    formatPrice = roundDownToDecimals(number, infractionDigit).toLocaleString('en-US') as any;
  }
  return formatPrice;
};

export const formatNumberBalance = (number: number | string = '0', infractionDigit: number = 4) => {
  let formatPrice = '';
  if (Number(number) > 0 && Number(number) < 0.0001) {
    formatPrice = '<0.0001';
  } else if (Number(number) > 0 && Number(number) < 0.01) {
    formatPrice = '<0.01';
  } else if (Number(number) === 0) {
    formatPrice = '0.00';
  } else if (isNaN(Number(number))) {
    formatPrice = '0.00';
  } else if (Number(number) < 0.000001) {
    formatPrice = '< 0.0001';
  } else {
    if (Number.isInteger(Number(number))) {
      formatPrice = Number(Number(number)).toLocaleString('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      });
      return formatPrice;
    }
    const indexOf = String(number).indexOf('.') || -1;
    const newNumber = Number(String(number).slice(0, indexOf + infractionDigit + 1));
    formatPrice = Number(Number(newNumber)).toLocaleString('en-US', {
      minimumFractionDigits: infractionDigit,
      maximumFractionDigits: infractionDigit,
    });
  }
  return formatPrice;
};

export const formatRewardBalance = (number: number | string = '0', infractionDigit: number = 2) => {
  let formatPrice = '';
  if (Number(number) > 0 && Number(number) < 0.0001) {
    formatPrice = '<0.0001';
  } else if (Number(number) === 0) {
    formatPrice = '0.00';
  } else if (isNaN(Number(number))) {
    formatPrice = '0.00';
  } else if (Number(number) < 0.000001) {
    formatPrice = '< 0.0001';
  } else {
    if (Number.isInteger(Number(number))) {
      formatPrice = Number(Number(number)).toLocaleString('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      });
      return formatPrice;
    }
    const indexOf = String(number).indexOf('.') || -1;
    const newNumber = Number(String(number).slice(0, indexOf + infractionDigit + 1));
    formatPrice = Number(Number(newNumber)).toLocaleString('en-US', {
      minimumFractionDigits: infractionDigit,
      maximumFractionDigits: infractionDigit,
    });
  }
  return formatPrice;
};

export const formatBigIntToNumber = (amount: bigint | number, decimal: number = 8) => {
  let number = '';
  number = (Number(amount) / Math.pow(10, decimal)).toString();
  return number;
};

export const getDiff = (withdrawTime: any) => {
  return moment(parseInt(withdrawTime)).diff(Date.now());
};

export const copyToClipboard = (text: string) => {
  const textField = document.createElement('textarea');
  textField.innerText = text;
  document.body.appendChild(textField);
  textField.select();
  document.execCommand('copy');
  textField.remove();
};

export const uppercaseWordsFirstString = (s: string) => {
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export const formatString = (str: string) => {
  return str.toLowerCase().trim().replace(/\s+/g, '-');
};

export const customXTickFormatter = (tick: string) => {
  const date = new Date(tick);
  return date.toLocaleDateString('en-US', { month: 'short', day: '2-digit' });
};

export const customYTickFormatter = (tick: string, decimal: number = 2) => {
  const num = parseInt(tick, 10);
  if (num >= 1000000) {
    const numberString = (num / 1000000).toString();
    const decimalPart = numberString.split('.')[0];
    return decimalPart?.length == 3
      ? '$' + (num / 1000000).toFixed(0) + 'M'
      : decimalPart?.length == 2
        ? '$' + (num / 1000000).toFixed(1) + 'M'
        : '$' + (num / 1000000).toFixed(2) + 'M';
  } else if (num >= 1000) {
    const numberString = (num / 1000).toString();
    const decimalPart = numberString.split('.')[0];
    return decimalPart?.length == 3
      ? '$' + (num / 1000).toFixed(0) + 'K'
      : decimalPart?.length == 2
        ? '$' + (num / 1000).toFixed(1) + 'K'
        : '$' + (num / 1000).toFixed(2) + 'K';
  } else {
    return '$' + formatNumber(tick, decimal);
  }
};

export const filterString = (content: string) => {
  const htmlString = content;
  const regex = /src="([^"]+)"/;

  const match = htmlString.match(regex);
  return match ? match[1] : '';
};

export const filterStringImg = (content: string) => {
  const url = content;
  const regex = /asset-movegptv2\/(.*?\.png)/;
  const match = url.match(regex);

  if (match) {
    return match[1];
  } else {
    console.log('Not found string.');
  }
};

// export async function modifyAllImgSrc(originalString: string, campaign: any): Promise<string> {
export async function modifyAllImgSrc(originalString: string, file: File): Promise<string> {
  const imgTagRegex = /<img src="([^"]+)"/g;
  // let modifiedString = originalString;
  //
  // modifiedString = modifiedString.replace(imgTagRegex, (match, src) => {
  //   const transformedSrc = transformFunction(src);
  //   return match.replace(src, transformedSrc);
  // });

  const promises: Promise<string>[] = [];

  let match: RegExpExecArray | null;
  while ((match = imgTagRegex.exec(originalString)) !== null) {
    const src = match[1];
    // promises.push(addPrefix({ ...campaign, proj_desc: src }));
    promises.push(postImgToGCP(file));
  }

  const transformedSrcs = await Promise.all(promises);

  let modifiedString = originalString;
  transformedSrcs.forEach((transformedSrc, index) => {
    modifiedString = modifiedString.replace(/<img src="([^"]+)"/, `<img src="${transformedSrc}"`);
  });

  return modifiedString;
}

export async function modifyImgSrc(originalString: string, file: File): Promise<{ newString: string; srcUrl: string }> {
  const srcUrl = await postImgToGCP(file);

  return {
    newString: originalString + `<img src="${srcUrl}"/>`,
    srcUrl: srcUrl,
  };
}

// export async function addPrefix(campaign: any): Promise<string> {
//   const gcpUrl = await postBase64Img({ fileName: `${campaign?.proj_name}.png`, type: 'image/png' });
//
//   try {
//     if (gcpUrl) {
//       await putBase64Img(gcpUrl, filterString(campaign?.proj_desc));
//       return gcpUrl.split('?')[0];
//     }
//   } catch (e: any) {
//     throw new Error('Image error!');
//   }
//   return '';
// }

export async function postImgToGCP(file: File): Promise<string> {
  const gcpUrl = await postBase64Img({ fileName: file?.name, type: file?.type });

  try {
    if (gcpUrl) {
      await putBase64Img(gcpUrl, file);
      return gcpUrl.split('?')[0];
    }
  } catch (e: any) {
    throw new Error('Image error!');
  }
  return '';
}
