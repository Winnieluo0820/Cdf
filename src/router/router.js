import React from 'react'
import {Route, IndexRoute} from 'react-router'


import CdfComponent from '../components/cdf/cdfComponent.js'
import LoginComponent from '../components/login/loginComponent.js'
import RegisterComponent from '../components/register/registerComponent.js'

//cdf主页组件
import HomeComponent from '../components/cdf/home/homeComponent.js'
import BrandComponent from '../components/cdf/brand/brandComponent.js'
import ClassifyComponent from '../components/cdf/classify/classifyComponent.js'
import ShopcarComponent from '../components/cdf/shopcar/shopcarComponent.js'
import OwnerComponent from '../components/cdf/owner/ownerComponent.js'


//我的中兔的组件
import CollectionComponent from '../components/cdf/owner/collection/collectionComponent.js'
import BrowseComponent from '../components/cdf/owner/browse/browse.js'
import AddressComponent from '../components/cdf/owner/address/address.js'
import CreateaddressComponent from '../components/cdf/owner/createaddress/createaddress.js'





//后面像跳到列表页的话就新建一个路由，不要多于2层嵌套
const routes = (
    <Route>
        <Route path="/" component={CdfComponent}>
            <IndexRoute component={HomeComponent}></IndexRoute>
            <Route path="brand" component={BrandComponent}></Route>
            <Route path="classify" component={ClassifyComponent}></Route>
            <Route path="shopcar" component={ShopcarComponent}></Route>
            <Route path="owner" component={OwnerComponent}></Route>
        </Route>
        <Route path="login" component={LoginComponent}/>
        <Route path="register" component={RegisterComponent}/>
        <Route path="owner/browse" component={BrowseComponent}/>
        <Route path="owner/collection" component={CollectionComponent}/>
         <Route path="owner/address" component={AddressComponent}/>
          <Route path="owner/address/createaddress" component={CreateaddressComponent}/>
    </Route>
)

export default routes;

