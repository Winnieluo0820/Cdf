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
    toSearch(){
        this.props.router.push('/search');
    }
	render() {
		return(
			<div id="cdf_classfy"  className="animate-route">
                <header className="cdf_home_header" ref="head">
                    <h1>cdf</h1>
                    <div className="search">
                        <i className="iconfont icon-icon-"></i>
                        <input type="text" placeholder="分类 品牌 系列 商品" onFocus={this.toSearch.bind(this)}/>
                    </div>
                </header>
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