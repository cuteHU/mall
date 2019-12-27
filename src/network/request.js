/* eslint-disable no-unused-vars */
import axios from "axios"

export function request(config) {
    // 1.创建axios实例
    const instance = axios.create({
            baseURL: 'http://123.207.32.32:8000/api/w1',
            timeout: 5000
        })
        // 2.axios的拦截器
        // 2.1 请求拦截
    instance.interceptors.request.use(config => {
            // console.log(config);
            // 1.比如config中的一些信息不符合服务器的要求
            // 2.比如每次发送网络请求时，都希望在界面中显示一个请求图标
            // 3.某些网络请求(比如登录),必须携带一些特殊认证信息
            return config;
        }, err => {})
        // 2.2 响应拦截
    instance.interceptors.response.use(res => {
            return res.data;
        }, err => {})
        //3.发送真正的网络请求
    return instance(config)
}