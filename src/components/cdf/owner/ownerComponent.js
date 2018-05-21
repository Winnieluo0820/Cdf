import React from 'react'

import './owner.scss'
import { Link } from 'react-router';
import http from '../../../utils/httpclient'

export default class OwnerComponent extends React.Component {
	state = {
		username: '注册/登录',
		login_s: 0,
		willpay:0,
		didpay:0
	}

	componentDidMount() {
		//进来就判断是否有登录，获取登录人的信息
		//如果有就添加到登录的框，然后添加到名字框
		var self = this;
		let loginout = document.querySelector('.icon-tuichu');
		let login_btn = document.querySelector('.login_btn');
		//console.log(login_btn)

		http.post('islogin').then((res) => {
			if(res.status) {
				this.setState({
					username: res.data,
					login_s: 1
				})
				loginout.style.display = 'block';
			}
		})
		
		http.post('showOrder').then((res)=>{
			let wiilpays=0;
			let didpays=0;
			if(res.status){
				res.data.map((item)=>{
					if(item.payState){
						
						didpays++;
					}else if(!item.payState){
						wiilpays++;
					}
				})
				this.setState({
					willpay:wiilpays,
					didpay:didpays
				})
			}
		})
		
		

		loginout.onclick = function() {
			window.localStorage.setItem('access_token', '')
			self.props.router.push('/')
		}
		
			
		
		
		
		
	}

	render() {
		return(
			<div id="cdf_owner" className="animate-route">
            	<div className="owner_top">
            		<Link to={this.state.login_s ==0 ? 'login' : ''} className="login_btn"><i className="icon-wode iconfont "></i>
            		<p>{this.state.username}</p>
            			</Link>
            		<img src="http://pic.cdfgsanya.com/upload/2016/8/2/20160802095348455.jpg"/>
            		<i className="icon-tuichu iconfont"></i>
            	</div>
            	
            	<div className="owner_second">
            		<h4> <i className="iconfont icon-wodedingdan1"></i> 全部订单
            			<Link to="owner/pay_order">查看全部订单<i className="icon-jiantou iconfont "></i></Link>
            		</h4>
           			<ul>
           			<li>
           			<Link to=""><i className="icon-daizhifu iconfont "></i>
            			<h5>待支付</h5>
            			</Link>
           			</li>
           			<li>
           			<Link to=""><i className="icon-daitihuo iconfont "></i>
            				<h5>待提货</h5></Link>         				
           			</li>
           				<li>
           			<Link to=""><i className="icon-yiwancheng1 iconfont "></i>
            			<h5>已完成</h5></Link>           				
           			</li>
           			<li>
           			<Link to=""><i className="icon-shouye iconfont "></i>
            						<h5>已取消</h5></Link>          				
           			</li>
           			</ul>
            		<i className={this.state.willpay >0 ? "willpay" :' '}>{this.state.willpay ? this.state.willpay: ' '}</i>
            		<i className={this.state.didpay ? "didpay": ' '}>{this.state.didpay >0 ? this.state.didpay : ' '}</i>
            	</div>
            	
            	<div className="owner_third">
	            	<ul>
	            		<li>
	            			<Link to=""><i className="icon-wodeyouhuiquan iconfont "></i>
	            				 我的优惠券
	            				<i className="icon-jiantou iconfont "></i>
	            			</Link>
	            		</li>
	            		<li>
	            			<Link to="owner/collection"><i className="icon-shoucang iconfont "></i>
	            				 我的收藏
	            				<i className="icon-jiantou iconfont "></i>
	      					</Link>          				
	            	
	            		</li>
	            		<li>
	            			<Link to="owner/browse"><i className="icon-liulanjilusel iconfont "></i>
	            				 浏览记录
	            				 <i className="icon-jiantou iconfont "></i>
	            			</Link>          				
	            		</li>
	            	</ul>
            	</div>
            	<div className="owner_fourth">
            		<ul>
	            		<li>
	            			<Link to="owner/address"><i className="icon-lianxiwomendibiao iconfont "></i>
	            				 我的提货人
	            				<i className="icon-jiantou iconfont "></i>
	            			</Link>
	            		</li>
	            		<li>
	            			<Link to=""><i className="icon-wode iconfont "></i>
	            				 账号安全
	            				<i className="icon-jiantou iconfont "></i>
	      					</Link>         
	            		</li>
	            		
	            	</ul>
            	</div>
          		<div className="owner_fifth">
          			<ul>
	            		<li>
	            			<Link to=""><i className="icon-fenlei iconfont "></i>
	            				 航班/火车票信息变更
	            				<i className="icon-jiantou iconfont "></i>
	            			</Link>
	            		</li>
	            		<li>
	            			<Link to=""><i className="icon-lianxiwomen iconfont "></i>
	            				 联系我们
	            				<i className="icon-jiantou iconfont "></i>
	      					</Link>          				
	            	
	            		</li>
	            		<li>
	            			<Link to=""><i className="icon-bangzhuzhongxin iconfont "></i>
	            				 帮助中心
	            				 <i className="icon-jiantou iconfont "></i>
	            			</Link>          				
	            		</li>
	            	</ul>
          		
          		
          		</div>
            </div>
		)

	}
}