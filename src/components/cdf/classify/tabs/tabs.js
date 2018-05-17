import React from 'react'
import { Link } from 'react-router';

class Tabs extends React.Component {
	state = {
		data: []
	}

	//获取父节点的参数
	changeTabs(datas = []) {
		//console.log(datas.data);
		let datatabs = [];
		datas.data.map((item) => {
			datatabs.push(item)
		})
		this.setState({
			data: datatabs
		})
	}

	getkeys(item = {}) {
		return Object.keys(item);
	}

	render() {
		return(
			<div className="classify_right">
				{
					this.state.data.map((item)=>{
						return (
							<div className="classify_box" key={item.type}> 
								<h2>{item.type}<i className="icon-jiantou iconfont "></i></h2>
								<ul>
									{
									item.other_type.map((key)=>{
										return (
											<li key={key.pic}>
												<Link to={ `/datalist?type=` + item.type}  id={item.type}>
													<img src={key.pic}/>
													<p>{key.types_name}</p>
												</Link>
											
											</li>
										)
									})
												
									}
								</ul>
							</div>
						)		
					})
				}
			</div>
		)
	}
}
export default Tabs;