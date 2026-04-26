import axios from 'axios';

const service = axios.create({
  baseURL: '',
  timeout: 5000,
});

// 请求拦截器（加token等）
service.interceptors.request.use(
  config => {
    // 比如加token
    // config.headers.token = 'xxx'
    return config;
  },
  error => Promise.reject(error)
);

// 响应拦截器
service.interceptors.response.use(
  res => res.data, // 直接返回数据
  error => {
    console.error('请求错误', error);
    return Promise.reject(error);
  }
);


export default service;