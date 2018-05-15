import React from 'react'
import http from '../../../utils/httpclient'

import './home.scss'
import $ from 'jquery'
import Swiper from 'swiper'



export default class HomeComponent extends React.Component{
    constructor() { 
        super();
        this.state = {
            product_nine:[]
        };
    }
    componentDidMount(){      
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
        http.post('product_nine').then((res)=>{
            this.setState({
                product_nine:res.data
            })
            ;(function(){
                let uls=$('.goods_li');
                for(let i=0;i<$('.goods_li').length;i++){
                    $(uls[i]).width(($(uls[i].children[0]).width()+40)*$(uls[i].children.length));
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
    }
    render(){
        const { prefixCls } = this.props;
        const { top, left, height, width } = this.state;  //取得实时状态机state的值
        return (
            <div id="cdf_home" className="animate2-route">
                <header className="cdf_home_header">
                    <h1>cdf</h1>
                    <input type="text" placeholder="分类 品牌 系列 商品"/>
                </header>
                <div className="main">
                    <div className="cdf_banner">
                        <div className="swiper-container">
                            <div className="swiper-wrapper">
                                <div className="swiper-slide" data-swiper-autoplay="2000">
                                    <img src="http://pic.cdfgsanya.com/mobilemall/1525680820786s1Eou.jpg"/>
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
                                    <img src="http://pic.cdfgsanya.com/mobilemall/15245613946744tNlG.jpg"/>
                                </div>
                                <div className="swiper-slide" data-swiper-autoplay="2000">
                                    <img src="http://pic.cdfgsanya.com/mobilemall/1523326998285BQXht.jpg"/>
                                </div>
                            </div>
                            <div className="swiper-pagination"></div>
                        </div>
                    </div>
                    <div className="cdf_home_menu">
                        <ul>
                            <li>
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
                    <div className="img0">
                        <img src="http://pic.cdfgsanya.com/mobilemall/1525397920969VptSp.jpg" />
                        <img src="http://pic.cdfgsanya.com/mobilemall/1525103670603kDiot.jpg" />
                    </div>
                    <div className="img1">
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
                                    this.state.product_nine.map((item)=>{
                                        return (
                                            <li>
                                                <img src={item.pic} />
                                                <p>{item.name}</p>
                                                <p>促销价：￥{item.discountPrice}</p>
                                                <p>立省 ￥{item.salesPrice - item.discountPrice}</p>
                                            </li>
                                        )
                                    })
                                }
                            <li className="see_more" >
                                <p>查看更多</p>
                                <p>see</p>
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
                                    this.state.product_nine.map((item)=>{
                                        return (
                                            <li>
                                                <img src={item.pic} />
                                                <p>{item.name}</p>
                                                <p>促销价：￥{item.discountPrice}</p>
                                                <p>立省 ￥{item.salesPrice - item.discountPrice}</p>
                                            </li>
                                        )
                                    })
                                }
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
                                    this.state.product_nine.map((item)=>{
                                        return (
                                            <li>
                                                <img src={item.pic} />
                                                <p>{item.name}</p>
                                                <p>促销价：￥{item.discountPrice}</p>
                                                <p>立省 ￥{item.salesPrice - item.discountPrice}</p>
                                            </li>
                                        )
                                    })
                                }
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
                                    this.state.product_nine.map((item)=>{
                                        return (
                                            <li>
                                                <img src={item.pic} />
                                                <p>{item.name}</p>
                                                <p>促销价：￥{item.discountPrice}</p>
                                                <p>立省 ￥{item.salesPrice - item.discountPrice}</p>
                                            </li>
                                        )
                                    })
                                }
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
                                    this.state.product_nine.map((item)=>{
                                        return (
                                            <li>
                                                <img src={item.pic} />
                                                <p>{item.name}</p>
                                                <p>促销价：￥{item.discountPrice}</p>
                                                <p>立省 ￥{item.salesPrice - item.discountPrice}</p>
                                            </li>
                                        )
                                    })
                                }
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
                                    this.state.product_nine.map((item)=>{
                                        return (
                                            <li>
                                                <img src={item.pic} />
                                                <p>{item.name}</p>
                                                <p>促销价：￥{item.discountPrice}</p>
                                                <p>立省 ￥{item.salesPrice - item.discountPrice}</p>
                                            </li>
                                        )
                                    })
                                }
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
                                <li>
                                    <img src="http://pic.cdfgsanya.com/upload/1/991142/610/237571/269970_1_pic400_3738.jpg" alt=""/>
                                    <p>肌透修护眼部精华霜两支装</p>
                                    <p>免税价：<span>￥ 650.00</span></p>
                                    <p>市场价：<span>￥ 980.00</span></p>
                                </li>
                                <li>
                                    <img src="http://pic.cdfgsanya.com/upload/1/991142/610/237571/269970_1_pic400_3738.jpg" alt=""/>
                                    <p>肌透修护眼部精华霜两支装</p>
                                    <p>免税价：<span>￥ 650.00</span></p>
                                    <p>市场价：<span>￥ 980.00</span></p>
                                </li>
                                <li>
                                    <img src="http://pic.cdfgsanya.com/upload/1/991142/610/237571/269970_1_pic400_3738.jpg" alt=""/>
                                    <p>肌透修护眼部精华霜两支装</p>
                                    <p>免税价：<span>￥ 650.00</span></p>
                                    <p>市场价：<span>￥ 980.00</span></p>
                                </li>
                                <li>
                                    <img src="http://pic.cdfgsanya.com/upload/1/991142/610/237571/269970_1_pic400_3738.jpg" alt=""/>
                                    <p>肌透修护眼部精华霜两支装</p>
                                    <p>免税价：<span>￥ 650.00</span></p>
                                    <p>市场价：<span>￥ 980.00</span></p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
        
    }
}