import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  PixelRatio,
  TouchableOpacity,
  Image,
  Dimensions
} from 'react-native';

const screenWidth = Dimensions.get('window').width;

/**
* 商品底部导航
*/
export default class ShopBottomTabComponent extends Component {
  constructor(props) {
    super(props);
    this.state=({
      shopNum:0
    })
  }

  //即将加载时也要得到购物总数
  componentDidMount(){
    this._addCarEven();
  }

  //计算数量
  _calcBuyCount(buyInfo,shopIndex){
    let buyCount = 0;
    let shopIndexCount = 0;
    if (buyInfo != null && buyInfo != undefined) {
      shopIndexCount = buyInfo[shopIndex];
      buyCount = buyInfo["buyCount"];
    }else {
      buyInfo = {};
    }

    //该商品数量+1,总购物数+1
    shopIndexCount = shopIndexCount + 1;
    buyCount = buyCount + 1;
    //保存
    buyInfo["buyCount"] = buyCount;
    buyInfo[shopIndex] = shopIndexCount;

    storage.save({
      key: 'buyInfo',  // 注意:请不要在key中使用_下划线符号!
      rawData: buyInfo,
      expires: null
    });
    this.setState({
      shopNum:buyCount
    })
  }

  //跳转到购物车事件
  _toBuyCarEven(){
    this.props.goToBuyCar();
  }

  //加入购物车事件,计算购物车里有哪些商品,这些商品在购物车里有几个
  _addCarEven(){
    let shopIndex = this.props.shopIndex;
    let buyInfo = null;
    let currObject = this;
    //读取
    storage.load({
      key: 'buyInfo',
      // autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的同步方法
      autoSync: true,
      // syncInBackground(默认为true)意味着如果数据过期，
      // 在调用同步方法的同时先返回已经过期的数据。
      // 设置为false的话，则始终强制返回同步方法提供的最新数据(当然会需要更多等待时间)。
      syncInBackground: true
    }).then(ret => {
      //如果找到数据，则在then方法中返回
      console.log(ret);
      currObject._calcBuyCount(ret,shopIndex);
    }).catch(err => {
      //如果没有找到数据且没有同步方法，
      //或者有其他异常，则在catch中返回
      //console.warn(err.message);
      _calcBuyCount(null);
      switch (err.name) {
          case 'NotFoundError':
              // TODO;
              break;
          case 'ExpiredError':
              // TODO
              break;
      }
    });
  }

  render(){
    return(
      <View style={styles.tabbox}>
        <View style={styles.tabotherbox}>
          <TouchableOpacity style={styles.tabotheritembox}>
            <Image source={require('../../imgs/supplier.png')}
              resizeMode="contain" style={styles.tabotherimg}/>
            <Text style={styles.tabotheritemtext}>供应商</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabotheritembox}>
            <Image source={require('../../imgs/shop.png')}
              resizeMode="contain" style={styles.tabotherimg}/>
            <Text style={styles.tabotheritemtext}>店铺</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabotheritembox}>
            <Image source={require('../../imgs/attention.png')}
              resizeMode="contain" style={styles.tabotherimg}/>
            <Text style={styles.tabotheritemtext}>关注</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabotheritembox} onPress={()=>this._toBuyCarEven()}>
            <Image source={require('../../imgs/buycar.png')}
              resizeMode="contain" style={styles.tabotherimg}/>
            <Text style={styles.tabotheritemtext}>购物车</Text>
            {
              this.state.shopNum>0
              ?<View style={styles.tabcarnumbox}>
                <Text style={styles.tabcarnumtext}>{this.state.shopNum}</Text>
              </View>
              :null
            }
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.tabaddbtn} onPress={()=>this._addCarEven()}>
          <Text style={styles.tabaddbtntext}>加入购物车</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tabbox:{
    height:50,
    width:screenWidth,
    bottom:0,
    left:0,
    borderTopWidth:1/PixelRatio.get(),
    backgroundColor:'white',
    alignItems:'center',
    flexDirection:'row',
    position:'absolute'
  },

  tabotherbox:{
    flex:1,
    flexDirection:'row',
    justifyContent:'space-between',
    paddingHorizontal:5
  },

  tabotheritembox:{
    flex:1,
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center',
  },

  tabotheritemtext:{
    fontSize:12,
  },

  tabaddbtn:{
    width:150,
    height:50,
    backgroundColor:'red',
    alignItems:'center',
    justifyContent:'center'
  },

  tabaddbtntext:{
    color:'white',
    fontSize:18,
    fontWeight:'bold'
  },

  tabotherimg:{
    width:20,
    height:20,
  },

  tabcarnumbox:{
    width:18,
    height:10,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'red',
    borderRadius:10,
    position:'absolute',
    right:0,
    top:0
  },

  tabcarnumtext:{
    fontSize:8,
    fontWeight:'bold',
    color:'white'
  }
});
