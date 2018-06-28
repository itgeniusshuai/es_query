import axios from 'axios'
import { Message } from 'element-ui';
import router from '../router/index'



export function post(url,params){
    return request(url,params,'post')
} 

export function get(url,params){
    return request(url,params,'get')
}

function request(url,params,method){
    let res;
    switch (method.toLowerCase()) {
        case 'get':
          res =  axios.get(url, {
            params: params,
          },{timeout:1000*10})
          break;
        case 'post':
          res =  axios({
            method: 'post',
            url: url,
            data: params,
            headers: { 'content-type': 'application/x-www-form-urlencoded'},
          },{timeout:1000*10});
          break;
        case 'delete':
          res =  axios.delete(url, {
            data: params,
          })
          break;
        case 'put':
          res =  axios.put(url, params)
          break;
        case 'patch':
          res =  axios.patch(url, params)
          break;
        default:
            res =  axios.get(url, {
                params: params,
                headers: { "token": token},
            })
    }
    return res.then((response) => {
        const { statusText, status } = response
        let data = response.data
        return data
    });
}