import React from 'react'

import './orders.scss'
import { Link } from 'react-router';
import http from '../../../../utils/httpclient'

export default class OrdersComponent extends React.Component {

	componentDidMount() {
		let lis = document.querySelectorAll('.lis')
		let uls = document.querySelector('.uls')
		uls.style.width = lis.length * 2.537036 + 'rem';

	}

	render() {
		return(
			<div id="orders" className="animate-route">
            		<div className="orders_top">
					<Link to="shopcar"><i className="icon-jiantou iconfont "></i></Link>
						结算中心
						<span></span>
					</div>
					<div className="orders_main">
						<ul>
							<li >
							<i className="icon-lianxiwomendibiao  iconfont"></i>
								<h2>提货人:<span>小花花</span></h2>
								<h3><i className="icon-lianxiwomendianhua iconfont"></i>13106728392</h3>
								<h4><i className="icon-daitihuo iconfont"></i>详细地址:<span>过程花开了会计师考虑对方</span></h4>
							</li>		
						</ul>
						<div className="orders_box">
							<h4>商品详情</h4>
							<div className="show_pic">
								<ul className="uls">
									<li className="lis"><img src=""/></li>
									<li className="lis"><img src=""/></li>
									<li className="lis"><img src=""/></li>
									<li className="lis"><img src=""/></li>
									<li className="lis"><img src=""/></li>
									<li className="lis"><img src=""/></li>
									<li className="lis"><img src=""/></li>
								</ul>
							</div>
							<Link to=""><i className="icon-jiantou iconfont "></i></Link>
							<h3>共<span>9</span>件商品，应付金额：<span>￥2720.00</span></h3>
							<h2>支付方式</h2>
							<div className="pay_way"><Link to=""  >在线支付</Link></div>
							<h5>网上支付国家海关全程监管,离岛凭身份证走快速提货通道</h5>
							<h5>支持支付宝,网银支付.</h5>
						</div>
						<div className="orders_other">所要发票<i className="icon-jiantou iconfont "></i><span>否</span></div>
						<div className="orders_other">我的优惠券<i className="icon-jiantou iconfont "></i><span>0张可用</span></div>
						<div className="orders_pays">
							<h3><span>商品总价:<i>￥2920.00</i></span></h3>
							<h3><span>折扣优惠:<i>-￥0.00</i></span></h3>
							<h3><span>行邮税:<i>+￥0.00</i></span></h3>
							<h3><span>行邮税优惠:<i>-￥0.00</i></span></h3>
							<h3><span>应付金额:<i>￥2920.00</i></span></h3>
						</div>
					</div>
					
						<div className="orders_footer">
							<h3>商品总价￥2920.00-折扣金额￥0.00</h3>
							
							<h4>应付金额  ￥2920.00</h4>
							<Link to="">提交订单</Link>
						</div>
					
            </div>
		)

	}
}