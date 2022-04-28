/* eslint-disable arrow-body-style */
/* eslint-disable no-param-reassign */
/* eslint-disable no-else-return */
import moment from 'moment';
import {toast} from 'react-toastify';

export const currencyFormat = (num, prefix = '', suffix = '') => {
  let finalFormat = '0';
  if (num) {
    const value = typeof num === 'string' ? num : num.toString();
    const currencyPrefix = prefix !== '' ? `${prefix} ` : '';
    const currencySuffix = suffix !== '' ? ` ${suffix}` : '';
    const numberString = value.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    finalFormat = currencyPrefix + numberString + currencySuffix;
  }

  return finalFormat;
};

export const stripHTML = (str) => {
  if (str === null || str === '' || str === undefined) return false;
  else str = str.toString();

  return str
    .replace(/(<([^>]+)>)/gi, '')
    .replace(/(^\s+|\s+$)/g, ' ')
    .replace(/\r?\n|\r/g, ' ')
    .replace(/\t+/gm, ' ');
};

export const truncateMiddle = (fullStr, strLen, separator = '...') => {
  if (fullStr) {
    if (fullStr.length <= strLen) return fullStr;

    const sepLen = separator.length;
    const charsToShow = strLen - sepLen;
    const frontChars = Math.ceil(charsToShow / 2);
    const backChars = Math.floor(charsToShow / 2);

    return fullStr.substr(0, frontChars)
          + separator
          + fullStr.substr(fullStr.length - backChars);
  } else {
    return '';
  }
};

export const copyToClipboard = (text) => {
  if (typeof text === 'string') {
    navigator.clipboard.writeText(text);
    toast.info('Copied to clipboard');
  }
};

export const getFileExtension = (fname) => {
  return fname?.slice((Math.max(0, fname.lastIndexOf('.')) || Infinity) + 1);
};

export const getSlug = (string) => {
  return string?.replace(/\s+/g, '-').toLowerCase();
};

export const getStringFromSlug = (string) => {
  return string?.replace('-', ' ').toLowerCase();
};

export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const getDateRangeLabel = (
  start,
  end,
  momentFormat,
  isTime = false,
) => {
  let label = '';
  const isSame = (x) => moment(start).isSame(end, x);

  if (!isTime && isSame('year') && isSame('month') && isSame('date')) {
    // ----- sama semua -----
    label = moment(start).format(momentFormat);
  } else if (!isTime && isSame('year') && isSame('month')) {
    // ----- beda hari -----
    label = `${moment(start).format('D')
    } - ${
      moment(end).format(momentFormat)}`;
  } else if (!isTime && isSame('year')) {
    // ----- beda bulan -----
    label = `${moment(start).format('D MMM')
    } - ${
      moment(end).format(momentFormat)}`;
  } else {
    // ----- beda tahun -----
    label = `${moment(start).format(momentFormat)
    } - ${
      moment(end).format(momentFormat)}`;
  }

  return label;
};
