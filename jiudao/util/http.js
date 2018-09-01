import {config} from '../config.js'
const tips={
  1:'默认错误',
  1005:'appkey错误',
  1007: '网址错误',  
  3000:'该期内容不存在'
}
class HTTP{
  request(params){
    if (!params.method){
      params.method='GET'
    }
    wx.request({
      url: config.api_base_url+params.url,
      method:params.method,
      data:params.data,
      header:{
        'content-type':'application/json',
        'appkey':config.appkey
      },
      success:(res)=>{
        let code = res.statusCode.toString()

        // console.log(code)
        //es6 新  startsWith 以什么开头   endWith  以什么结尾
        if(code.startsWith('2')){
          params.success && params.success(res.data);

        }else{
          // wx.showToast({
          //   title: '错误',
          //   icon:'none',
          //   duration:1500
          // })
          let error_code = res.data.error_code
          this._show_error(error_code)
        }
      },
      fail:(err)=>{
        // wx.showToast({
        //   title: '错误',
        //   icon: 'none',
        //   duration: 1500
        // })
        this._show_error(1)
      }
    })
  }
  _show_error(error_code){
    if (!error_code) {
      error_code = 1
    }
    // console.log(error_code)
    const tip = tips[error_code]

    wx.showToast({
      title: tips ? tip : tip[1],
      icon: 'none',
      duration: 1500,
    })

  }
}

export {HTTP};