import React from 'react'
import {Link} from 'react-router'

import './shopcar.scss'
import http from '../../../utils/httpclient.js'
import jQuery from 'jquery'

export default class ShopcarComponent extends React.Component{
    state = {
        checkbox:{'all':true},
        goodsData:[]
    }

    componentDidMount(){
        let self = this;        
        jQuery(function($){
            http.post('showShopcart').then((res) => {
                self.setState({goodsData: res.data})

                let changeObj = {};
                for(let i=0; i<self.state.goodsData.length;i++){
                    changeObj[self.state.goodsData[i]._id] = true;
                    self.setState({checkbox:changeObj})           
                }

                if(self.state.goodsData.length > 0){
                    $('#cdf_shopcar .shopcar_main .goodCars').css('display','block')
                    $('#cdf_shopcar .shopcar_footer').css('display','flex')
                } else {
                    $('#cdf_shopcar .shopcar_main .empty').css('display','block')
                } 
            })
        })

 
    }



    changeCheckbox(id,event){
        let res = !this.state.checkbox[id];
        let changeObj = this.state.checkbox;
        changeObj[id] = res;
        this.setState({checkbox:changeObj})
    }

    render(){
        return(
            <div id="cdf_shopcar" className="animate-route">
                <div className="shopcar_header"><span className="base"></span><span className="content">我的购物袋</span></div>
                <div className="shopcar_main">
                    <div className="empty">
                        <p>温馨提示 :三亚机场出发，至少于起飞前6小时完成购买；海口美兰、琼海博鳌机场、火车站出发，至少离岛前一天内完成购买，如有疑问，请致电400-699-6956。</p>
                        <div className="img_shop"></div>
                        <div className="text">您的购物袋内还没有任何商品 ……</div>
                        <Link to="">去逛逛</Link>
                    </div>
                    <div className="goodCars">
                        <ul className="goods">
                            {
                                this.state.goodsData.map((item, idx) => {
                                    return (
                                        <li id={item._id} key={item+idx}>
                                            <div className="left">
                                                <input type="checkbox" checked={this.state.checkbox[item._id]} onChange={this.changeCheckbox.bind(this,item._id)}/>
                                            </div>
                                            <div className="center">
                                                <img src={item.pic}/>
                                                <h1>{item.name}</h1>
                                                <h3>免税价：<span>￥{item.discountPrice}</span></h3>
                                                <del><span>市场价：￥{item.salesPrice}</span></del>
                                                <div className="changeQty">
                                                    <button>-</button><span>{item.qty}</span><button>+</button>
                                                </div>
                                            </div>
                                            <div className="right">
                                                <button>删除</button>
                                            </div>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
                <div className="shopcar_footer">
                    <div className="left">
                        <input type="checkbox" checked={this.state.checkbox.all} onChange={this.changeCheckbox.bind(this,'all')}/>
                        <span>全选</span>
                    </div>
                    <div className="center">
                        <p>总价￥<span className="totalPrice"></span>-优惠￥<span className="discountPrice"></span></p>
                        <p>应付金额：￥<span className="resultPrice"></span></p>
                    </div>
                    <div className="right">
                        <Link to="">去结算(<span>0</span>)</Link>
                    </div>
                </div>
            </div>
        )

    }
}