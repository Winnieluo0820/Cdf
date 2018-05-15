import React from 'react'
import {Link} from 'react-router'

import './register.scss'
import http from '../../utils/httpclient.js'

export default class RegisterComponent extends React.Component{
    state = {
        ipNumber: '',
        vCode:'',
        password:'',
        passwordSame:'',
        checkbox:'true'

    }

    inputChange(target,event){
        let content = event.target.value;
        this.setState({[target]: content})
    }
    
    componentDidMount(){
        var self = this;

        var ipNumber = document.querySelector('#ipNumber');
        var vCode = document.querySelector('#vCode');
        var VCode = document.querySelector('#VCode');
        var password = document.querySelector('#password');
        var passwordSame = document.querySelector('#passwordSame');
        var item_accept = document.querySelector('#item_accept');
        var btn_register = document.querySelector('#btn_register');
        var form_tips = document.querySelectorAll('.register_main .form_tip');
        var _alert = btn_register.nextElementSibling;


        ipNumber.onchange = function(e){
            var text = this.value.trim()*1;
            var res = /^1[3|4|5|8][0-9]\d{8}$/.test(text);
            var tip = ipNumber.nextElementSibling;
            var form_tip = ipNumber.nextElementSibling.nextElementSibling;
            
            for(var i=0;i<form_tips.length;i++){
                form_tips[i].style.display = 'none'
            }

            if(text == ''){
                tip.style.display = 'block';
                form_tip.style.display = 'inline-block'
                form_tip.children[1].innerText = '手机号不能为空'

            }else if(!res){
                tip.style.display = 'block';
                form_tip.style.display = 'inline-block'
                form_tip.children[1].innerText = '请输入正确的手机号码' 
            } else {
                tip.style.display = 'none'
                form_tip.style.display = 'none'
            }
            
        }

        randomNumber(1000,9999)
        function randomNumber(Min,Max){
            var number = parseInt(Math.random()*(Max-Min) + 1) + Min
            vCode.innerText = number;
        }
        vCode.onclick = function(){
            randomNumber(1000,9999)
        }
        
        VCode.onchange = function(){
            var text = this.value*1;
            var code = vCode.innerText*1;
            var tip = VCode.nextElementSibling;
            var form_tip = VCode.nextElementSibling.nextElementSibling;

            for(var i=0;i<form_tips.length;i++){
                form_tips[i].style.display = 'none'
            }

            if( text != code){
                tip.style.display = 'block'
                form_tip.style.display = 'inline-block'
                form_tip.children[1].innerText = '验证码不正确'
                randomNumber(1000,9999)
            } else {
                tip.style.display = 'none'
                form_tip.style.display = 'none'
            }
        }

        password.onchange = function(){
            var text = password.value.trim();
            var res = /^[a-z0-9_-]{6,18}$/.test(text);
            var tip = password.nextElementSibling;
            var form_tip = password.nextElementSibling.nextElementSibling;

            for(var i=0;i<form_tips.length;i++){
                form_tips[i].style.display = 'none'
            }

            if(text == ''){
                tip.style.display = 'block';
                form_tip.style.display = 'inline-block'
                form_tip.children[1].innerText = '密码不能为空'

            }else if(!res){
                tip.style.display = 'block';
                form_tip.style.display = 'inline-block'
                form_tip.children[1].innerText = '密码不符合要求' 
            } else {
                tip.style.display = 'none'
                form_tip.style.display = 'none'
            }

        }

        passwordSame.onchange = function(){
            var psd = password.value;
            var psdSame = this.value;
            var tip = passwordSame.nextElementSibling;
            var form_tip = passwordSame.nextElementSibling.nextElementSibling;  

            for(var i=0;i<form_tips.length;i++){
                form_tips[i].style.display = 'none'
            }

            if(psd == psdSame){
                tip.style.display = 'none'
                form_tip.style.display = 'none'
            } else {
                tip.style.display = 'block'
                form_tip.style.display = 'inline-block'
                form_tip.children[1].innerText = '密码确认不正确'
                this.value = ''
                self.setState({passwordSame:''})
            }

        }

        btn_register.onclick = function(){
            var _ipNumber = self.state.ipNumber*1;
            var _password = self.state.password*1;
            var tips = document.querySelectorAll('.register_main .tip');
            
            for(var i=0; i<tips.length; i++){
                if(tips[i].style.display != 'none'){
                    _alert.style.display = 'inline-block'
                    _alert.children[1].innerText = '请完成上述验证'
                    return false;
                }else{
                    _alert.style.display = 'none'
                }
            }
            
            http.post('register',{username:_ipNumber,password:_password}).then((res) => {
                if(res.status){
                    _alert.style.display = 'inline-block'
                    _alert.children[1].innerText = '注册成功！跳转登陆界面...'
                    // setTimeOut(function(){},1000)
                } else {
                    _alert.style.display = 'inline-block'
                    _alert.children[1].innerText = '注册失败！用户名已存在'
                }
            })
            
            
        }


    }

    render(){
        return(
            <div id="cdf_register" className="animate-route">
                <header  className="register_header">
                    <Link to="login" className="register_return_back">
                        <i className="iconfont icon-jiantou1"></i>
                    </Link>
                    <h1>注册</h1>
                </header>
                <main className="register_main">
                    <div className="form_group">
                        <input type="text" placeholder="请输入手机号" id="ipNumber" value={this.state.ipNumber} onChange={this.inputChange.bind(this,'ipNumber')}/>
                        <i className="iconfont icon-icon-2 tip"></i>
                        <div className="form_tip"><i></i><span></span></div>
                        <button className="vCode" id="vCode">验证码</button>
                    </div>
                    <div className="form_group">
                        <input type="text" placeholder="请输入验证码" id="VCode" value={this.state.vCode} onChange={this.inputChange.bind(this,'vCode')}/>
                        <i className="iconfont icon-icon-2 tip"></i>
                        <div className="form_tip"><i></i><span></span></div>
                    </div>
                    <div className="form_group">
                        <input type="password" placeholder="请输入密码（6-16位英文、数字或符号）" id="password" value={this.state.password} onChange={this.inputChange.bind(this,'password')}/>
                        <i className="iconfont icon-icon-2 tip"></i>
                        <div className="form_tip"><i></i><span></span></div>
                    </div>
                    <div className="form_group">
                        <input type="password" placeholder="请再次输入密码" id="passwordSame" value={this.state.passwordSame} onChange={this.inputChange.bind(this,'passwordSame')}/>
                        <i className="iconfont icon-icon-2 tip"></i>
                        <div className="form_tip"><i></i><span></span></div>
                    </div>
                    <div className="form_group">
                        <input type="checkbox" id="item_accept" value="true" checked onChange={this.inputChange.bind(this,'checkbox')} />
                        <Link to="">《三亚国际免税城官方商城条款》</Link>
                    </div>
                    <div className="form_group">
                        <button id="btn_register">注册</button>
                        <div className="alert"><i></i><span></span></div>
                    </div>
                    <div className="form_group">
                        <span>已有账号？</span><Link to="login">请登陆</Link>
                    </div>
                </main>
            </div>
        )
    }

}