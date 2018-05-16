import React from 'react'
import './browse.scss'

import { Link } from 'react-router';
import http from '../../../../utils/httpclient'
export default class BrowseComponent extends React.Component {
	state = {
		browse: []
	}

	componentDidMount() {
		http.post('watch_history').then((res) => {
			console.log(res.data)
			if(res.status) {
				this.setState({
					browse: res.data
				})
			}
		})
	}

	createall(){
		console.log(666)
	}






render() {
		return(
			<div id="browse" className=" animate-route">
					<div className="browse_top">
					<Link to="owner"><i className="icon-jiantou iconfont "></i></Link>
						浏览记录
					<span onClick={this.createall}>清空</span>
					</div>
					<div className="browse_mian">
						<ul>
							{
							this.state.browse.map((item)=>{
								return (
									<li key={item.id}>
										<Link to="">
											<img src={item.pic}/>
											<p>{item.name}</p>
											<h3>免税价:<span>￥{item.discountPrice}</span></h3>
											<h4>市场价:<span>￥{item.salesPrice}</span></h4>
										</Link>
								</li>
								)
							})
							
							
						}
						</ul>
					
					</div>
					
					
					
				</div>
		)
	}
}