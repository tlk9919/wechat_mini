Page({
  // 页面数据，初始化时定义了头像图片路径和临时文件路径
  data: {
    imgUrl: '/images/guest.png',  // 默认头像图片路径
    tempFilePath: null           // 临时存储选择的图片文件路径
  },
  // 上传文件的URL，存储上传成功后返回的文件路径
  uploadFileUrl: null,

  // 图片选择方法
  changeImg() {
    // 打开相册或相机选择图片
    wx.chooseMedia({
      count: 1,                  // 最多选择的文件数量,默认9，限制选择1张图片
      mediaType: ['image'],      //选择的媒体类型, 只允许选择图片
      sourceType: ['album', 'camera'],  //选择文件的来源， 选择图片来源可以是相册或相机
      success: res => {
        // 成功选择图片后的回调
        var tempFilePath = res.tempFiles[0].tempFilePath  // 获取选择的图片路径
        // 更新页面数据，设置图片路径和临时文件路径
        this.setData({
          tempFilePath: tempFilePath,
          imgUrl: tempFilePath
        })
      }
    })
  },

  // 上传图片的方法
  upload() {
    // 检查是否选择了图片，如果没有选择则提示用户更改头像后再上传
    if (!this.data.tempFilePath) {
      wx.showToast({
        title: '请您更改头像之后再进行上传操作',  // 提示内容
        icon: 'none',  // 不显示图标
        duration: 2000  // 显示2秒
      })
      return  // 退出方法，不执行后续上传操作
    }
    // 如果有选择图片，则上传图片
    wx.uploadFile({
      filePath: this.data.tempFilePath,  //选择的图片文件路径
      name: 'image',  // 表单字段名称为image， 文件对应的 key，服务器端通过这个 key 来接收文件
      url: 'http://localhost:3000/upload',  // 上传的服务器接口地址
      success: res => {
        // 上传成功后的回调函数
        this.uploadFileUrl = JSON.parse(res.data).file  // 解析响应数据，获取上传后的文件URL
        console.log('上传成功')  // 输出上传成功日志
      }
    })
  },

  // 图片下载方法
  download() {
    // 如果没有上传头像，提示用户先上传头像再下载
    if (!this.uploadFileUrl) {
      wx.showToast({
        title: '请您上传头像之后再进行下载操作',  // 提示内容
        icon: 'none',  // 不显示图标
        duration: 2000  // 显示2秒
      })
      return  // 退出方法，不执行后续下载操作
    }
    // 显示加载提示，表示图片正在下载
    wx.showLoading({
      title: '图片下载中，请稍后……',  // 提示内容
    })
    // 下载图片文件
    wx.downloadFile({
      url: this.uploadFileUrl,  // 需要下载的图片URL（上传返回的URL）
      success: res => {
        // 下载成功后的回调函数
        wx.hideLoading()  // 隐藏加载提示
        console.log('下载完成')  // 输出下载完成日志
        // 使用微信小程序的预览图片功能展示下载的图片
        wx.previewImage({
          urls: [res.tempFilePath]  // 需要预览的图片链接列表（数组），下载后的临时文件路径
        })
      }
    })
  }
})
