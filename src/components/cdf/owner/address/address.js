import React from 'react'
import './address.scss'
import { Link } from 'react-router'
import http from '../../../../utils/httpclient'

export default class AddressComponent extends React.Component {
	state={
		data:[]
	}
	
	componentDidMount(){
		let ss = window.localStorage.getItem('access_token')
		if(!ss){
			alert('请先登陆');
			  this.props.router.push('login')
		}else{
			//发起请求拿到地址记录,渲染下面的界面
			
			
			console.log(666)
		}
	}


	
	
	
	
	
	
	
	
	
	render() {
		return(
			<div id="address" className="animate-route">
				<div className="address_top">
					<Link to="owner"><i className="icon-jiantou iconfont "></i></Link>
					我的提货人
					<span></span>
				</div>
				<div className="address_add">
					<Link to="owner/address/createaddress"><span>+</span>添加提货人信息</Link>
				</div>
				<div className="address_mian">
					<ul>
						<li>
							<h2>提货人:<span>小花花</span></h2>
							<h3><i className="icon-lianxiwomendianhua iconfont"></i>13106728392</h3>
							<h4><i className="icon-daitihuo iconfont"></i>详细地址:<span>广州市海珠区阅江西路222号</span></h4>
						</li>
									<li>
							<h2>提货人:<span>小花花</span></h2>
							<h3><i className="icon-lianxiwomendianhua iconfont"></i>13106728392</h3>
							<h4><i className="icon-daitihuo iconfont"></i>详细地址:<span>广州市海珠区阅江西路222号</span></h4>
						</li>
									<li>
							<h2>提货人:<span>小花花</span></h2>
							<h3><i className="icon-lianxiwomendianhua iconfont"></i>13106728392</h3>
							<h4><i className="icon-daitihuo iconfont"></i>详细地址:<span>广州市海珠区阅江西路222号</span></h4>
						</li>
									<li>
							<h2>提货人:<span>小花花</span></h2>
							<h3><i className="icon-lianxiwomendianhua iconfont"></i>13106728392</h3>
							<h4><i className="icon-daitihuo iconfont"></i>详细地址:<span>广州市海珠区阅江西路222号</span></h4>
						</li>
									<li>
							<h2>提货人:<span>小花花</span></h2>
							<h3><i className="icon-lianxiwomendianhua iconfont"></i>13106728392</h3>
							<h4><i className="icon-daitihuo iconfont"></i>详细地址:<span>广州市海珠区阅江西路222号</span></h4>
						</li>
									<li>
							<h2>提货人:<span>小花花</span></h2>
							<h3><i className="icon-lianxiwomendianhua iconfont"></i>13106728392</h3>
							<h4><i className="icon-daitihuo iconfont"></i>详细地址:<span>广州市海珠区阅江西路222号</span></h4>
						</li>
					
					</ul>
					
					
					
				</div>
				
				
			</div>
		)

	}

}