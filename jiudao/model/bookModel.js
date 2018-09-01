import { HTTP } from '../util/http-p.js';

class bookModel extends HTTP{
  getHotList(){
    return this.request({
      url:'book/hot_list'
      })
  }

  getMyBookCount(){
    return this.request({
        url:`/book/favor/count`
    })
  }
  // 获取书籍详情
  getDetail(bid){
    return this.request({
        url:`book/${bid}/detail`
    })
  }

  //获取点赞状态
  getLikeStatus(bid) {
    return this.request({
      url: `book/${bid}/favor`
    })
  }
  //获取短评信息
  getComments(bid) {
    return this.request({
      url: `book/${bid}/short_comment`
    })
  }

}
export { bookModel }


