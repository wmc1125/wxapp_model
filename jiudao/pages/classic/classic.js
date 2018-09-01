import { classicModel } from '../../model/classicModel.js';
import { likeModel } from '../../model/likeModel.js';

let classic = new classicModel()
let likeModels = new likeModel()

// pages/classic/classic.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classic:null,
    latest:true,
    first:false,
    likeCount:0,
    likeStatus:1,
    // hidden: false
    
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(this.data.ss)
    // 最新一期
    classic.getLatest((res)=>{
      console.log(res)
      this.setData({
        classicData:res,
        likeCount: res.fav_nums,
        likeStatus: res.like_status
        
      })
    })
    

  },
  onLike:function(event){
    console.log(event)
    let behavior = event.detail.behavior
    console.log(this.data)
    likeModels.like(behavior, this.data.classicData.id, this.data.classicData.type)
  },
  //下一期
  onNext:function(event){
    this._updateClaccis('next')
    
  },
  //上一期
  onPre:function(event){
    this._updateClaccis('previous')
    
  },
  //更新
  _updateClaccis(nextorpre){
    let index = this.data.classicData.index
    // console.log(this.data);
    classic.getClassic(index, nextorpre, (res) => {
      this._getLikeStatus(res.id,res.type)
      // console.log(res.id);
      // console.log(res.type);
      
      this.setData({
        classicData: res,
        latest: classic.isLast(res.index),
        first: classic.isFirst(res.index)

      })
    })
  },
  //处理喜欢缓存问题
  _getLikeStatus: function (artID, category) {
    // console.log(artID)
    likeModels.getClassicLikeStatus(artID,category,
    (res)=>{
      this.setData({
        likeCount:res.fav_nums,
        likeStatus:res.like_status
      })
    })
  },

  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})