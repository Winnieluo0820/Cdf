import React from 'react'
import { Link } from 'react-router';
import './classify.scss'
import http from '../../../utils/httpclient'
import Tabs from "./tabs/tabs";

export default class ClassfyComponent extends React.Component {
	state = {
		title: [],
		miansname: [],
		box: 0
	}

	componentDidMount() {
		http.post('tabs').then((res) => {
			let newtitle = [];
			let newmain = [];
			res.data.map((item) => {
				newmain.push(item);
				newtitle.push(item.title);
			})
			//改变左边的文本
			//传参到子组件
			this.setState({
				title: newtitle,
				miansname: newmain
			})

			this.refs.c1.changeTabs(this.state.miansname[0])
		})
	}

	//点击变换
	changes(e, n) {

		this.refs.c1.changeTabs(this.state.miansname[n])
		this.setState({
			indexs: n,
			box: n
		})
	}

	render() {
		return(
			<div id="cdf_classfy"  className="animate-route">
                <div className="classify_top">
                    <img src="http://www.cdfgsanya.com/mobile/resources/images/logo@3x.4b0359e3.png"/>
                    <div className="classify_find">
                    	<i className="icon-fangdajing iconfont"></i>
                    	<Link to=""><span>分类</span><span>品牌</span><span>系列</span><span>商品</span></Link>
                    </div>
                </div>
                
                
                 <div className="classify_left">
                 	<ul>
                 		{
                 			this.state.title.map((key,index)=>{
                 				return <li key={index}><Link to="" onClick={(e) => this.changes(e, index)} key={index}  className={index == this.state.box?"active":null}><span>{key}</span></Link></li>
                 			})
                 		}
                 	</ul>
                 </div>
                 
                 
            	<Tabs  ref="c1" miansname={this.state.miansname}/>	
            </div>
		)

	}
}