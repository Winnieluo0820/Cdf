import React from 'react'
import './browse.scss'

import { Link } from 'react-router';

export default class BrowseComponent extends React.Component {
	render() {
		return(
			<div id="browse" className=" animate-route">
					<div className="browse_top">
					<Link to="owner"><i className="icon-jiantou iconfont "></i></Link>
						浏览记录
					<span>清空</span>
					</div>
					<div className="browse_mian">
						<ul>
							<li>
								<Link to="">
									<img src="http://pic.cdfgsanya.com/upload/1/991142/610/237571/348772_1_pic270_9552.jpg"/>
									<p>倩碧水嫩保湿润肤套装</p>
									<h3>免税价：  <span>￥660.00</span></h3>
									<h4>市场价：  <span>￥698.00</span></h4>
								</Link>
							</li>
									<li>
								<Link to="">
									<img src="http://pic.cdfgsanya.com/upload/1/991142/610/237571/348772_1_pic270_9552.jpg"/>
									<p>倩碧水嫩保湿润肤套装</p>
									<h3>免税价：  <span>￥660.00</span></h3>
									<h4>市场价：  <span>￥698.00</span></h4>
								</Link>
							</li>	<li>
								<Link to="">
									<img src="http://pic.cdfgsanya.com/upload/1/991142/610/237571/348772_1_pic270_9552.jpg"/>
									<p>倩碧水嫩保湿润肤套装</p>
									<h3>免税价：  <span>￥660.00</span></h3>
									<h4>市场价：  <span>￥698.00</span></h4>
								</Link>
							</li>	
						</ul>
					
					</div>
					
					
					
				</div>
		)
	}
}