import React from 'react'

import './owner.scss'
import { Link } from 'react-router';
export default class OwnerComponent extends React.Component {

	render() {
		return(
			<div id="cdf_owner" className="animate2-route">
            	<div className="owner_top">
            		<Link to="login"><i className="icon-wode iconfont "></i>
            		<p>注册/登录</p>
            		</Link>
            		<img src="http://pic.cdfgsanya.com/upload/2016/8/2/20160802095348455.jpg"/>
            	</div>
            	
            	<div className="owner_second">
            		<h4> <i className="iconfont icon-wodedingdan1"></i> 全部订单
            			<Link to="">查看全部订单<i className="icon-jiantou iconfont "></i></Link>
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