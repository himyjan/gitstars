import { GITHUB_COM } from '@/constants';

/**
 * 轉換倉庫 README href 或 src 的資源地址
 * @param {*} str
 * @param {*} param1
 * @returns
 */
export const toRepostoryReadmeHref = (str, { urlPrefix } = {}) => {
  if (str.startsWith('http')) return str;
  // if (str.startsWith('/')) return `${GITHUB_COM}${str}`;
  if (str.startsWith('./')) return `${urlPrefix}${str.slice(1)}`;
  return `${urlPrefix}${str}`;
};
