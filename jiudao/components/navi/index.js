// components/navi/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title:String,
    first:Boolean,
    latest:Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {
    LeftSrc: 'images/triangle@left.png',
    disLeftSrc: 'images/triangle.dis@left.png',
    RightSrc: 'images/triangle@right.png',
    disRightSrc: 'images/triangle.dis@right.png'

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLeft:function(event){
      //如果不是最后一期,则触发
      if(!this.properties.latest){
        this.triggerEvent('left', {}, {})
      }
    },
    onRight: function (event) {
      //如果不是第一期,则触发
      if(!this.properties.first){
        this.triggerEvent('right', {}, {})
      }
    }

  }
})
