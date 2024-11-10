// pages/shoplist/shoplist.js
Page({
  data: {
    shopList: [], // 保存美食列表信息
  },
  listData: {
    page: 1, // 默认请求第1页的数据
    pageSize: 10, // 默认每页请求10条数据
    total: 0 // 数据总数，默认为0
  },
  isLoading: false, // 当前是否正在加载数据,isLoading 是一个布尔值，用于标记当前是否正在加载数据，以避免重复请求。
  getShopList: function (cb) {
    //cb 是一个可选的回调函数，用于在请求完成后执行。
    this.isLoading = true
    // 请求数据之前，展示加载效果，接口调用结束后，停止加载效果
    wx.showLoading({
      title: '数据加载中...'
    })
    //发起网络请求
    wx.request({
      url: 'http://127.0.0.1:3000/data',
      method: 'GET',
      data: {
        page: this.listData.page,
        pageSize: this.listData.pageSize
      },
      // 请求成功的回调
      success: res => {//success: res => { ... }：当请求成功时执行的回调函数。
        console.log(res)
        this.setData({
          shopList: [...this.data.shopList, ...res.data],
        })
        this.listData.total = res.header['X-Total-Count'] - 0
      },
      //请求完成的回调
      complete: () => {
        // 隐藏加载效果
        wx.hideLoading()
        this.isLoading = false
        cb && cb()//如果传入了回调函数 cb，则调用它（用于在下拉刷新完成后停止下拉效果）。
      }
    })
  },
  onLoad() {
    this.getShopList()
  },
  // 触底加载更多数据
    onReachBottom: function () {
      if (this.listData.page * this.listData.pageSize >= this.listData.total) {
        // 没有下一页的数据了
        return wx.showToast({
          title: '数据加载完毕！',
          icon: 'none'
        })
      }
      if (this.isLoading) {
        return
      }
      // 页码自增
      ++this.listData.page
      // 请求下一页数据
      this.getShopList()
    },
    onPullDownRefresh: function () {
      // 需要重置的数据
      this.setData({
        shopList: []
      })
      this.listData.page = 1
      this.listData.total = 0
      // 重新发起数据请求
      this.getShopList(() => {
        wx.stopPullDownRefresh()
      })
    }
  })