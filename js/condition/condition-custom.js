import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  PixelRatio,
  TouchableOpacity,
  Image
} from 'react-native';

/**
* 条件组件,导出
*/
export default class TermComponent extends Component {
  constructor(props) {
    super(props);
    this.state=({
      currTermIndex : 1,
      orderUp : false
    })
  }

  _termClick(index){
    if (index == 2) {
      this.setState({
        currTermIndex : index,
        orderUp : !this.state.orderUp
      })
    }else{
      this.setState({
        currTermIndex : index,
        orderUp : false
      })
    }
  }

  render(){
    let termIndex = this.state.currTermIndex;
    let order = this.state.orderUp;
    return(
      <View style={styles.outtermbox}>
        <TouchableOpacity onPress={()=>this._termClick(0)} style={styles.termonebox}>
          <Text style={[styles.termtext,termIndex!=0?{}:styles.termtextred]}>
            综合
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>this._termClick(1)} style={styles.termonebox}>
          <Text style={[styles.termtext,termIndex!=1?{}:styles.termtextred]}>
            销量
          </Text>
          <View style={[styles.termorderimgbox,{marginLeft:3}]}>
            <Text></Text>
            <Image style={[styles.termorderimg,{marginTop:2}]} resizeMode="contain"
              source={termIndex!=1?require('../../imgs/down.png'):require('../../imgs/down-choose.png')}/>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>this._termClick(2)} style={styles.termonebox}>
          <Text style={[styles.termtext,termIndex!=2?{}:styles.termtextred]}>
            价格
          </Text>
          <View style={[styles.termorderimgbox,{marginLeft:3}]}>
            <Image style={styles.termorderimg} resizeMode="contain"
              source={(termIndex==2&&order)?require('../../imgs/up-choose.png'):require('../../imgs/up.png')}/>
            <Image style={[styles.termorderimg,{marginTop:2}]} resizeMode="contain"
              source={(termIndex==2&&!order)?require('../../imgs/down-choose.png'):require('../../imgs/down.png')}/>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.termonebox}>
          <Text style={styles.termtext}>
            筛选
          </Text>
          <Image source={require('../../imgs/filter.png')} resizeMode="contain"
           style={styles.termfilterimg}/>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  outtermbox:{
    height:44,
    backgroundColor:'white',
    borderBottomWidth:1/PixelRatio.get(),
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    paddingHorizontal:15
  },

  termonebox:{
    flexDirection:'row',
    flexWrap:'nowrap',
    alignItems:'center',
    justifyContent:'center'
  },

  termorderimgbox:{
    width:5,
    flexDirection:'column',
    justifyContent:'center'
  },

  termorderimg:{
    width:5,
    height:5
  },

  termtext:{
    fontSize:16,
    fontWeight: 'bold'
  },

  termtextred:{
    color:'red'
  },

  termfilterimg:{
    width:16,
    height:16
  },
})
