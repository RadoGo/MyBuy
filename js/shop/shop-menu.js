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

/**
* 商品详情-顶部菜单,包括(返回,商品,详情,评价,分享,菜单,默认是商品)
*/
export default class ShopTopMenuComponent extends Component {
  constructor(props) {
    super(props);
  }

  //返回
  _backEven(){
    this.props.onBackPress();
  }

  render(){
    return(
      <View style={styles.topbox}>
        <TouchableOpacity style={styles.backbox} onPress={()=>this._backEven()}>
          <Image source={require('../../imgs/back.png')}
            resizeMode="contain" style={styles.backimg}/>
        </TouchableOpacity>
        <View style={styles.textsbox}>
          <TouchableOpacity>
            <Text style={styles.text}>商品</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.text}>详情</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.text}>评论</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.otherbox}>
          <TouchableOpacity style={{marginRight:10}}>
            <Image source={require('../../imgs/share.png')}
              resizeMode="contain" style={styles.img}/>
          </TouchableOpacity>
          <TouchableOpacity style={{marginRight:10}}>
            <Image source={require('../../imgs/more.png')}
              resizeMode="contain" style={styles.img}/>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  topbox:{
    height:44,
    alignItems:'center',
    justifyContent:'space-between',
    flexDirection:'row',
    borderBottomWidth:1/PixelRatio.get(),
    backgroundColor:'white'
  },

  textsbox:{
    flex:2,
    alignItems:'center',
    justifyContent:'space-between',
    flexDirection:'row'
  },

  backbox:{
    flex:1,
    alignItems:'center',
    justifyContent:'flex-start',
    flexDirection:'row'
  },

  otherbox:{
    flex:1,
    alignItems:'center',
    justifyContent:'flex-end',
    flexDirection:'row'
  },

  backimg:{
    width:32,
    height:32
  },

  img:{
    width:26,
    height:26
  },

  text:{
    fontSize:16,
    fontWeight:'bold'
  }
});
