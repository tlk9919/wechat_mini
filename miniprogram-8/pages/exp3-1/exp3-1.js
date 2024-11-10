// pages/exp3-1/exp3-1.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    result:'',
    num1:0,
    num2:0,
  },
  num1Input(){},
  num2Input(){},
  compare(){},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  num1Input(e){ 
    this.setData({     
      num1:e.detail.value 
    }) 
  },
  
  num2Input(e){  
    this.setData({    
      num2:e.detail.value 
    }) 
  },
  
  compare(){   
    var str = '' 
      if(this.data.num1 > this.data.num2){   
        str = '第一个数大'  
      }else if(this.data.num1 < this.data.num2){  
        str = '第二个数大'  
      }else{    
        str = '两个数一样大'  
      }   
    this.setData({   
      result:str  
    }) 
  }

})