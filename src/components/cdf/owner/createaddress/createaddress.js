
import React from 'react'
import './createaddress.scss'
import { Link } from 'react-router'
import http from '../../../../utils/httpclient'

import jQuery from 'jquery'

import areaData from '../../../../utils/area.js'

export default class CreateaddressComponent extends React.Component {
    state = {
        ipNumber: '',
        adderss: '',
        userName: '',
        data: areaData.allAreaInfo,
        provinceIdx:18,
        cityIdx:0,
        areaIdx:0
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
            var changeDefaultText = document.querySelector('#createbox .defaultsAddress .left span').innerText;
            _adderss = changeDefaultText + _adderss;

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

        //三级联动
        jQuery(function($){
            var $overlay = $('#createbox .overlay');
            var $selectDefault = $('#createbox .selectDefault');
            var $confirmArea = $('#createbox .confirmArea')
            var $confirmAreaBtn = $confirmArea.find('button')
            var $changeDefaultBtn = $('#changeDefault');
            var $changeDefaultText  = $changeDefaultBtn.parent().parent().find('span');
            var $provinceUl = $selectDefault.find('.province');
            var $cityUl = $selectDefault.find('.city');
            var $areaUl = $selectDefault.find('.areas');

            $changeDefaultBtn.on('click',function(){
                $overlay.fadeIn()
                $selectDefault.css('display', 'flex');
                $confirmArea.css('display','block'); 
                
                var provinceUlscrollBig = ($provinceUl.height() / ($provinceUl.find('li').eq(0).outerHeight() * $provinceUl.find('li').length)) * $provinceUl.get(0).scrollHeight;
                var cityUlscrollBig = ($cityUl.height() / ($cityUl.find('li').eq(0).outerHeight() * $cityUl.find('li').length)) * $cityUl.get(0).scrollHeight;
                var areaUlscrollBig = ($areaUl.height() / ($areaUl.find('li').eq(0).outerHeight() * $areaUl.find('li').length)) * $areaUl.get(0).scrollHeight;

                var targetProvince = (provinceUlscrollBig / 3) * (self.state.provinceIdx);
                $provinceUl.get(0).scrollTo(0,targetProvince)

                var targetCity = (cityUlscrollBig / 3) * (self.state.cityIdx);
                $cityUl.get(0).scrollTo(0,targetCity)

                var targetArea = (areaUlscrollBig / 3) * (self.state.areaIdx);
                $areaUl.get(0).scrollTo(0,targetArea)

            })
                
            $provinceUl.on('click', 'li', function(event){
                if($(this).text() == '---'){
                    return false;
                }
                $(this).addClass('active').siblings().removeClass('active')
                
                var targetIdx;
                $(this).parent().find('li').map(function(idx, item){
                    if($(item).hasClass('active')){
                        targetIdx = idx - 1;
                    }
                })
                self.setState({
                    provinceIdx: targetIdx ,
                    cityIdx : 0 ,
                    areaIdx : 0
                })

                $cityUl.get(0).scrollTo(0,0);
                $areaUl.get(0).scrollTo(0,0);
            })
            $cityUl.on('click', 'li', function(event){
                if($(this).text() == '---'){
                    return false;
                }
                $(this).addClass('active').siblings().removeClass('active')

                var targetIdx;
                $(this).parent().find('li').map(function(idx, item){
                    if($(item).hasClass('active')){
                        targetIdx = idx - 1;
                    }
                })
                self.setState({
                    cityIdx : targetIdx ,
                    areaIdx : 0
                })

                $areaUl.get(0).scrollTo(0,0);
            })
            $areaUl.on('click', 'li', function(event){
                if($(this).text() == '---'){
                    return false;
                }
                $(this).addClass('active').siblings().removeClass('active')

                var targetIdx;
                $(this).parent().find('li').map(function(idx, item){
                    if($(item).hasClass('active')){
                        targetIdx = idx - 1;
                    }
                })
                self.setState({
                    areaIdx : targetIdx
                })
            })

            $confirmAreaBtn.on('click',function(){
                var text = self.state.data[self.state.provinceIdx].name + self.state.data[self.state.provinceIdx].city[self.state.cityIdx].name + self.state.data[self.state.provinceIdx].city[self.state.cityIdx].area[self.state.areaIdx];
                $overlay.fadeOut()
                $selectDefault.css('display', 'none');
                $confirmArea.css('display','none');
                $changeDefaultText.text(text);
            })
        })


    }
    render() {
        var self = this;
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
                        <div className="defaultsAddress">
                            <div className="left">地址：&nbsp;<span>广东省广州市荔湾区</span></div>
                            <div className="right">
                                <button id="changeDefault">更改</button>
                            </div>
                        </div>           
                        <div className="form_group">
                          <input type="text" placeholder="请输入提货人的详细地址" id="log_address" value={this.state.adderss} onChange={this.inputChange.bind(this,'adderss')} />
                            <i className="iconfont icon-icon-2 tip"></i>
                            <div className="form_tip"><i></i><span></span></div>
                        </div>
                        <div className="form_group">
                            <button id="btn_login">保存提货人信息</button>
                            <div className="alert"><i></i><span></span></div>
                        </div>  
                    </main>
                </div>
                <div className="overlay"></div>
                <div className="selectDefault">
                    <ul className="province select">
                        <li>---</li>
                        {
                            this.state.data.map(function(item,idx){
                                if(idx == self.state.provinceIdx){
                                    return (
                                        <li className="active" key={item + idx}>{item.name}</li>
                                    )
                                }
                                return (
                                    <li key={item + idx}>{item.name}</li>
                                )
                            })
                        }
                        <li>---</li>
                    </ul>
                    <ul className="city select">
                        <li>---</li>
                        {
                            this.state.data[this.state.provinceIdx].city.map(function(item,idx){
                                if(idx == self.state.cityIdx){
                                    return (
                                        <li className="active" key={item + idx}>{item.name}</li>
                                    )
                                }
                                return (
                                    <li key={item + idx}>{item.name}</li>
                                )
                            })
                        }
                        <li>---</li>            
                    </ul>
                    <ul className="areas select">
                        <li>---</li>
                        {
                            this.state.data[this.state.provinceIdx].city[this.state.cityIdx].area.map(function(item,idx){
                                if(idx == self.state.areaIdx){
                                    return (
                                        <li className="active" key={item + idx}>{item}</li>
                                    )
                                }
                                return (
                                    <li key={item + idx}>{item}</li>
                                )
                            })
                        }
                        <li>---</li>
                    </ul>
                </div>
                <div className="confirmArea">
                    <button>确定</button>
                </div>
            </div>
        )

    }

}
