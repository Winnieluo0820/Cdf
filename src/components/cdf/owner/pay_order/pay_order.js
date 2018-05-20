import React from 'react'
import './pay_order.scss'

import { Link } from 'react-router';
import http from '../../../../utils/httpclient'

export default class Pay_orederComponent extends React.Component {
	state = {
		orders: [],
		total: [],
		qtys: []
	}

	componentDidMount() {
		let qtys = [];
		let total = [];
		let colost1 = document.querySelector('.colost1');
		let $is_pay = $('.is_pay');

		http.post('showOrder').then((res) => {
			if(res.status) {
				this.setState({
					orders: res.data
				})
			}
			res.data.map((item) => {
				let money = 0;
				let num = 0;
				item.goodslist.map((key) => {
					num += key.product_qty * 1;
					money += ((key.product_qty * 1) * (key.goodDetail.discountPrice * 1));
				})
				total.push(money)
				qtys.push(num)
			})
			this.setState({
				total: total,
				qtys: qtys
			})

			let $orders = $('.orders');
			let $pay_main = $('.pay_main')
		
			let sure_pay = $('.sure_pay');
			let order_id = '';

			$pay_main.on('click', '.sure_pay', function() {
				order_id = $(this).closest('.orders').find('.orders_id').text();
				$is_pay[0].style.display = "block"
			})
			var slider = new SliderUnlock(".is_payss", {}, () => {
				http.post('showOrder', {
					order_id: order_id
				}).then((res) => {
					console.log(res)
					if(res.status) {
						this.setState({
							orders: res.data
						})
					}
					res.data.map((item) => {
						let money = 0;
						let num = 0;
						item.goodslist.map((key) => {
							num += key.product_qty * 1;
							money += ((key.product_qty * 1) * (key.goodDetail.discountPrice * 1));
						})
						total.push(money)
						qtys.push(num)
					})
					this.setState({
						total: total,
						qtys: qtys
					})
					$('.is_pay')[0].style.display = 'none'
					slider.reset();
				})
			}, () => {});
			slider.init();
		})
		
		
		colost1.onclick= ()=>{
			$is_pay[0].style.display='none'
		}
		
		
		
		
		

	}

	render() {
		return(
			<div id="Pay_order"  className="animate-route">
					<div className="pay_top">
						<Link to="owner"><i className="icon-jiantou iconfont "></i></Link>
							订单中心
						<span></span>
					</div>
					<div className="pay_main">
						{
							this.state.orders.map((item,index)=>{
								return(
										<div className="orders" key={item.order_id}>
											<h3><i className="icon-wodedingdan1 iconfont"></i>订单编号：<span className="orders_id">{item.order_id}</span> <span className="pay_status">{item.payState ? '已支付'  :'未支付'}</span></h3>
											<ul>
												{
												item.goodslist.map((key)=>{
													return(
														<li key={key.product_id}>
															<img src={key.goodDetail.pic}/>
															<p>{key.goodDetail.name}</p>
															<h3>￥{key.goodDetail.discountPrice}</h3>
															<h5>￥{key.goodDetail.salesPrice}</h5>
															<h4>X{key.product_qty}</h4>
														</li>
													)
												})
												}	 
											</ul>
											<h5>共{this.state.qtys[index]}件商品,合计:  ￥{this.state.total[index]} (含运费￥0.00) <span className={item.payState ? ' '  :'sure_pay'}>{item.payState ? ''  :'确认支付'}</span></h5>
										</div>
								)
							})
						}
					</div>
					<div className="is_pay">
						<div className="is_payss">
							<span id="label"></span>
							<span id="lableTip">滑动完成支付</span>
						</div>
						<i className="icon-icon-2 iconfont colost1"></i>
					</div>
			</div>
		)
	}

}