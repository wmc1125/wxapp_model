import {config} from '../config.js'
const tips={
  1:'默认错误',
  1005:'appkey错误',
  1007: '网址错误',  
  3000:'该期内容不存在'
}
class HTTP{
  //解构  加上花括号,可通过的对象方式传参
  request({url, method = 'GET', data = {}}){
    return new Promise((resolve,reject)=>{
      this._request(url,resolve,reject,data,method)
    })
  }
  _request(url,resolve,reject,method='GET',data={}){
    
    wx.request({
      url: config.api_base_url+url,
      method:method,
      data:data,
      header:{
        'content-type':'application/json',
        'appkey':config.appkey
      },
      success:(res)=>{
        let code = res.statusCode.toString()

        // console.log(code)
        //es6 新  startsWith 以什么开头   endWith  以什么结尾
        if(code.startsWith('2')){
          // 成功时返回的结果
          resolve(res.data);
        }else{
          //失败时返回
          reject()
          let error_code = res.data.error_code
          this._show_error(error_code)
        }
      },
      fail:(err)=>{
        reject()
        this._show_error(1)
      }
    })
  }
  _show_error(error_code){
    if(!error_code){
      error_code=1
    }
    // console.log(error_code)
    const tip = tips[error_code]

    wx.showToast({
      title:tips?tip:tip[1],
      icon: 'none',
      duration: 1500,
    })

  }
}

export {HTTP};