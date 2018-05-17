import React from 'react'
import {connect} from 'react-redux'
import './orders.scss'
import { Link } from 'react-router';
import http from '../../../../utils/httpclient'

 class OrdersComponent extends React.Component {
		state={
			order:[],
			qty:0,
			total:0,
			
		}
		
		
	componentDidMount() {
		let uls = document.querySelector('.uls');
		let qty =0;
		let total=0;
		let lists=0;
		
		
		console.log(this.props.data.data)
		this.props.data.data.map((item,index)=>{
			if(item.check){
				qty += item.qty*1;
				total += item.qty*item.salesPrice;
			}
			
		
		})
		console.log(qty)
		this.setState({
			order:this.props.data.data,
			qty:qty,
			total:total.toFixed(2)
		})
		
	
		uls.style.width = (this.props.data.data.length+1) * 2.537036 + 'rem';
		
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
								{
									this.state.order.map((item)=>{
										if(item.check){
											return (<li className="lis" key={item.id}><img src={item.pic}/></li>)
										}
										
									})
								}
								
								</ul>
							</div>
							<Link to=""><i className="icon-jiantou iconfont "></i></Link>
							<h3>共<span>{this.state.qty}</span>件商品，应付金额：<span>￥{this.state.total}</span></h3>
							<h2>支付方式</h2>
							<div className="pay_way"><Link to=""  >在线支付</Link></div>
							<h5>网上支付国家海关全程监管,离岛凭身份证走快速提货通道</h5>
							<h5>支持支付宝,网银支付.</h5>
						</div>
						<div className="orders_other">所要发票<i className="icon-jiantou iconfont "></i><span>否</span></div>
						<div className="orders_other">我的优惠券<i className="icon-jiantou iconfont "></i><span>0张可用</span></div>
						<div className="orders_pays">
							<h3><span>商品总价:<i>￥{this.state.total}</i></span></h3>
							<h3><span>折扣优惠:<i>-￥0.00</i></span></h3>
							<h3><span>行邮税:<i>+￥0.00</i></span></h3>
							<h3><span>行邮税优惠:<i>-￥0.00</i></span></h3>
							<h3><span>应付金额:<i>￥{this.state.total}</i></span></h3>
						</div>
					</div>
					
						<div className="orders_footer">
							<h3>商品总价￥{this.state.total}-折扣金额￥0.00</h3>
							
							<h4>应付金额  ￥{this.state.total}</h4>
							<Link to="">提交订单</Link>
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

export default connect(mapStatesToProps)(OrdersComponent);