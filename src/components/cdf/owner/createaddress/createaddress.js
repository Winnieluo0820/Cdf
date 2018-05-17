import React from 'react'
import './createaddress.scss'
import { Link } from 'react-router'
import http from '../../../../utils/httpclient'
import SelectArea from '../../../select_area/select_area.jsx'
import jQuery from 'jquery'

export default class CreateaddressComponent extends React.Component {
	state = {
		ipNumber: '',
		adderss: '',
		userName: '',
		address_1:''
	}

	inputChange(target, event) {
		let content = event.target.value;
		this.setState({
			[target]: content
		})
	}
	componentDidMount() {
		var self = this;
		var log_ipNumber = document.querySelector('#log_ipNumber');
		var form_tips = document.querySelectorAll('#createbox .form_tip');
		var log_ipName = document.querySelector('#log_ipName');
		var log_address = document.querySelector('#log_address');
		var btn_login = document.querySelector('#btn_login')
		var _alert = btn_login.nextElementSibling;
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
			var _userName = log_ipName.value;
			console.log(1+_adderss)



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




			http.post('addAddress', {
				userName: _userName,
				ipNumber: _ipNumber,
				address: _adderss
			}).then((res) => {
				if(res.status){
					self.props.router.push('owner/address')
				}
			
			})
		}
		jQuery(function($){
			$('.select').on('click', function(){
                $('.overlay').css('display','block');
                $('.select_city').css('display','block').animate({bottom:0},500);
            })
            $('.cancel').on('click',function(){
            	$('.select_city').animate({bottom:'-31px'},function(){
                    $('.overlay').css('display','none')
                    $('.select_city').css('display','none')
                })
            })
            // $('.confirm').on('click',function(){
            // 	let province=$('.ul-area').eq(0).find('.selected').text();
            // 	let city=$('.ul-area').eq(1).find('.selected').text();
            // 	let county=$('.ul-area').eq(2).find('.selected').text();
            // 	address_1=province+city+county;
            // })
		})


	}
	render() {
		return(
			<div id="createbox" className="animate-route">
				<div className="createbox_top">
					<Link to="owner/address"><i className="icon-jiantou iconfont "></i></Link>
					新增提货人信息
					<span></span>
				</div>
				<div className="overlay"></div>
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
                      <input type="text" placeholder="所在地区" id="log_address"   value={this.state.adderss_1} onChange={this.inputChange.bind(this,'adderss_1')} />
                        <span className="select"><i className="iconfont icon-jiantou1"></i></span>
                        <div className="form_tip"><i></i><span></span></div>
                    </div>
                    <div className="form_group">
                      <input type="text" placeholder="请输入提货人的详细地址" id="address"   value={this.state.adderss} onChange={this.inputChange.bind(this,'adderss')} />
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