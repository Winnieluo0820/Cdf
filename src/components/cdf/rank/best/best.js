import React from 'react'
import http from '../../../../utils/httpclient.js'
import './best.scss'
export default class BestComponent extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            data:[]
        }
    }
    componentDidMount(){
        http.post('product_onQty',{qty:40}).then((res)=>{
            this.setState({
                data:res.data
            })
        })
    }
    render(){
        return (
            <div className="good_listBox">
                <ul>
                    {
                        this.state.data.map((item)=>{
                            return (
                                <li>
                                    <div className="img">
                                        <img src={item.pic} alt=""/>
                                    </div>
                                    <div className="cont">
                                        <i></i>
                                        <p className="brand">{item.brandName}</p>
                                        <p className="pro_name">{item.name}</p>
                                        <p className="pro_discountPrice">免税价：<span>￥{item.discountPrice}</span></p>
                                        <del className="pro_salesPrice">市场价：<span>￥{item.salesPrice}</span></del>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}