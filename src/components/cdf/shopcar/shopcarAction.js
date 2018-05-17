import * as constants from './shopcarConstants.js'

export function requestData(config){
    return {
        url: config.url,
        data: config.data || {},
        method: config.method || 'post',
        name: config.name
    }
}

export function createOrder(data){
    return {
        type: 'order',
        data: data
    }
}
