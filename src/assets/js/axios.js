import axios from 'axios'
import Route from '../../router'
import {
    setCookie,
    getCookie,
    delCookie
} from './cookie'

let instance = axios.create({
    headers: {
        // 'content-type': 'application/x-www-form-urlencoded'
    }
})
instance.interceptors.request.use(
    config => {
        if (getCookie('token')) { // 判断是否存在token，如果存在的话，则每个http header都加上token
            config.headers['Access-token'] = getCookie('token')  //请求头加上token
        } else {
            if (Route.currentRoute.path != '/') {
                Route.push('/')
                alert('当前未登录，请登录')
            }
        }
        return config
    },
    err => {
        alert('网络错误')
        return Promise.reject(err)
    })
instance.interceptors.response.use((response) => {
    // 用户信息是否超时，重定向到登录页面 
    // if (response.data.errorMsg == '请登录') {
    //     localStorage.clear()
    //     router.replace({
    //         path: '/login',
    //         query: { redirect: router.currentRoute.fullPath }
    //     })
    // }
    if(response.data.message == 'token已过期'){
        Route.push('/')
        alert('当前登录已过期，请重新登录')
    }
    return response
}, function (error) {
    // Do something with response error 
    return Promise.reject(error)
})
export default instance
