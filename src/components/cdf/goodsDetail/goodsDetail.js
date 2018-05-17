import React from 'react'
import http from '../../../utils/httpclient.js'

import './goodsDetail.scss'

import jQuery from 'jquery'

export default class GoodsDetailComponent extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            products_detail:{}
        }
    }
    componentDidMount(){
        let self = this;

        jQuery(function($){
            var $returnBack = $('#cfd_goodsDetail .rtnBack');
            var $iconCar = $('#cfd_goodsDetail .iconCar');
            var $iconshoucang = $('#cfd_goodsDetail .contents .icon-shoucang');
            var $overlay = $('#cfd_goodsDetail .overlay')
            var $detail = $('#cfd_goodsDetail .detail')
            var $detailCancel = $detail.find('.cancel')
            var $countsJian = $('#countsJian')
            var $countsJia = $('#countsJia')
            var $confirm = $('#confirm')
            var $addCar = $('#addCar')
            var $myCar= $('#myCar')
            var $text = $countsJian.next();
            var $shopTip = $('#cfd_goodsDetail .shopTip');

            let id = self.props.location.query.id;
            http.post('addTowatch_history',{product_id:id}).then((res)=>{
                self.setState({
                    products_detail:res.data.data[0]
                })
                if(res.status){
                    $iconshoucang.addClass('active')
                }
            })

            $returnBack.on('click',function(){
                window.history.back();
            })

            $iconCar.on('click',function(){
                self.props.router.push('shopcar')
            })

            $addCar.on('click', function(){
                $overlay.css('display','block')
                $detail.css('display','block').animate({bottom:0},500)
            })

            $detailCancel.on('click',function(){
 
                $detail.animate({bottom:'-31%'},function(){
                    $detail.css('display','none')
                    $overlay.css('display','none')
                })
            })

            $iconshoucang.on('click', function(){
                if($iconshoucang.hasClass('active')){
                    http.post('dellikes',{product_id: id}).then((res) => {
                        if(res.message == 'unauth'){
                            self.props.router.push('login')        
                            return;
                        }
                        if(res.status){
                            $iconshoucang.removeClass('active')
                        }
                    })
                }else{
                    http.post('addTolikes',{product_id: id}).then((res) => {
                        if(res.message == 'unauth'){
                            self.props.router.push('login')        
                            return;
                        }
                        if(res.status){
                            $iconshoucang.addClass('active')
                        }
                    })
                }
            })

            $countsJian.on('click', function(){
                var count = $text.text()*1 - 1;
                if(count <= 0){
                    count = 1
                }
                $text.text(count)
            })

            $countsJia.on('click',function(){
                var count = $text.text()*1 + 1;
                $text.text(count);
            })

            $confirm.on('click',function(){
                var qty = $text.text()*1;
                http.post('addToShopcart',{product_id: id, qty: qty}).then((res) => {
                    if(res.message == 'unauth'){
                        self.props.router.push('login')        
                        return;
                    }
                    if(res.status){
                        $shopTip.fadeIn(1000)
                        $detail.animate({bottom:'-31%'},function(){
                            $detail.css('display','none')
                            $shopTip.fadeOut(1000,function(){
                                $overlay.fadeOut(300)                                 
                            })
                        })
                    }
                })
            })
        })
    }
    render(){
        return (
            <div id="cfd_goodsDetail" className="animate-route">
                <div className="goodsDetail_top">
                    <i className="icon-jiantou2 iconfont rtnBack"></i>
                        商品详情
                    <i className="icon-gouwudai iconfont iconCar"></i>
                </div>
                <div className="goodsDetail_content">
                    <div className="img"><img src={this.state.products_detail.pic}/></div>
                    {
                        <div className="contents">
                            <i className="iconfont icon-shoucang"></i>
                            <p>{this.state.products_detail.name}</p>
                            <div className="left">促销价：<span>￥{this.state.products_detail.discountPrice}</span></div>
                            <div className="right">
                                <del>免税价：￥{this.state.products_detail.salesPrice}</del>
                            </div>
                        </div>
                    }                    
                </div>
                <div className="goodsDetail_footer">
                    <button id="myCar">我的购物车</button>
                    <button id="addCar">加入购物袋</button>
                </div>
                <div className="overlay"></div>
                <div className="detail">
                    <div className="cont">
                        <i className="cancel">X</i>
                        <img src={this.state.products_detail.pic}/>
                        <p>{this.state.products_detail.name}</p>
                        <div className="discount">促销价：<span>￥{this.state.products_detail.discountPrice}</span></div>
                        <span className="xiangou">商品限购12件</span>
                    </div>
                    <div className="select">
                        <div className="counts">
                            数量 <button id="countsJian">-</button><span>1</span><button id="countsJia">+</button>
                        </div>
                        <button id="confirm">确认</button>
                    </div>
                </div>
                <div className="shopTip"><span>已添加到购物车</span></div>
            </div>
        )
    }
}