import React from 'react'
import {Link,} from 'react-router'

import './login.scss'
import http from '../../utils/httpclient.js'
// import jQuery from 'jquery'

export default class LoginComponent extends React.Component{
    state = {
        ipNumber: '',
        password:''
    }

    inputChange(target,event){
        let content = event.target.value;
        this.setState({[target]: content})
    }

    componentDidMount(){
        var self = this;
        var log_ipNumber = document.querySelector('#log_ipNumber')
        var log_password = document.querySelector('#log_password')
        var form_tips = document.querySelectorAll('#cdf_login .form_tip')
        var btn_login = document.querySelector('#btn_login')
        var _alert = btn_login.nextElementSibling;

        log_ipNumber.onchange = function(){
            var text = this.value.trim()*1;
            var tip = log_ipNumber.nextElementSibling;
            var form_tip = tip.nextElementSibling;
            
            for(var i=0;i<form_tips.length;i++){
                form_tips[i].style.display = 'none'
            }

            if(!/^1[3|4|5|8][0-9]\d{8}$/.test(text)){
                tip.style.display = 'block'
                form_tip.style.display = 'inline-block'
                form_tip.children[1].innerText = '请输入正确的手机号'
            } else {
                tip.style.display = 'none'
            }
        }

        log_password.onchange = function(){
            var text = this.value.trim();
            var res = /^[a-z0-9_-]{6,18}$/.test(text);
            var tip = this.nextElementSibling;
            var form_tip = this.nextElementSibling.nextElementSibling;

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

        btn_login.onclick = function(){
            var _ipNumber = log_ipNumber.value*1;
            var _password = log_password.value;
            var tips = document.querySelectorAll('.login_main .tip');
            
            for(var i=0; i<tips.length; i++){
                if(tips[i].style.display != 'none'){
                    _alert.style.display = 'inline-block'
                    _alert.children[1].innerText = '请完成上述验证'
                    return false;
                }else{
                    _alert.style.display = 'none'
                }
            }

            http.post('login',{username:_ipNumber,password:_password}).then((res) => {
                if(res.status){
                    window.localStorage.setItem('access_token',res.data)
                    self.props.router.push('/')
                }else{
                    _alert.style.display = 'inline-block'
                    _alert.children[1].innerText = '用户名或密码错误'
                }
            })
        }

    }

    
    render(){
        return(
            <div id="cdf_login" className="animate-route">
                <header className="login_header">
                    <Link to="owner" className="login_return_back">
                        <i className="iconfont icon-jiantou2"></i>
                    </Link>
                    <h1>登录</h1>
                </header>
                <main className="login_main">
                    <div className="form_group">
                        <input type="text" placeholder="请输入手机号" id="log_ipNumber" value={this.state.ipNumber} onChange={this.inputChange.bind(this,'ipNumber')}/>
                        <i className="iconfont icon-icon-2 tip"></i>
                        <div className="form_tip"><i></i><span></span></div>
                    </div>
                    <div className="form_group">
                        <input type="password" placeholder="请输入密码" id="log_password" value={this.state.password} onChange={this.inputChange.bind(this,'password')}/>
                        <i className="iconfont icon-icon-2 tip"></i>
                        <div className="form_tip"><i></i><span></span></div>
                    </div>
                    <div className="form_group">
                        <button id="btn_login">登录</button>
                        <div className="alert"><i></i><span></span></div>
                    </div>
                    <div className="form_group">
                        <span>没有账号？</span><Link to="register">请注册</Link>
                    </div>
                </main>
            </div>
        )
    }

}