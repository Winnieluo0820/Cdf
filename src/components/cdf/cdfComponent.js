import React from 'react'
import {Link} from 'react-router'

import './cdf.scss'
import jQuery from 'jquery'

export default class CdfComponent extends React.Component{
    componentDidMount(){
        jQuery(function($){
            var $cdf_footer = $('#cdf_footer');
            $cdf_footer.on('click','li',function(){
                $(this).addClass('active');
                $(this).siblings().removeClass('active');
            })
        })
    }
    render(){
        return (
            <div id="cdf" className="animate-route">
                <div id="cdf_main">
                    {this.props.children}
                </div>
                <footer id="cdf_footer">
                    <ul>   
                        <li className="active"><Link to="/"><i className="iconfont icon-weibiaoti1"></i><span>首页</span></Link></li>
                        <li><Link to="brand"><i className="iconfont icon-pinpai"></i><span>品牌</span></Link></li>
                        <li><Link to="classify"><i className="iconfont icon-fenlei"></i><span>分类</span></Link></li>
                        <li><Link to="shopcar"><i className="iconfont icon-gouwudai"></i><span>购物袋</span></Link></li>
                        <li><Link to="owner"><i className="iconfont icon-wode"></i><span>我的中免</span></Link></li>
                    </ul>
                </footer>                  
            </div>
        )
    }
} 

