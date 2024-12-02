// pages/exp5_2/exp5_2.js
const app = getApp()
const defaultAvatar = '/images5_2/avatar.png'
Page({
  credit(){
    wx.request({
      url: 'http://192.168.43.121:3000/credit',
      data:{token:app.globalData.token},
      success:res=>{
        console.log(res)
      }
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl:defaultAvatar,
  },
  onChooseAvatar(e){
    console.log(e)
    const {avatarUrl} = e.detail
    this.setData({avatarUrl})
  }
})