import React from 'react'
import './rank.scss'
import {Link} from 'react-router'
import BestComponent from './best/best.js'
export default class RankComponent extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            data:[],
            name:'best'
        }
    }
    toBack(){
        window.history.back();
    }
    getComponent(){
        let _self=this;
        let _state=this.state;
        switch(_state.name){
            case 'best':
                return <BestComponent />
        }
    }
    render(){
        return (
            <div id="cdf_rank">
                <div className="cdf_rank_header">
                    <i className="iconfont icon-jiantou2" onClick={this.toBack.bind(this)}></i>
                    <span>排行榜</span>
                    <i className="iconfont icon-fangdajing"></i>
                </div>
                <div className="cont">
                    <div className="img">
                        <img src="http://pic.cdfgsanya.com/upload/2016/8/2/20160802080803230.jpg" alt=""/>
                    </div>
                    <div className="menu">
                        <ul>
                            <li className="active">BEST</li>
                            <li>热门搜索</li>
                            <li>热门品牌</li>
                        </ul>
                    </div>
                    <div className="div_goodslist">
                        {this.getComponent()}
                    </div>
                </div>
            </div>
        )
    }
}