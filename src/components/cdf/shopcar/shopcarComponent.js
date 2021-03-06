import React from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'

import * as actions from './shopcarAction.js'

import './shopcar.scss'
import http from '../../../utils/httpclient.js'
import jQuery from 'jquery'

class ShopcarComponent extends React.Component{
    state = {
        checkbox:{'all':true},
        goodsData:[]
    }
    componentDidMount(){
        let self = this;        

        jQuery(function($){
            //获取页面元素
            var $goodCars = $('#cdf_shopcar .shopcar_main .goodCars')
            var $shopcar_footer = $('#cdf_shopcar .shopcar_footer')
            var $empty = $('#cdf_shopcar .shopcar_main .empty')  
            var $totalPrice = $('.shopcar_footer .totalPrice');
            var $discountPrice = $('.shopcar_footer .discountPrice')
            var $resultPrice = $('.shopcar_footer .resultPrice') 
            var $uls = $('.shopcar_main .goods')
            var $jiesuan = $('.shopcar_footer .right a')
            var $main  =  $('#cdf_shopcar .shopcar_main')
            var $overlay = $('#cdf_shopcar .overlay')

            //第一进去获取页面购物车数据
            $overlay.fadeIn(300);
            http.post('showShopcart').then((res) => {

                self.setState({goodsData: res.data})
                if(self.state.goodsData.length > 0){
                    $goodCars.css('display','block')
                    $shopcar_footer.css('display','flex')
                } else {
                    $empty.css('display','block')
                } 
                
                let result = self.counting(self.state.goodsData)
                $totalPrice.text(result.totalPrice)
                $discountPrice.text(result.discountTotal)
                $resultPrice.text(result.shouldPrice)

                let changeSelect = self.state.goodsData.every(function(item){
                    return item.check;
                })
                self.setState({checkbox:{all:changeSelect}});

                $overlay.fadeOut(300);
            })

            //下拉刷新
            ;(function($){
                var previousTop;
                var paddingTop = 0;
                var start;
                var move;
                var target = $main.height() * 0.1;
                var status = false;
                $main.on('touchstart',function(event){
                    start = event.touches[0].clientY;
                    $main.on('touchmove',function(event){
                        if($main.get(0).scrollTop == 0){
                            status = true;
                            move = event.touches[0].clientY;
                            paddingTop = (move - start)
                            if(paddingTop > target){
                                paddingTop = target;
                            }
                            $main.css({'padding-top':paddingTop +'px'})                       
                        }
                    })
                })
                $main.on('touchend',function(){
                    if(status){
                        status = false;
                        if(paddingTop == target){
                            $overlay.fadeIn(300);
                            http.post('showShopcart').then((res) => {
                                self.setState({goodsData: res.data})
                                if(self.state.goodsData.length > 0){
                                    $goodCars.css('display','block')
                                    $shopcar_footer.css('display','flex')
                                } else {
                                    $empty.css('display','block')
                                } 
                                
                                let result = self.counting(self.state.goodsData)
                                $totalPrice.text(result.totalPrice)
                                $discountPrice.text(result.discountTotal)
                                $resultPrice.text(result.shouldPrice)

                                let changeSelect = self.state.goodsData.every(function(item){
                                    return item.check;
                                })
                                self.setState({checkbox:{all:changeSelect}});

                    
                                $main.animate({'padding-top':0},300,function(){
                                    $overlay.fadeOut(300); 
                                })                     
                                
                            })
                        }else{
                            $overlay.css({display:'block',opacity:0})
                            $main.animate({'padding-top': '0px'}, 300, function(){
                                $overlay.css({display:'none',opacity:0.5})
                            })
                        }
                    } 
                })              
            })($);

            $uls.on('click', '.jian' ,function(){
                var $text = $(this).next();
                var arr = self.state.goodsData;
                var id = $(this).closest('li').attr('id');

                if($text.text()*1 == 1){
                    return;
                } else {
                    $text.text($text.text() * 1 - 1)
                }

                for(var i=0;i<arr.length;i++){
                    if(arr[i]._id == id){
                        arr[i].qty = $text.text() * 1
                    }
                }

                self.setState({goodsData: arr})

                let result = self.counting(self.state.goodsData)
                $totalPrice.text(result.totalPrice)
                $discountPrice.text(result.discountTotal)
                $resultPrice.text(result.shouldPrice)
                
                $overlay.find('img').css('display','none')
                $overlay.css({display:'block',opacity:0})
                http.post('update_qty',{product_id:id, qty:$text.text() * 1}).then((res) => {
                    $overlay.css({display:'none',opacity:0.8})
                    $overlay.find('img').css('display','block')
                    if(!res.status){
                        alert('更新失败')
                    }
                })
            })
            .on('click', '.jia', function(){
                var $text = $(this).prev();
                var arr = self.state.goodsData;
                var id = $(this).closest('li').attr('id');

                $text.text($text.text() * 1 + 1)

                for(var i=0;i<arr.length;i++){
                    if(arr[i]._id == id){
                        arr[i].qty = $text.text() * 1
                    }
                }

                self.setState({goodsData: arr})

                let result = self.counting(self.state.goodsData)
                $totalPrice.text(result.totalPrice)
                $discountPrice.text(result.discountTotal)
                $resultPrice.text(result.shouldPrice)

                $overlay.find('img').css('display','none')
                $overlay.css({display:'block',opacity:0})
                http.post('update_qty',{product_id:id, qty:$text.text() * 1}).then((res) => {
                    $overlay.css({display:'none',opacity:0.8})
                    $overlay.find('img').css('display','block')
                    if(!res.status){
                        alert('更新失败')
                    }
                })
            })

            //删除按钮的动画滑动
            var $delSingle;
            var direction;
            $uls.on('touchstart', '.right', function(event){
                $delSingle = $(this).find('.delSingle');
                var x = event.touches[0].clientX;
                var translateX = $delSingle.css('transform').split(',')[4]*1;
                $uls.on('touchmove', '.right', function(event){

                    var ox = event.targetTouches[0].clientX - x;
                    if(ox < 0){
                        direction = 1;
                    }else{
                        direction = 0;
                    }
                    var target = (translateX + ox)/translateX * 100;
                    if(target<0){
                        target = 0
                    }
                    $delSingle.css('transform','translateX('+target+'%)')
                })
            }).on('touchend', '.right', function(event){
                if(direction === 1){
                    $delSingle.css('transform','translateX(0)')
                } else {
                    $delSingle.css('transform','translateX(100%)')
                }
            })
            //点击删除当前商品
            .on('click', '.delSingle', function(){
                let id = $(this).closest('li').attr('id');
                let arr = self.state.goodsData;
                let idx;
                for(let i=0; i<arr.length; i++){
                    if(arr[i]._id == id){
                        idx = i ;
                        break;
                    }
                }
                arr.splice(idx,1);
                self.setState({goodsData: arr})

                $overlay.find('img').css('display','none')
                $overlay.css({display:'block',opacity:0})
                http.post('del_shop_cart', {product_id:id}).then((res) => {
                    $overlay.css({display:'none',opacity:0.8})
                    $overlay.find('img').css('display','block')
                    if(!res.status){
                        alert('更新失败')
                    }
                })

                if(self.state.goodsData.length > 0){
                    $goodCars.css('display','block')
                    $shopcar_footer.css('display','flex')
                } else {
                    console.log($empty)
                    $empty.css('display','block')
                } 
            })

            //点击结算
            $jiesuan.on('click',function(){
                self.props.createOrder(self.state.goodsData)
                let result = self.state.goodsData.some(function(item){
                    return item.check;
                })
                if(result){
                    self.props.router.push('shopcar/orders')
                } else {
                    window.alert('请勾选商品')
                }                
            })
        })

    }
    //计算总价
    counting(data){
        var totalPrice = 0;
        var discountTotal = 0;
        var shouldPrice = 0;

        for(var i=0; i<data.length; i++){
            if(data[i].check){
                totalPrice += (data[i].salesPrice * data[i].qty);
                discountTotal += (data[i].salesPrice * data[i].qty - data[i].discountPrice *data[i].qty)
                shouldPrice += (data[i].discountPrice *data[i].qty)                
            }
        }

        return {totalPrice, discountTotal, shouldPrice}
    }

    //多选框
    changeCheckbox(id,event){
        let self = this;
        jQuery(function($){  
            let $totalPrice = $('.shopcar_footer .totalPrice');
            let $discountPrice = $('.shopcar_footer .discountPrice')
            let $resultPrice = $('.shopcar_footer .resultPrice')
            let $overlay = $('#cdf_shopcar .overlay') 

            let goodsData = self.state.goodsData;
            let check;

            if(id == 'all'){
                let resCheckbox = self.state.checkbox;
                resCheckbox.all = !resCheckbox.all;
                self.setState({checkbox:resCheckbox});
                let arr = self.state.goodsData;
                self.setState({goodsData: arr.map(function(item){
                    item.check = self.state.checkbox.all;
                    return item;
                })})

                let result = self.counting(goodsData)
                $totalPrice.text(result.totalPrice)
                $discountPrice.text(result.discountTotal)
                $resultPrice.text(result.shouldPrice)
                
                $overlay.find('img').css('display','none')
                $overlay.css({display:'block',opacity:0})
                http.post('all_check',{allcheck:self.state.checkbox.all}).then((res) => {
                    $overlay.css({display:'none',opacity:0.8})
                    $overlay.find('img').css('display','block')
                    if(!res.status){
                        alert('更新失败')
                    }
                })


            } else {
                for(let i=0;i<goodsData.length;i++){
                    if(goodsData[i]._id == id){
                        goodsData[i].check = !goodsData[i].check;
                        check = goodsData[i].check;
                    }
                }

                self.setState({goodsData:goodsData})

                $overlay.find('img').css('display','none')
                $overlay.css({display:'block',opacity:0})
                http.post('update_shopcart_check',{product_id:id, check: check}).then((res) => {
                    $overlay.css({display:'none',opacity:0.8})
                    $overlay.find('img').css('display','block')
                    if(!res.status){
                        alert('更新失败')
                    }
                })

                let result = self.counting(goodsData)
                $totalPrice.text(result.totalPrice)
                $discountPrice.text(result.discountTotal)
                $resultPrice.text(result.shouldPrice)

                let changeSelect = goodsData.every(function(item){
                    return item.check;
                })
                self.setState({checkbox:{all:changeSelect}});
            }
        })
    }
    
    render(){
        return(
            <div id="cdf_shopcar" className="animate-route">
                <div className="shopcar_header"><span className="base"></span><span className="content">我的购物袋</span></div>
                <div className="shopcar_main">
                    <div className="empty">
                        <p>温馨提示 :三亚机场出发，至少于起飞前6小时完成购买；海口美兰、琼海博鳌机场、火车站出发，至少离岛前一天内完成购买，如有疑问，请致电400-699-6956。</p>
                        <div className="img_shop"></div>
                        <div className="text">您的购物袋内还没有任何商品 ……</div>
                        <Link to="/">去逛逛</Link>
                    </div>
                    <div className="goodCars">
                        <ul className="goods">
                            {
                                this.state.goodsData.map((item, idx) => {
                                    return (
                                        <li id={item._id} key={item+idx}>
                                            <div className="left">
                                                <input type="checkbox" checked={item.check} onChange={this.changeCheckbox.bind(this,item._id)}/>
                                            </div>
                                            <div className="center">
                                                <img src={item.pic}/>
                                                <h1>{item.name}</h1>
                                                <h3>免税价：<span>￥{item.discountPrice}</span></h3>
                                                <del><span>市场价：￥{item.salesPrice}</span></del>
                                                <div className="changeQty">

                                                   
                                                    <button className="jian">-</button><span>{item.qty}</span><button className="jia">+</button>

                                                </div>
                                            </div>
                                            <div className="right">
                                                <button className="delSingle">删除</button>
                                            </div>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
                <div className="shopcar_footer">
                    <div className="left">
                        <input type="checkbox" checked={this.state.checkbox.all} onChange={this.changeCheckbox.bind(this,'all')}/>
                        <span>全选</span>
                    </div>
                    <div className="center">
                        <p>总价￥<span className="totalPrice"></span>-优惠￥<span className="discountPrice"></span></p>
                        <p>应付金额：￥<span className="resultPrice"></span></p>
                    </div>
                    <div className="right">
                        <Link to="">去结算(<span>0</span>)</Link>
                    </div>
                </div>
                <div className="overlay">
                    <img src="http://img.lanrentuku.com/img/allimg/1307/5-130H2191323.gif" />
                    <div className="show"></div>    
                </div>
            </div>
        )
    }
}

const mapStatesToProps = (state) => {
    return {
        data: state.shopcar 
    }
}

export default connect(mapStatesToProps, actions)(ShopcarComponent)