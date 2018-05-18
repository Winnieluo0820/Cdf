import React from 'react'
import './CollectionComponent.scss'

import { Link } from 'react-router';
import http from '../../../../utils/httpclient'

export default class CollectionComponent extends React.Component {
	state = {
		likedate: []
	}

	componentDidMount() {
		let span_btn = document.querySelector('.span_btn');
		http.post('showLikes').then((res) => {
			if(res.status) {
				this.setState({
					likedate: res.data
				})
			}
		})

		span_btn.onclick = () => {

			var msg = "您真的确定要删除吗？";
			if(confirm(msg) == true) {
				http.post('del_likes').then((res) => {
				if(res.status) {
					this.setState({
						likedate: []
					})
				}
			})
	
			} else {
				return false;
			}

			
		}
	}
	render() {
		return(
			<div id="Collection"  className="animate-route">
					<div className="Collection_top">
					<Link to="owner"><i className="icon-jiantou iconfont "></i></Link>
						我的收藏
				<span className="span_btn" >清空</span>
					</div>
					<div className="Collection_mian">
						<ul>{
							this.state.likedate.map((item)=>{
								return (
									<li key={item.id}>
										<Link to={{pathname: '/goodsDetail', query:{id: item._id}}}>
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