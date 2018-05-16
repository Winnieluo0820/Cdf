import React from 'react'
import './createaddress.scss'
import { Link } from 'react-router'
import http from '../../../../utils/httpclient'

export default class CreateaddressComponent extends React.Component {
	state = {
		ipNumber: '',
		adderss: '',
		userName: ''
	}

	inputChange(target, event) {
		let content = event.target.value;
		this.setState({
			[target]: content
		})
	}
	componentDidMount(){
		var self = this;
		var log_ipNumber = document.querySelector('#log_ipNumber');
		var form_tips = document.querySelectorAll('#createbox .form_tip');
		var log_ipName = document.querySelector('#log_ipName');
		var log_address = document.querySelector('#log_address');
		var btn_login = document.querySelector('#btn_login')
		var _alert = btn_login.nextElementSibling;

		//电话号码
		log_ipNumber.onchange = function() {
			var text = this.value.trim() * 1;
			var tip = log_ipNumber.nextElementSibling;
			var form_tip = tip.nextElementSibling;

			for(var i = 0; i < form_tips.length; i++) {
				form_tips[i].style.display = 'none'
			}

			if(!/^1[3|4|5|8][0-9]\d{8}$/.test(text)) {
				tip.style.display = 'block'
				form_tip.style.display = 'inline-block'
				form_tip.children[1].innerText = '请输入正确的手机号'
			} else {
				tip.style.display = 'none'
			}
		}

		log_ipName.onchange = function() {
			var text = this.value.trim();
			var reg = /^([\u4e00-\u9fa5]){2,7}$/.test(text);
			var tip = this.nextElementSibling;
			var form_tip = this.nextElementSibling.nextElementSibling;

			for(var i = 0; i < form_tips.length; i++) {
				form_tips[i].style.display = 'none'
			}
			if(text = '') {
				tip.style.display = "block";
				form_tip.style.display = 'inline-block'
				form_tip.children[1].innerText = '提货人名不能为空'
			} else if(!reg) {
				tip.style.display = 'block';
				form_tip.style.display = 'inline-block';
				form_tip.children[1].innerText = '请输入正确的名字';
			} else {
				tip.style.display = 'none';
				form_tip.style.display = 'none'
			}
		}

		//地址
		log_address.onchange = function() {
			let text = this.value.trim();
			var tip = this.nextElementSibling;
			var form_tip = this.nextElementSibling.nextElementSibling;
			for(var i = 0; i < form_tips.length; i++) {
				form_tips[i].style.display = 'none'
			}
			if(text = '') {
				tip.style.display = "block";
				form_tip.style.display = 'inline-block'
				form_tip.children[1].innerText = '地址不能为空'
			} else {
				tip.style.display = 'none';
				form_tip.style.display = 'none'
			}
		}

		btn_login.onclick = function() {
			var _ipNumber = log_ipNumber.value * 1;
			var _adderss = log_address.value;
			var _userName = log_ipName.value

			var tips = document.querySelectorAll('.login_main .tip');

			for(var i = 0; i < tips.length; i++) {
				if(tips[i].style.display != 'none') {
					_alert.style.display = 'inline-block'
					_alert.children[1].innerText = '请完成上述验证'
					return false;
				} else {
					_alert.style.display = 'none'
				}
			}
			console.log(_ipNumber, _adderss, _userName)

//			http.post('addAddress', {
//				userName: _userName,
//				ipNumber: _ipNumber,
//				adderss: _adderss
//			}).then((res) => {
//				console.log(res)
//			})
		}

	}

	render() {
		return(
			<div id="createbox" className="animate-route">
				<div className="createbox_top">
					<Link to="owner/address"><i className="icon-jiantou iconfont "></i></Link>
					新增提货人信息
					<span></span>
				</div>
		
				<div className="createbox_mian">
				
					 <main className="login_main">
                    <div className="form_group">
                        <input type="text" placeholder="前输入提货人的真实姓名"   value={this.state.userName} id="log_ipName" onChange={this.inputChange.bind(this,'userName')}/>
                        <i className="iconfont icon-icon-2 tip"></i>
                        <div className="form_tip"><i></i><span></span></div>
                    </div>
                    <div className="form_group">
                      <input type="text" placeholder="请输入提货人的手机号" value={this.state.ipNumber} id="log_ipNumber" value={this.state.ipNumber} onChange={this.inputChange.bind(this,'ipNumber')}/>
                        <i className="iconfont icon-icon-2 tip"></i>
                        <div className="form_tip"><i></i><span></span></div>
                    </div>
                     <div className="form_group">
                      <input type="text" placeholder="请输入提货人的详细地址" id="log_address"   value={this.state.adderss} onChange={this.inputChange.bind(this,'adderss')} />
                        <i className="iconfont icon-icon-2 tip"></i>
                        <div className="form_tip"><i></i><span></span></div>
                    </div>
                    <div className="form_group">
                        <button id="btn_login">保存提货人信息</button>
                        <div className="alert"><i></i><span></span></div>
                    </div>
                  
                </main>
				</div>
			</div>
		)

	}

}