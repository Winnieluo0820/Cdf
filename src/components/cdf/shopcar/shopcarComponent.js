import React from 'react'
import {Link} from 'react-router'

import './shopcar.scss'

export default class ShopcarComponent extends React.Component{
    state = {
        checkbox:{'all':true},
        goodsData:[
            {
                "_id" : "5af668f89b28cc116acb2565",
                "id" : 1,
                "name" : "圣罗兰新妍活青春精华液",
                "brandName" : "YSL 圣罗兰",
                "type" : "护肤",
                "salesPrice" : 905.0,
                "discountPrice" : 769.5,
                "pic" : "http://pic.cdfgsanya.com/upload/601/603/225510/228586/228593/288906_1_pic400_5734.jpg",
                "imgs" : []
            },
            {
                "_id" : "5af950680292fbb5a5bc8fe7",
                "id" : 2,
                "name" : "施华洛世奇水晶手表1094379",
                "brandName" : "SWAROVSKI 施华洛世奇",
                "type" : "腕表",
                "salesPrice" : 4900.0,
                "discountPrice" : 3330.0,
                "pic" : "http://pic.cdfgsanya.com/upload/601/603/225511/228634/228636/284739_1_pic400_4204.JPG",
                "imgs" : []
            }
        ]
    }

    componentDidMount(){
        let self = this;
        let changeObj = {};
        for(let i=0; i<this.state.goodsData.length;i++){
            changeObj[this.state.goodsData[i]._id] = true;
            this.setState({checkbox:changeObj})           
        }
        
        if(this.state.goodsData.length > 0){
            document.querySelector('#cdf_shopcar .shopcar_main .empty').style.display = 'none'
            document.querySelector('#cdf_shopcar .shopcar_main .goodCars').style.display = 'block'
            document.querySelector('#cdf_shopcar .shopcar_footer').style.display = 'flex'
        }
   
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
                                                    <button>-</button><span>1</span><button>+</button>
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