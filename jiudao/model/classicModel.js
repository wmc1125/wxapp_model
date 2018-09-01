import {HTTP} from '../util/http.js';

class classicModel extends HTTP{

  getLatest(sCallback){
    this.request({
      url: 'classic/latest',
      success: (res) => {
        // console.log(res)
        sCallback(res)//回调返回值
        this._setLatestIndex(res.index)
        //写入缓存
        let key = this._getKey(res.index)
        wx.setStorageSync(key, res)
      }
    })
  }
  //上一期下一期切换
  //现在缓存中查看是否存在,如果不存在,查找服务器
  getClassic(index,nextorpre,sCallback){
    //确定key
    let key = nextorpre == 'next' ? this._getKey(index + 1) : this._getKey(index - 1)
    let classic = wx.getStorageSync(key)
    if(!classic){
      this.request({
        url: 'classic/' + index + '/' + nextorpre,
        success: (res) => {
          // console.log(res)
          //写入缓存
          wx.setStorageSync(this._getKey(res.index), res)
          sCallback(res)//回调返回值
        }
      })
    }else{
      sCallback(classic)
    }
    
  }
  // 第一期
  isFirst(index){
    return index == 1 ? true : false
  }
  // 最后一期
  isLast(index) {
    let latestIndex = this._getLatestIndex()
    return index == latestIndex ? true : false
  }
  // 写入缓存
  _setLatestIndex(index) {
    wx.setStorageSync('latest', index)
  }
  // 读取缓存
  _getLatestIndex() {
    let index = wx.getStorageSync('latest')
    return index
  }
  //获取期刊的key
  _getKey(index){
    let key = 'classic-'+index
    return key
  }
 

}
export{classicModel}