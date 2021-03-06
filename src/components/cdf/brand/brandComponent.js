import React from 'react'
import http from '../../../utils/httpclient'
import {Link} from 'react-router'
import './brand.scss'

export default class BrandComponent extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            brands_data:[]
        }
    }
    componentDidMount(){
        http.post('brands').then((res) => {
            this.setState({
                brands_data:res.data
            })
            this.refs.main_cont.addEventListener('scroll',(e)=>{
                e.preventDefault();
                let scrollTop=this.refs.main_cont.scrollTop||this.refs.main_cont.scrollTop;
                if(scrollTop >= this.refs.imgs.offsetHeight + this.refs.head.offsetHeight){
                    this.refs.b_captical.classList.add('active');
                }else{
                    this.refs.b_captical.classList.remove('active');
                }
            })

        }) 
        let brands=document.querySelector('.brand_all');
        brands.onclick=(e)=>{
            if(e.target.tagName.toLowerCase()=='dd'){
                this.props.router.push({pathname:'/datalist',query:{brand:e.target.innerText}})
            }
        }
    }
    scrollToAnchor = (anchorName) => {
        if (anchorName) {
            let anchorElement = document.getElementById(anchorName);
            if(anchorElement) { anchorElement.scrollIntoView();}
        }
    }
    toSearch(){
        this.props.router.push('/search');
    }
    render(){
        return(
            <div id="cdf_brand" className="animate-route">
                <header className="cdf_brand_header" ref="head">
                    <h1>cdf</h1>
                    <div className="search">
                        <i className="iconfont icon-icon-"></i>
                        <input type="text" placeholder="分类 品牌 系列 商品" onFocus={this.toSearch.bind(this)}/>
                    </div>
                </header>
                <div className="cdf_brand_main" ref="main_cont">
                    <div className="cdf_brand_img" ref="imgs">
                        <ul>
                            <li>
                                <Link to={{pathname:'/datalist',query:{brand:'LANCOME 兰蔻'}}}>
                                    <img src="http://pic.cdfgsanya.com/mobilemall/1525399068316GyNcc.jpg"/>
                                </Link>
                            </li>
                            <li>
                                <Link to={{pathname:'/datalist',query:{brand:'Dior 迪奥'}}}>
                                    <img src="http://pic.cdfgsanya.com/mobilemall/1524041665155vyj0S.jpg"/>
                                </Link>    
                            </li>
                            <li>
                                <Link to={{pathname:'/datalist',query:{brand:'LA MER  海蓝之谜'}}}>
                                    <img src="http://pic.cdfgsanya.com/mobilemall/1525107840098oGMLk.jpg"/>
                                </Link>
                            </li>
                            <li>
                                <Link to={{pathname:'/datalist',query:{brand:'CLINIQUE 倩碧'}}}>
                                    <img src="http://pic.cdfgsanya.com/mobilemall/1523606783782etj7h.png"/>
                                </Link>
                            </li>
                            <li>
                                <Link to={{pathname:'/datalist',query:{brand:'A.H.C 爱和纯'}}}>
                                    <img src="http://pic.cdfgsanya.com/mobilemall/1525683094865BbN6o.jpg"/>
                                </Link>
                            </li>
                            <li>
                                <Link to={{pathname:'/datalist',query:{brand:'SHISEIDO 资生堂'}}}>
                                    <img src="http://pic.cdfgsanya.com/mobilemall/1523844645026hMz1h.jpg"/>
                                </Link>
                            </li>
                            <li>
                                <Link to={{pathname:'/datalist',query:{brand:'YSL 圣罗兰'}}}>
                                    <img src="http://pic.cdfgsanya.com/mobilemall/1523844527357l6ORD.jpg"/>
                                </Link>
                            </li>
                            <li>
                                <Link to={{pathname:'/datalist',query:{brand:'Ray-Ban  雷朋'}}}>
                                    <img src="http://pic.cdfgsanya.com/mobilemall/1523844752477HAjx8.jpg"/>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="cdf_brand_cont">
                        <div className="brand_title">
                            <div className="left_line"></div>
                            <span>全部品牌</span>
                            <div className="right_line"></div>
                        </div>
                        <div className="brand_all">
                            {
                                this.state.brands_data.map((item)=>{
                                    return (
                                        <dl key={item.id} id={item.id}>
                                            <dt key={item.capital}>{item.capital}</dt>
                                            {
                                                item.brand_name.map((cont)=>{
                                                    return <dd key={cont}>{cont}</dd>
                                                })
                                            }
                                        </dl>
                                        )
                                })
                            }
                        </div>
                        <div className="brand_capital" ref="b_captical">
                            <ul>
                                {
                                    this.state.brands_data.map((item)=>{
                                        return (
                                            <li key={item.capital}>
                                                <a onClick={()=>this.scrollToAnchor(item.id)}>{item.capital}</a>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}