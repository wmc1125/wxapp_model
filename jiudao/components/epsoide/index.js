// components/epsoide/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    index:{
      type:String,
      observer:function(newVal,oldVal,changedPath){
        // console.log(newVal)
        // console.log(oldVal)
        // console.log(changedPath)
        let val = newVal<10?'0'+newVal:newVal
        this.setData({
          _index:val//更换新值,避免出现递归
        })


      }
    }


  },

  /**
   * 组件的初始数据
   */
  data: {
    months:[
      '一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'
    ],
    year:0,
    month:'',
    _index:''

  },
  //加载时
  attached:function(){
    let date = new Date()
    let year  = date.getFullYear()
    let month = date.getMonth()
    this.setData({
      year:year,
      month:this.data.months[month]//月份比正常少1,所以不用减1
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
