import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  PixelRatio,
  TouchableOpacity,
  Image,
  ListView,
  ProgressBarAndroid,
  Dimensions
} from 'react-native';

import SearchComponent from '../search/search-custom.js';
import TermComponent from '../condition/condition-custom.js';
import ShopInfoComponent from './shop-info.js';
import shopJsonData from "../../datas/shop.data.json";

/**
* 商品列表组件,对外
*/
export default class ShopListComponent extends Component {
  constructor(props) {
    super(props);
    this.state=({
      loadFinish : false,
      dataSource : new ListView.DataSource({
        rowHasChanged:(row1,row2) => row1 !== row2
      })
    })
  }

  dsFetchData(){
    this.setState({
      dataSource : this.state.dataSource.cloneWithRows(shopJsonData),
      loadFinish : true
    })
  }

  componentWillMount(){
    this.dsFetchData();
  }

  _pressEven(shopId){
    const {navigator} = this.props;
    if (navigator) {
        //导航栈入栈
        navigator.push({
            name:'ShopInfoComponent',
            component:ShopInfoComponent,
            params:{
                shopId:shopId
            }
        })
    }
  }

  _renderRowData(rowData){
    let imgUrl = rowData.imgs[0];
    let name = rowData.name;
    let price = rowData.price;
    let commentNum = rowData.commentNum;
    let rateNum = rowData.rateNum;
    let shopId = rowData.id;
    return(
      <TouchableOpacity style={styles.shopbox} onPress={(shopId)=>this._pressEven(shopId)}>
        <Image style={styles.shopimg} source={{uri:imgUrl}} resizeMode="contain"/>
        <View style={styles.shopinfobox}>
          <Text style={styles.shopnametext}>{name}</Text>
          <View style={styles.shopotherbox}>
            <Text style={styles.shoppricetext}>￥{price}</Text>
            <Text style={styles.shopothertext}>{commentNum}条评价  {rateNum}%好评</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  render(){
    return(
      <View style={styles.box}>
        <SearchComponent></SearchComponent>
        <TermComponent></TermComponent>
        {
          (!this.state.loadFinish)?
          <View style={styles.loadingView}>
            <ProgressBarAndroid styleAttr="Large"/>
          </View>
          :
          <View style={{flex:1}}>
            <ListView style={{flex:1,paddingTop:5}}
            dataSource={this.state.dataSource}
            renderRow={(rowData) => this._renderRowData(rowData)}/>
          </View>
        }
      </View>
    );
  }
}



const styles = StyleSheet.create({
  box:{
    flex:1
  },

  loadingView:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },

  shopbox:{
    height:150,
    backgroundColor:'white',
    flexDirection:'row',
    alignItems:'center',
    borderBottomWidth:1/PixelRatio.get()
  },

  shopimg:{
    width:130,
    height:130
  },

  shopnametext:{
    fontSize:16,
    fontWeight:'bold',
    width:Dimensions.get('window').width - 140
  },

  shoppricetext:{
    color:'red'
  },

  shopothertext:{
    color:'#B6B6B6'
  },

  shopinfobox:{
    marginLeft:5,
    height:130,
    flexDirection:'column',
    justifyContent:'space-between'
  },

  shopotherbox:{
    flexDirection:'column'
  },
})
