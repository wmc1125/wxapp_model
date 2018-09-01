// components/like/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    like:{
      type:Boolean//默认false
    },
    count:{
      type:Number//默认0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // like:false,
    // count:9,
    yesSrc:'images/like.png',
    noSrc:'images/like_no.png'

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLike:function(event){
      // console.log(event)
      let like=this.properties.like
      let count=this.properties.count
      count = like?count-1:count+1
      this.setData({
        count:count,
        like:!like
      })
      //设置事件激活事件
      let behavior=this.properties.like?'like':'cancel'
      this.triggerEvent('like',{
        behavior:behavior
      },{})

    }

  }
})
