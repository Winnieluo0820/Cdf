import React from 'react'
import {Link} from 'react-router';

import http from '../../../utils/httpclient'

import './home.scss'
import $ from '../../../libs/jquery-3.2.1'
import jQuery from 'jquery'
export default class HomeComponent extends React.Component{
    constructor() { 
        super();
        this.state = {
            product_nine:[],
            product_bags:[],
            product_shoushi:[],
            product_mask:[],
            product_sunglass:[],
            scroll_Top:0,
            products:[]
        };
    }
    toTop(){
        var timer = setInterval(()=>{
            var speed = parseInt(this.state.scroll_Top/5);
            if(this.refs.main_cont.scrollTop<= 10){
                speed = 0;
                clearInterval(timer);
            }
            this.refs.main_cont.scrollTop=this.refs.main_cont.scrollTop - speed;
        },30)
    }

    toSearch(){
        this.props.router.push('/search');
    }
    toBack(){
        window.history.back();
    }
    toRank(){
        this.props.router.push('/rank');
    }
    componentDidMount(){     
        var self = this; 
        var mySwiper = new Swiper ('.swiper-container', {
            direction: 'horizontal',
            loop: true,
            paginationClickable:true,
            autoplay: {
                disableOnInteraction: false,
            },
            pagination: {
              el: '.swiper-pagination'
            }
        })  
        this.refs.main_cont.addEventListener('scroll',(e)=>{
            e.preventDefault();
            let scrollTop=this.refs.main_cont.scrollTop;
            if(scrollTop >= this.refs.head.offsetHeight + this.refs.cdf_banner.offsetHeight+this.refs.menu.offsetHeight+this.refs.img0.offsetHeight+this.refs.img1.offsetHeight+20){
                this.refs.toTop.classList.add('active');
                this.setState({
                    scroll_Top:scrollTop
                })
            }else{
                this.refs.toTop.classList.remove('active');
            }
        })
        http.post('product_onQty',{qty:9,type:'太阳镜'}).then((res)=>{
            this.setState({
                product_sunglass:res.data
            })
        })
        http.post('product_onQty',{qty:9,type:'首饰'}).then((res)=>{
            this.setState({
                product_shoushi:res.data
            })
        })
        http.post('product_onQty',{qty:9,type:'女包'}).then((res)=>{
            this.setState({
                product_bags:res.data
            })
        })
        http.post('product_onQty',{qty:9,type:'护肤'}).then((res)=>{
            this.setState({
                product_mask:res.data
            })
        })
        http.post('product_onQty',{qty:9}).then((res)=>{
            this.setState({
                product_nine:res.data
            })
            ;(function(){
                let uls=$('.goods_li');
                for(let i=0;i<$('.goods_li').length;i++){
                    $(uls[i]).width(($(uls[i].children[0]).width()+50)*$(uls[i].children).length);
                    var ul_width = $(uls[i]).width();
                    var li_with = $(uls[i].children[0]).width();
                    $(uls[i].parentNode).on('touchstart',function(event){
                        var ox = event.touches[0].pageX;
                        var left = $(uls[i]).position().left;
                        $(uls[i].parentNode).on('touchmove',function(event){
                            $(uls[i]).css('left', event.touches[0].pageX - ox + left)
                        })
                    })
                    .on('touchend',function(){
                        if($(uls[i]).position().left > 0){
                            $(uls[i]).animate({left:0},300)
                        }
                        if($(uls[i]).position().left < -ul_width+li_with*3){
                            $(uls[i]).animate({left:-ul_width+li_with*3},300)
                        }
                    })
                }
            })();
        })
        http.post('product_onQty',{qty:10}).then((res)=>{
            this.setState({
                products:res.data
            })
        })

            
        jQuery(function($){
            var $main  =  $('#cdf_home .main')
            var $main_container = $main.find('.main_container');
            var $overlay = $('#cdf_home .overlay')
            var $loadingBottom = $('#cdf_home .loadingBottom')
            var $no_more = $('#cdf_home .main .no_more')
            //下拉刷新
            ;(function($){
                var previousTop;
                var marginTop = 0;
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
                            marginTop = (move - start)
                            if(marginTop < 0){
                                marginTop = 0;
                            }
                            if(marginTop > target){
                                marginTop = target;
                            }
                            $main.css({'margin-top':marginTop +'px'})                       
                        }
                    })
                })
                $main.on('touchend',function(){
                    if(status){
                        status = false;
                        if(marginTop == target){
                            $overlay.fadeIn(300);
                                var p1 = new Promise((resolved, rejected) => {
                                    http.post('product_onQty',{qty:8,type:'太阳镜'}).then((res)=>{
                                        self.setState({
                                            product_sunglass:res.data
                                        })
                                        resolved('p1');
                                    })                               
                                })
                                var p2 = new Promise((resolved, rejected) => {
                                    http.post('product_onQty',{qty:7,type:'首饰'}).then((res)=>{
                                        self.setState({
                                            product_shoushi:res.data
                                        })
                                        resolved('p2');
                                    })
                                })
                                var p3 = new Promise((resolved, rejected) => {
                                    http.post('product_onQty',{qty:9}).then((res)=>{
                                        self.setState({
                                            product_nine:res.data
                                        })
                                        ;(function(){
                                            let uls=$('.goods_li');
                                            for(let i=0;i<$('.goods_li').length;i++){
                                                $(uls[i]).width(($(uls[i].children[0]).width()+50)*$(uls[i].children).length);
                                                var ul_width = $(uls[i]).width();
                                                var li_with = $(uls[i].children[0]).width();
                                                $(uls[i].parentNode).on('touchstart',function(event){
                                                    var ox = event.touches[0].pageX;
                                                    var left = $(uls[i]).position().left;
                                                    $(uls[i].parentNode).on('touchmove',function(event){
                                                        $(uls[i]).css('left', event.touches[0].pageX - ox + left)
                                                    })
                                                })
                                                .on('touchend',function(){
                                                    if($(uls[i]).position().left > 0){
                                                        $(uls[i]).animate({left:0},300)
                                                    }
                                                    if($(uls[i]).position().left < -ul_width+li_with*3){
                                                        $(uls[i]).animate({left:-ul_width+li_with*3},300)
                                                    }
                                                })
                                            }
                                        })();
                                        resolved('p3')
                                    })
                                })  
                                var p4 = new Promise((resolved, rejected) => {
                                    http.post('product_onQty',{qty:10}).then((res)=>{
                                        self.setState({
                                            products:res.data
                                        })
                                        resolved('p4')
                                    })   
                                })
                                var p5 = new Promise((resolved, rejected) => {
                                    http.post('product_onQty',{qty:9,type:'女包'}).then((res)=>{
                                        self.setState({
                                            product_bags:res.data
                                        })
                                        resolved('p5');
                                    })
                                })
                                var p6 = new Promise((resolved, rejected) => {
                                    http.post('product_onQty',{qty:9,type:'护肤'}).then((res)=>{
                                        self.setState({
                                            product_mask:res.data
                                        })
                                        resolved('p6');
                                    })   
                                })

                                Promise.all([p1,p2,p3,p4,p5,p6]).then((res) => {
                                    if(!Array.isArray(res)){
                                        window.alert('刷新失败')
                                    }
                                    $main.animate({'margin-top':0},300,function(){
                                        $overlay.fadeOut(300); 
                                    }) 
                                })
                        }else{
                            $overlay.css({display:'block',opacity:0})
                            $main.animate({'margin-top': '0px'}, 300, function(){
                                $overlay.css({display:'none',opacity:0.5})
                            })
                        }
                    } 
                })              
            })($);
            //懒加载
            ;(function($){
                var qty = 10;
                var status = false;
                $main.on('touchend',function(event){
                    if(status){
                        return;
                    }
                    var scrollBig = this.scrollHeight * ( $main.height() /  $main_container.height())

                    if(this.scrollTop + scrollBig > this.scrollHeight * 0.9){
                        status = true;
                        qty += 10;
                        http.post('product_onQty',{qty:qty}).then((res)=>{
                            self.setState({
                                products:res.data
                            })
                            status = false;
                            if(res.data.length < qty){
                                $loadingBottom.css('display','none')
                                $no_more.css('display', 'block')
                            }
                        })
                    }
                })
            })($);
        })
    }
    render(){
        const { prefixCls } = this.props;
        const { top, left, height, width } = this.state;  //取得实时状态机state的值
        return (
            <div id="cdf_home" className="animate-route">
                <header className="cdf_home_header" ref="head">
                    <h1>cdf</h1>
                    <div className="search">
                        <i className="iconfont icon-icon-"></i>
                        <input type="text" placeholder="分类 品牌 系列 商品" onFocus={this.toSearch.bind(this)}/>
                    </div>
                </header>
                <div className="scrollToTop" ref="toTop" onClick={this.toTop.bind(this)}>
                    <span className="iconfont icon-jiantoushang"></span>
                </div>
                <div className="main" ref="main_cont">
                    <div className="main_container">
                        <div className="cdf_banner" ref="cdf_banner">
                            <div className="swiper-container">
                                <div className="swiper-wrapper">
                                    <div className="swiper-slide" data-swiper-autoplay="2000">
                                        <img src="http://pic.cdfgsanya.com/mobilemall/1526440257041WFkZG.jpg"/>
                                    </div>
                                    <div className="swiper-slide" data-swiper-autoplay="2000">
                                        <img src="http://pic.cdfgsanya.com/mobilemall/1525958825495bvvkY.jpg"/>
                                    </div>
                                    <div className="swiper-slide" data-swiper-autoplay="2000">
                                        <img src="http://pic.cdfgsanya.com/mobilemall/1525958869753dXIF4.jpg"/>
                                    </div>
                                    <div className="swiper-slide" data-swiper-autoplay="2000">
                                        <img src="http://pic.cdfgsanya.com/mobilemall/1525958960770XBE1J.jpg"/>
                                    </div>
                                    <div className="swiper-slide" data-swiper-autoplay="2000">
                                        <img src="http://pic.cdfgsanya.com/mobilemall/1525959173919Z81ig.jpg"/>
                                    </div>
                                    <div className="swiper-slide" data-swiper-autoplay="2000">
                                        <img src="http://pic.cdfgsanya.com/mobilemall/1526462857735NsYtG.jpg"/>
                                    </div>
                                    <div className="swiper-slide" data-swiper-autoplay="2000">
                                        <img src="http://pic.cdfgsanya.com/mobilemall/1526441805583uDsUr.jpg"/>
                                    </div>
                                </div>
                                <div className="swiper-pagination"></div>
                            </div>
                        </div>
                        <div className="cdf_home_menu" ref="menu">
                        <ul>
                            <li onClick={this.toRank.bind(this)}>
                                <i className="iconfont icon-paihangbang-"></i>
                                <span>排行榜</span>
                            </li>
                            <li>
                                <i className="iconfont icon-dingdan"></i>
                                <span>我的订单</span>
                            </li>
                            <li>
                                <i className="iconfont icon-youhuiquan-01"></i>
                                <span>优惠券</span>
                            </li>
                            <li>
                                <i className="iconfont icon-liulanjilu"></i>
                                <span>购物流程</span>
                            </li>
                            <li>
                                <i className="iconfont icon-changjianwenti"></i>
                                <span>常见问题</span>
                            </li>
                        </ul>
                    </div>
                    <div className="img0" ref="img0">
                        <Link to={{pathname:'/datalist',query:{brand:'Estée Lauder 雅诗兰黛'}}}>
                            <img src="http://pic.cdfgsanya.com/mobilemall/1525397920969VptSp.jpg" />
                        </Link>
                        <Link to={{pathname:'/datalist',query:{brand:'Whoo  后'}}}>
                            <img src="http://pic.cdfgsanya.com/mobilemall/1525103670603kDiot.jpg" />
                        </Link>
                    </div>
                        <div className="img1" ref="img1">
                            <img src="http://pic.cdfgsanya.com/mobilemall/1525103144774tLi3Y.jpg" alt=""/>
                        </div>
                        <div className="floor">
                            <div className="floor_text">
                                <div className="left_line"></div>
                                <span>世界好物大搜罗 下单立享5折起</span>
                                <div className="right_line"></div>
                            </div>
                            <div className="floor_pic">
                                <img src="http://pic.cdfgsanya.com/mobilemall/1525104022251kptZL.jpg" alt=""/>
                            </div>
                            <div className="goodslist" >
                                <ul className="goods_li" ref="goods">
                                    {
                                        this.state.product_nine.map((item, idx)=>{
                                            return (
                                                <li key={item + idx}>
                                                    <Link to={{pathname:'/goodsDetail',query:{id:item._id}}}>
                                                        <img src={item.pic} />
                                                        <p>{item.name}</p>
                                                        <p>促销价：￥{item.discountPrice}</p>
                                                        <p>立省 ￥{item.salesPrice - item.discountPrice}</p>
                                                    </Link>
                                                </li>
                                            )
                                        })
                                    }
                                    <li>
                                        <div className="cont_box">
                                            <p>查看更多</p>
                                            <p>see</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="floor">
                            <div className="floor_text">
                                <div className="left_line"></div>
                                <span>细嫩紧致 水漾容颜</span>
                                <div className="right_line"></div>
                            </div>
                            <div className="floor_pic">
                                <img src="http://pic.cdfgsanya.com/mobilemall/1525958767167XppEp.jpg" alt=""/>
                            </div>
                            <div className="goodslist" >
                                <ul className="goods_li" ref="goods" >
                                    {
                                        this.state.product_mask.map((item, idx)=>{
                                            return (
                                                <li key={item + idx}>
                                                    <Link to={{pathname:'/goodsDetail',query:{id:item._id}}}>
                                                        <img src={item.pic} />
                                                        <p>{item.name}</p>
                                                        <p>促销价：￥{item.discountPrice}</p>
                                                        <p>立省 ￥{item.salesPrice - item.discountPrice}</p>
                                                    </Link>
                                                </li>
                                            )
                                        })
                                    }
                                    <li>
                                        <div className="cont_box">
                                            <div className="more">
                                                <p>查看更多</p>
                                                <p>see more</p>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="floor">
                            <div className="floor_text">
                                <div className="left_line"></div>
                                <span>改写肌龄 细致呵护</span>
                                <div className="right_line"></div>
                            </div>
                            <div className="floor_pic">
                                <img src="http://pic.cdfgsanya.com/mobilemall/152595878283346Vg2.jpg" alt=""/>
                            </div>
                            <div className="goodslist" >
                                <ul className="goods_li" ref="goods" >
                                    {
                                        this.state.product_nine.map((item, idx)=>{
                                            return (
                                                <li key={item + idx}>
                                                    <Link to={{pathname:'/goodsDetail',query:{id:item._id}}}>
                                                        <img src={item.pic} />
                                                        <p>{item.name}</p>
                                                        <p>促销价：￥{item.discountPrice}</p>
                                                        <p>立省 ￥{item.salesPrice - item.discountPrice}</p>
                                                    </Link>
                                                </li>
                                            )
                                        })
                                    }
                                    <li>
                                        <div className="cont_box">
                                            <p>查看更多</p>
                                            <p>see</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="floor">
                            <div className="floor_text">
                                <div className="left_line"></div>
                                <span>绚丽活泼 个性潮流</span>
                                <div className="right_line"></div>
                            </div>
                            <div className="floor_pic">
                                <img src="http://pic.cdfgsanya.com/mobilemall/1525958798679TGLP4.jpg" alt=""/>
                            </div>
                            <div className="goodslist" >
                                <ul className="goods_li" ref="goods" >
                                   {
                                        this.state.product_shoushi.map((item, idx)=>{
                                            return (
                                                <li key={item + idx}>
                                                    <Link to={{pathname:'/goodsDetail',query:{id:item._id}}}>
                                                        <img src={item.pic} />
                                                        <p>{item.name}</p>
                                                        <p>促销价：￥{item.discountPrice}</p>
                                                        <p>立省 ￥{item.salesPrice - item.discountPrice}</p>
                                                    </Link>
                                                </li>
                                            )
                                        })
                                    }
                                    <li>
                                        <div className="cont_box">
                                            <p>查看更多</p>
                                            <p>see</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="floor">
                            <div className="floor_text">
                                <div className="left_line"></div>
                                <span>精湛工艺 手工制作</span>
                                <div className="right_line"></div>
                            </div>
                            <div className="floor_pic">
                                <img src="http://pic.cdfgsanya.com/mobilemall/15251071612899OXOU.jpg" alt=""/>
                            </div>
                            <div className="goodslist" >
                                <ul className="goods_li" ref="goods">
                                    {
                                        this.state.product_bags.map((item, idx)=>{
                                            return (
                                                <li key={item + idx}>
                                                    <Link to={{pathname:'/goodsDetail',query:{id:item._id}}}>
                                                        <img src={item.pic} />
                                                        <p>{item.name}</p>
                                                        <p>促销价：￥{item.discountPrice}</p>
                                                        <p>立省 ￥{item.salesPrice - item.discountPrice}</p>
                                                    </Link>
                                                </li>
                                            )
                                        })
                                    }
                                    <li>
                                        <div className="cont_box">
                                            <p>查看更多</p>
                                            <p>see</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="floor">
                            <div className="floor_text">
                                <div className="left_line"></div>
                                <span>前卫风范 我不一样</span>
                                <div className="right_line"></div>
                            </div>
                            <div className="floor_pic">
                                <img src="http://pic.cdfgsanya.com/mobilemall/1525104407699cpbXN.jpg" alt=""/>
                            </div>
                            <div className="goodslist" >
                                <ul className="goods_li" ref="goods" >
                                    {
                                        this.state.product_sunglass.map((item,idx)=>{
                                            return (
                                                <li key={item + idx}>
                                                    <Link to={{pathname:'/goodsDetail',query:{id:item._id}}}>
                                                        <img src={item.pic} />
                                                        <p>{item.name}</p>
                                                        <p>促销价：￥{item.discountPrice}</p>
                                                        <p>立省 ￥{item.salesPrice - item.discountPrice}</p>
                                                    </Link>
                                                </li>
                                            )
                                        })
                                    }
                                    <li>
                                        <div className="cont_box">
                                            <p>查看更多</p>
                                            <p>see</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="floor">
                            <div className="floor_text">
                                <div className="left_line"></div>
                                <span>科颜氏男士护肤专场</span>
                                <div className="right_line"></div>
                            </div>
                            <div className="floor_pic">
                                <img src="http://pic.cdfgsanya.com/mobilemall/1525104537248XQRHN.jpg" alt=""/>
                            </div>
                        </div>
                        <div className="floor">
                            <div className="floor_text">
                                <div className="left_line"></div>
                                <span>兰蔻旅行新“肌”遇</span>
                                <div className="right_line"></div>
                            </div>
                            <div className="floor_pic">
                                <img src="http://pic.cdfgsanya.com/mobilemall/15226325669811mrSo.jpg" alt=""/>
                            </div>
                        </div>
                        <div className="floor">
                            <div className="floor_text">
                                <div className="left_line"></div>
                                <span>Armani Box 登陆三亚国际免税城</span>
                                <div className="right_line"></div>
                            </div>
                            <div className="floor_pic">
                                <img src="http://pic.cdfgsanya.com/mobilemall/1525440343757UsR4W.jpg" alt=""/>
                            </div>
                        </div>
                        <div className="all_buy">
                            <div className="floor_text">
                                <div className="left_line"></div>
                                <span>大家都在买</span>
                                <div className="right_line"></div>
                            </div>
                            <div className="goods">
                                <ul>
                                    {
                                        this.state.products.map((item, idx)=>{
                                            return (
                                                <li key={item + idx}>

                                                    <Link to={{pathname:'/goodsDetail',query:{id:item._id}}}>
                                                        <img src={item.pic} />
                                                        <p>{item.name}</p>
                                                        <p>免税价：<span>￥{item.discountPrice}</span></p>
                                                        <del>市场价：￥{item.salesPrice}</del>
                                                    </Link>


                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                            <div className="no_more">
                                <div className="left_line"></div>
                                <span>没有更多</span>
                                <div className="right_line"></div>
                            </div>
                        </div>
                        <div className="loadingBottom"><img src="http://img.lanrentuku.com/img/allimg/1307/5-130H2191323.gif" /></div>
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