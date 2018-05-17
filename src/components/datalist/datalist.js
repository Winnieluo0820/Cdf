import React from 'react'
import { Link } from 'react-router';

import './datalist.scss'

import http from '../../utils/httpclient'

export default class Datalist extends React.Component {
	state = {
		data: [],
		normal: [],
		types: '',
		num: 0
	}
	componentDidMount() {
		let type = this.props.location.query.type;
		let query_product_up = document.querySelector('#query_product_up');
		let query_product_down = document.querySelector('#query_product_down');
		let btn_action = document.querySelector('#btn_action');
		this.setState({
			types: type
		})

		http.post('query_product', {
			type
		}).then((res) => {
			this.setState({
				data: res.data,
				normal: res.data
			})
		})

		query_product_up.onclick = () => {
			this.setState({
				num: 1
			})
			http.post('query_product_priceDesc', {
				type
			}).then((res) => {
				this.setState({
					data: res.data,

				})
			})
		}

		query_product_down.onclick = () => {
			this.setState({
				num: 2
			})
			http.post('query_product_priceAsc', {
				type
			}).then((res) => {
				this.setState({
					data: res.data,

				})
			})
		}

		btn_action.onclick = () => {this.setState({
				num: 0,
				data: this.state.normal
			})
		}

	}

	//跳转
	

	goback() {
		history.back();
	}

	render() {
		return(
			<div className="datalist animate-route">
                <div className="head">
                    <div className="iconfont icon-jiantou2 goback" onClick={this.goback.bind(this)}></div>
                    <div className="datalist_title">
                        <span>{this.state.types}</span>
                    </div>
                    <i className="iconfont icon-icon-"></i>
                </div>
                <div className="option">
                    <div id="btn_action"  className={this.state.num==0 ? 'btn_action':null}>销量</div>
                    <div  id="query_product_up" className={this.state.num==1 ? 'btn_action':null}>价格<span><i className="iconfont icon-sanjiaoxing-up"></i></span></div>
                    <div id="query_product_down" className={this.state.num==2 ? 'btn_action':null}>价格<span><i className="iconfont icon-sanjiaoxing-down"></i></span></div>
                    <div>筛选<i className="iconfont icon-shaixuan shaixuan"></i></div>
                </div>
                <div className="goodslist">
                    <ul >
                        {
                            this.state.data ? this.state.data.map((item) => {
                                    return (
                                        <li key={item._id} data-id={item._id}>
                                            <Link to={{pathname: '/goodsDetail', query:{id: item._id}}}>
                                                <img src={item.pic} />
                                                <p className="goods_name">{item.name}</p>
                                                <p className="goods_sale">
                                                    免税价:
                                                    <span>￥{item.discountPrice}</span>
                                                </p>
                                                <p className="goods_price">
                                                    <del>
                                                        市场价:
                                                        <span>￥{item.salesPrice}</span>
                                                    </del>
                                                </p>
                                            </Link>
                                        </li>
                                 )
                            }) : null
                        }
                    </ul>
                </div>
            </div>
		)
	}
}