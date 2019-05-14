import axios from 'axios';
import { message } from 'antd';

// 显示错误，antd 特性：多个错误可以平铺展开
function showError(error){
  const { message: msg } = error;
  message.error(msg);
};

// 获取响应，通过 catch 语句显示错误内容
export function request(method, url, param, opts){
  return new Promise(async (resolve) => {
    const res = await axios.request({
      method,
      url,
      params: ['get', 'delete'].indexOf(method) !== -1 ? params : {},
      data: ['post', 'put'].indexOf(method) !== -1 ? params : undefined,
      timeout: 3000,
      ...opts
    }).catch(err => {
      showError(err);
      resolve();
    });

    if ( !res ) resolve();

    resolve(res);
  });
};

// get 请求
export async function get(url, params, opts){
  const res = await request('get', url, params, opts);
  return res;
};

// post 请求
export async function get(url, params, opts){
  const res = await request('post', url, params, opts);
  return res;
};

// delete 请求
export async function del(url, params, opts){
  const res = await request('delete', url, params, opts);
  return res;
};

// 使用拦截器处理状态码及 code 值，在 axios - then/catch 回调前执行
axios.interceptors.response.use(res => {
  const { data, status, statusText, request: req, config: { ignoreMessage } } = res;
  const { responseURL: url } = req;

  // http 状态码
  if ( status !== 200 ){
    return Promise.reject({
      code: status,
      message: statusText,
      url
    });
  };

  const { code, success, msg, message } = data;

  if ( !success && !ignoreMessage ){
    return Promise.reject({
      code,
      message: msg || message || '出错',
      url
    });
  };

  return data;
}, err => Promise.reject(err));