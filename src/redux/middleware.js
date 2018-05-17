import http from '../utils/httpclient'
import * as constants from '../components/cdf/shopcar/shopcarConstants.js'

export default function(api){
    return function(dispatch){
        return function(action){
            let {url, data, method, types, name} = action;
            if(!url){
                dispatch(action)
            } else {
                dispatch({
                    type: constants.REQUESTING
                })

                http[method](url, data).then((res) => {
                    dispatch({
                        type:constants.REQUESTED,
                        data: res.data,
                        name : name
                    })
                }).catch((error) => {
                    dispatch({
                        type:constants.REQUESTERROR,
                        error: error
                    })
                })
            }
        }
    }
}