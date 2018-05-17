import React from 'react'
import { Link } from 'react-router';

import './datalist.scss'

import http from '../../utils/httpclient'

export default class Datalist extends React.Component{
    state = {
        data:[]
    }
    componentDidMount(){
        let type = this.props.location.query.type;
        console.log(type);
        http.post('list',{type}).then((res) => {
            this.setState({
                data: res.data
            })
        })
    }

    //跳转
    goods(e){
        if(e.target.parentNode.parentNode.tagName.toLowerCase() == 'li'){
            
        }
    }

    goback(){
        history.back();
    }

    render(){
        return (
            <div className="datalist animate-route">
                <div className="head">
                    <button className="iconfont icon-jiantou2 goback" onClick={this.goback.bind(this)}></button>
                    <div className="datalist_title">
                        <span>美妆 > </span>
                        <span>护肤 > </span>
                        <span>套装</span>
                    </div>
                    <i className="iconfont icon-icon-"></i>
                </div>
                <div className="option">
                    <button className="btn_action">销量</button>
                    <button>价格<span><i className="iconfont icon-sanjiaoxing-up"></i><i className="iconfont icon-sanjiaoxing-down"></i></span></button>
                    <button>显示有货</button>
                    <button>筛选<i className="iconfont icon-shaixuan shaixuan"></i></button>
                </div>
                <div className="goodslist">
                    <ul onClick={this.goods.bind(this)}>
                        {
                            this.state.data ? this.state.data.map((item) => {
                                    return (
                                        <li key={item._id} data-id={item._id}>
                                            <Link to={{pathname: '/details', query:{id: item._id}}}>
                                                <img src={item.images} />
                                                <p className="goods_name">{item.name}</p>
                                                <p className="goods_sale">
                                                    免税价:
                                                    <span>￥{item.sale}</span>
                                                </p>
                                                <p className="goods_price">
                                                    <del>
                                                        市场价:
                                                        <span>￥{item.price}</span>
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
