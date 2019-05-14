import { request } from 'utils/request';
import { UrlPrefix } from 'configs';
import api from './api';

// 生成 service 方法
const gen = (args) => {
  let url = UrlPrefix + args;
  let method = 'get';

  const argsArray = args.split(' ');
  if ( argsArray.length === 2 ){
    [method] = argsArray;
    url = UrlPrefix + argsArray[1];
  };

  return function(params, opts){
    return request(method, url, params, opts);
  };
};

const APIFunction = {};
for (const key in api){
  if ( Object.prototype.hasOwnProperty.call(api, key) )
    APIFunction[key] = gen(api[key]);
};

export default APIFunction;