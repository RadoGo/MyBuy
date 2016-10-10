import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  PixelRatio,
  TouchableOpacity,
  Image
} from 'react-native';

/**
* 购物车顶部(显示 购物车,编辑,消息)
*/
export default class BuyCarTitleComponent extends Component {
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
            <Text style={styles.text}>购物车</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.otherbox}>
          <TouchableOpacity style={{marginRight:10}}>
            <Text>编辑</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{marginRight:10}}>
            <Image source={require('../../imgs/message.png')}
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
    justifyContent:'center',
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
    width:20,
    height:20
  },

  text:{
    fontSize:16,
    fontWeight:'bold'
  }
});
