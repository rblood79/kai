
import React from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';
import { Encrypt } from '../crypto';

/*
* @date         : 2022-11-01
* @description  : https://github.com/axios/axios 의 Request Config 확인
* @parameter    : none
*/

axios.defaults.paramsSerializer = function (paramObj) {
  const params = new URLSearchParams();
  for (const key in paramObj) {
    //const param = !crypto ? paramObj[key] : Encrypt(paramObj[key]);
    const param = Encrypt(paramObj[key]);
    params.append(key, encodeURIComponent(param));
  }
  return params.toString();
};

const instance = axios.create({
  baseURL: 'http://localhost:3001',
  timeout: 3000,
  crossDomain: true,
  changeOrigin: true,
  withCredentials: true,
  credentials: 'same-origin',
  responseType: 'json',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded',
    'Access-Control-Allow-Origin': '*',
  },
});

/*
* @date         : 2022-11-15
* @description  : 
* @parameter    : loading
*/
/*const root = document.getElementById('root');
let load = document.createElement("div")
load.classList.add('load')*/

/*
* @date         : 2022-11-01
* @description  : 요청 인터셉터를 작성
* @parameter    : error
*/
instance.interceptors.request.use(
  (config) => {
    //root.append(load)
    // 요청 바로 직전
    // axios 설정값에 대해 작성합니다.
    //config.headers["Content-Type"] = "application/json; charset=utf-8";
    //config.headers["Authorization"] = " 토큰 값";
    return config;
  },
  (error) => {
    // 요청 에러 처리를 작성합니다.
    return Promise.reject(error);
  },
);

/*
* @date         : 2022-11-01
* @description  : 응답 인터셉터를 작성
                  응답 정성 - 인자값: http response
                  응답 에러 - 인자값: http error
* @parameter    : error
*/
instance.interceptors.response.use(
  (response) => {
    /*
        http status가 200인 경우
        응답 바로 직전에 대해 작성합니다.
        .then() 으로 이어집니다.
    */
    if (response.status === 200) {
      //load.remove()
    }
    return response;
  },

  (error) => {
    /*
        http status가 200이 아닌 경우
        응답 에러 처리를 작성합니다.
        .catch() 으로 이어집니다.
    */
    //errorController(error);
    return Promise.reject(error);
  },
);

export default instance;
