import React from 'react'
import http from '../../../utils/httpclient.js'
import './goodsDetail.scss'
export default class GoodsDetailComponent extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            products_detail:{}
        }
    }
    componentDidMount(){
        
    }
    render(){
        return (
            <div id="cfd_goodsDetail">
                <div className="goodsDetail_top">
                    <i className="icon-jiantou iconfont "></i>
                        商品详情
                    <i className="icon-jiantou iconfont "></i>
                </div>
                <div className="goodsDetail_content">
                    <div className="goodsDetail_banner">
                    </div>
                </div>
                <div className="goodsDetail_footer">
                    <button>立即购买</button>
                    <button>加入购物袋</button>
                </div>
            </div>
        )
    }
}