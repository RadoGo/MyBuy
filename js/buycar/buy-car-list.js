import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  BackAndroid
} from 'react-native';

import BuyCarTitleComponent from './buy-car-top-title.js';

const currNavigator = null;

/**
* 购物车列表页,会展示顶部与底部计算组件,以及最底部导航组件
*/
export default class BuyCarListComponent extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount(){
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

  render(){
    return(
      <BuyCarTitleComponent onBackPress={()=>this._goBack()}></BuyCarTitleComponent>
    );
  }
}

const styles = StyleSheet.create({
});
