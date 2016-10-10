import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  PixelRatio,
  TouchableOpacity,
  Image
} from 'react-native';


//搜索框组件,对外
export default class SearchComponent extends Component {
  constructor(props) {
    super(props);
    this.state=({
      showDelIcon : false
    })
  }

  _textChange=(textWord)=>{
    if (textWord.length > 0) {
      this.setState({
        showDelIcon : true
      })
    }else {
      this.setState({
        showDelIcon : false
      })
    }
  }

  //删除文字事件或者语音事件
  _clickEven(){
    if (this.state.showDelIcon) {
      if (this.texts!=null) {
        this.texts.clear();
      }
    }
  }

  render(){
    let rightIcon = this.state.showDelIcon?require('../../imgs/close-fill.png'):
    require('../../imgs/sound-fill.png')
    return(
      <View style={styles.outbox}>
        <View style={styles.box}>
          <View style={styles.imgbox}>
            <Image style={styles.img} source={require('../../imgs/search.png')}
              resizeMode="contain"/>
          </View>
          <View style={styles.inputbox}>
            <TextInput style={styles.input} placeholder="请输入要搜索的内容"
              returnKeyType='search'
              onChangeText={this._textChange}
              ref={(ref)=>this.texts = ref}
              underlineColorAndroid='transparent'/>
          </View>
          <TouchableOpacity style={styles.imgbox} onPress={()=>this._clickEven()}>
            <Image resizeMode="contain" style={styles.img}
              source={rightIcon}/>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  outbox:{
    height:44,
    backgroundColor:'white',
    borderBottomWidth:1/PixelRatio.get(),
    alignItems:'center',
    justifyContent:'center',
    paddingHorizontal:5
  },

  box:{
    height:32,
    borderRadius: 5,
    backgroundColor:'#DBDBDB',
    flexDirection:'row',
    flexWrap:'nowrap',
    alignItems:'center'
  },

  inputbox:{
    flex:1
  },

  input:{
    flex:1,
    fontSize:18,
    paddingTop: 0,
    paddingBottom: 0,
  },

  imgbox:{
    width:32,
    height:32,
    justifyContent:'center',
    alignItems:'center'
  },

  img:{
    width:25,
    height:25
  }
})
