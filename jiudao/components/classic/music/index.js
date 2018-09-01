import { classicBeh } from '../classic-beh.js'
const mMgr = wx.getBackgroundAudioManager()
Component({
  /**
   * 组件的属性列表
   */
  behaviors: [classicBeh],
  properties: {
    src:String
  },

  /**
   * 组件的初始数据
   */
  data: {
    playing:false,
    pauserSrc:'images/player@pause.png',
    playSrc:'images/player@play.png'
  },
//暂停音乐
  detached:function(event){
    // mMgr.stop()
  },
  attached:function(event){
    this._recoverStatus()
    this._monitorSwitch()
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onPlay:function(event){
      if(!this.data.playing){
        this.setData({
          playing: true
        })
        mMgr.src = this.properties.src
      }else{
        this.setData({
          playing: false
        })
        mMgr.pause()
      }
    },
    _recoverStatus: function () {
      //判断当前播放状态
      if (mMgr.paused) {
        this.setData({
          playing: false
        })
        return
      }
      //判断是否是当前的音乐
      if (mMgr.src == this.properties.src) {
        this.setData({
          playing: true
        })
      }
    },
    //监听事件(让主控开关控制播放图标)
    _monitorSwitch:function(){
      //播放
      mMgr.onPlay(()=>{
        this._recoverStatus()
      })
      // 暂停
      mMgr.onPause(() => {
        this._recoverStatus()
      })
      //主控开关上的×
      mMgr.onStop(() => {
        this._recoverStatus()
      })
      // 让音乐自动播放完成
      mMgr.onEnded(() => {
        this._recoverStatus()
      })
    }
  }
  
})
