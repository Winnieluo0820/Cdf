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
        let id=this.props.location.query.id;
        http.post('query_product',{product_id:id}).then((res)=>{
            this.setState({
                products_detail:res
            })
        })
    }
    render(){
        return (
            <div id="cfd_goodsDetail">
                <div className="goodsDetail_top">
                    <i className="icon-jiantou2 iconfont "></i>
                        商品详情
                    <i className="icon-gouwudai iconfont "></i>
                </div>
                <div className="goodsDetail_content">
                    <div className="img"><img src="" alt="" /></div>
                    
                </div>
                <div className="goodsDetail_footer">
                    <button>立即购买</button>
                    <button>加入购物袋</button>
                </div>
            </div>
        )
    }
}