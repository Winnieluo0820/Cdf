import React from 'react'
import './search.scss'

export default class SearchComponent extends React.Component{
    toBack(){
        window.history.back();
    }
    render(){
        return (
            <div id="cdf_search" className="animate-route">
                <div className="cdf_search_head">
                    <i className="iconfont icon-jiantou2" onClick={this.toBack.bind(this)}></i>
                    <input type="text" placeholder="分类 品牌 系列 商品"/>
                    <span>搜索</span>
                </div>
                <div className="cdf_search_main">
                    <p>热门搜索</p>
                    <ul>
                        <li>香水</li>
                        <li>彩妆</li>
                        <li>护肤</li>
                        <li>口红</li>
                        <li>腕表</li>
                        <li>首饰</li>
                        <li>箱包</li>
                    </ul>
                </div>
            </div>
        )
    }
}