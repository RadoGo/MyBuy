import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  PixelRatio,
  TouchableOpacity,
  Image,
  Dimensions,
  Navigator,
  BackAndroid
} from 'react-native';

import Swiper from 'react-native-swiper';
import shopJsonData from "../../datas/shop.data.json";
import ShopTopMenuComponent from './shop-menu.js';
import ShopBottomTabComponent from './shop-bottom-tab.js';
import BuyCarTitleComponent from "../buycar/buy-car-list.js";

const screenWidth = Dimensions.get('window').width;
const currNavigator = null;

/**
* 商品详情页
*/
export default class ShopInfoComponent extends Component {
  constructor(props) {
    super(props);
    this.state=({
        shopId:null
    });
  }

  //回退到上一个页面
  _goBack(){
    if(currNavigator == null){
      return false;
    }
    if(currNavigator.getCurrentRoutes().length === 1){
      return false;
    }
    currNavigator.pop();
  }

  _toBuyCar(){
    const {navigator} = this.props;
    if (navigator) {
        //导航栈入栈
        navigator.push({
            name:'BuyCarTitleComponent',
            component:BuyCarTitleComponent
        })
    }
  }

  componentWillMount(){
      this.setState({
          shopId:this.props.shopId
      });
      currNavigator = this.props.navigator;
      //监听返回健
      BackAndroid.addEventListener('hardwareBackPress', function() {
        if(currNavigator == null){
          return false;
        }
        if(currNavigator.getCurrentRoutes().length === 1){
          return false;
        }
        currNavigator.pop();
        return true;
      });
  }

  //图片轮播
  _getImgSwiperItems(shopInfo){
    let items = [];
    for (var i = 0; i < shopInfo.imgs.length; i++) {
      var item = <Image key={shopInfo.id} source={{uri:shopInfo.imgs[i]}}
        resizeMode="stretch" style={styles.infoimg}/>
      items.push(item);
    }

    return(
      <Swiper style={styles.infoswiper} showsButtons={false} height={screenWidth}>
        {items}
      </Swiper>
    )
  }

  //商品详情
  _getDescItems(shopInfo){
    return(
      <View style={styles.descbox}>
        <Text style={styles.desctitle}>{shopInfo.name + shopInfo.conifg + shopInfo.color}</Text>
        <Text style={styles.descconfig}>{shopInfo.remark}</Text>
        <Text style={styles.descprice}>￥{shopInfo.price}</Text>
      </View>
    );
  }

  render(){
    //得到索引
    let arrayIndex = this.state.shopId % 10000000;
    //根据索引获取商品详情
    let shopInfo = shopJsonData[arrayIndex];
    let imgSwiperItems = this._getImgSwiperItems(shopInfo);
    let descItems = this._getDescItems(shopInfo);
    return(
      <View style={styles.box}>
        <ShopTopMenuComponent onBackPress={()=>this._goBack()}></ShopTopMenuComponent>
        <View style={styles.infobox}>
          {imgSwiperItems}
          {descItems}
        </View>
        <ShopBottomTabComponent
          shopIndex={arrayIndex}
          goToBuyCar={()=>this._toBuyCar()}>
        </ShopBottomTabComponent>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  box:{
    flex:1
  },

  infobox:{
    flex:1,
    paddingHorizontal:8
  },

  infoswiper:{

  },

  descbox:{
    flexDirection:'column',
    borderBottomWidth:1/PixelRatio.get(),
    backgroundColor:'white'
  },

  desctitle:{
    fontSize:15,
    marginBottom:5,
    color:'black'
  },

  descconfig:{
    fontSize:14,
    color:'red',
    marginBottom:5
  },

  descprice:{
    fontSize:20,
    fontWeight:'bold',
    color:'red',
    marginBottom:5
  },

  infoimg:{
    width:screenWidth,
    height:screenWidth
  }
});
