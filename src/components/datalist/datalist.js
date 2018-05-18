import React from 'react'
import { Link } from 'react-router';

import './datalist.scss'

import http from '../../utils/httpclient'
import jQuery from 'jquery'

export default class Datalist extends React.Component {
	state = {
		data: [],
		normal: [],
		types: '',
		num: 0 ,
        qty: 10
	}
	componentDidMount() {
        let self = this;
		let type = this.props.location.query.type;
		let query_product_up = document.querySelector('#query_product_up');
		let query_product_down = document.querySelector('#query_product_down');
		let btn_action = document.querySelector('#btn_action');
        var $goodslist =jQuery('.datalist .goodslist');
        var $overlay = jQuery('.datalist .overlay')

		this.setState({
			types: type
		})

        $overlay.fadeIn(300);
		http.post('query_product', {
			type,
            qty:this.state.qty
		}).then((res) => {
			this.setState({
				data: res.data,
				normal: res.data
			})
            $overlay.fadeOut(300);
		})

		query_product_up.onclick = () => {
			this.setState({
				num: 1
			})

            $overlay.fadeIn(300);
			http.post('query_product_priceDesc', {
				type,
                qty:this.state.qty
			}).then((res) => {
				this.setState({
					data: res.data,
				})
                $overlay.fadeOut(300);
			})
		}

		query_product_down.onclick = () => {
			this.setState({
				num: 2
			})

            $overlay.fadeIn(300);
			http.post('query_product_priceAsc', {
				type,
                qty:this.state.qty
			}).then((res) => {
				this.setState({
					data: res.data,
				})
                $overlay.fadeOut(300);
			})
		}

		btn_action.onclick = () => {this.setState({
				num: 0,
				data: this.state.normal
			})
		}
            //下拉刷新
        jQuery(function($){

            ;(function($){
                var previousTop;
                var marginTop = 0;
                var start;
                var move;
                var target = $goodslist.height() * 0.1;
                var status = false;
                $goodslist.on('touchstart',function(event){
                    start = event.touches[0].clientY;
                    $goodslist.on('touchmove',function(event){
                        if($goodslist.get(0).scrollTop == 0){
                            status = true;
                            move = event.touches[0].clientY;
                            marginTop = (move - start)
                            if(marginTop < 0){
                                marginTop = 0;
                            }
                            if(marginTop > target){
                                marginTop = target;
                            }
                            $goodslist.css({'margin-top':marginTop +'px'})                       
                        }
                    })
                })
                $goodslist.on('touchend',function(){
                    if(status){
                        status = false;
                        if(marginTop == target){
                            $overlay.fadeIn(300);

                            switch(self.state.num){
                                case 0:
                                        http.post('query_product', {
                                            type,
                                            qty:self.state.qty
                                        }).then((res) => {
                                            self.setState({
                                                data: res.data,
                                                normal: res.data
                                            })  
                                            $goodslist.animate({'margin-top':0},300,function(){
                                                $overlay.fadeOut(300); 
                                            })           
                                        })
                                    break;
                                case 1:
                                        http.post('query_product_priceDesc', {
                                            type,
                                            qty:self.state.qty
                                        }).then((res) => {
                                            self.setState({
                                                data: res.data,
                                            })
                                            $goodslist.animate({'margin-top':0},300,function(){
                                                $overlay.fadeOut(300); 
                                            }) 
                                        })      
                                    break;
                                case 2:
                                        http.post('query_product_priceAsc', {
                                            type,
                                            qty:self.state.qty
                                        }).then((res) => {
                                            self.setState({
                                                data: res.data,
                                            })
                                            $goodslist.animate({'margin-top':0},300,function(){
                                                $overlay.fadeOut(300); 
                                            }) 
                                        })
                                    break;
                            }
          
                        }else{
                            $overlay.css({display:'block',opacity:0})
                            $goodslist.animate({'margin-top': '0px'}, 300, function(){
                                $overlay.css({display:'none',opacity:0.5})
                            })
                        }
                    } 
                })              
            })($);
        })

	}

	//跳转
	

	goback() {
		history.back();
	}

	render() {
		return(
			<div className="datalist animate-route">
                <div className="head">
                    <div className="iconfont icon-jiantou2 goback" onClick={this.goback.bind(this)}></div>
                    <div className="datalist_title">
                        <span>{this.state.types}</span>
                    </div>
                    <i className="iconfont icon-icon-"></i>
                </div>
                <div className="option">
                    <div id="btn_action"  className={this.state.num==0 ? 'btn_action':null}>销量</div>
                    <div  id="query_product_up" className={this.state.num==1 ? 'btn_action':null}>价格<span><i className="iconfont icon-sanjiaoxing-up"></i></span></div>
                    <div id="query_product_down" className={this.state.num==2 ? 'btn_action':null}>价格<span><i className="iconfont icon-sanjiaoxing-down"></i></span></div>
                    <div>筛选<i className="iconfont icon-shaixuan shaixuan"></i></div>
                </div>
                <div className="goodslist">
                    <ul >
                        {
                            this.state.data ? this.state.data.map((item) => {
                                    return (
                                        <li key={item._id} data-id={item._id}>
                                            <Link to={{pathname: '/goodsDetail', query:{id: item._id}}}>
                                                <img src={item.pic} />
                                                <p className="goods_name">{item.name}</p>
                                                <p className="goods_sale">
                                                    免税价:
                                                    <span>￥{item.discountPrice}</span>
                                                </p>
                                                <p className="goods_price">
                                                    <del>
                                                        市场价:
                                                        <span>￥{item.salesPrice}</span>
                                                    </del>
                                                </p>
                                            </Link>
                                        </li>
                                 )
                            }) : null
                        }
                    </ul>
                </div>
                <div className="overlay">
                    <img src="http://img.lanrentuku.com/img/allimg/1307/5-130H2191323.gif" />
                    <div className="show"></div>    
                </div>
            </div>
		)
	}
}