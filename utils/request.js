import qs from 'querystringify';

import { isEmpty } from './glodash';

qq.$request = ({ url, params, data }) =>
  new Promise((resolve, reject) => {
    const queries = isEmpty(params) ? '' : '?' + qs.stringify(params);
    qq.request({
      url: `https://chao.fun/${url}${queries}`,
      method: !isEmpty(data) ? 'POST' : 'GET',
      data,
      success: ({ data, statusCode }) => {
        if ([200, 204].includes(statusCode)) {
          if (!isEmpty(data)) {
            resolve(data);
          } else {
            resolve({});
          }
        } else {
          reject({ data, statusCode });
        }
      },
      fail: (res) => {
        reject(res);
      }
    });
  });
