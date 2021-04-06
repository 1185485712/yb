// pages/search/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      history:[
        {
          id:1,
          record:"3栋",
        },
        {
          id:2,
          record:"修电脑",
        },
        {
          id:3,
          record:"3栋外卖",
        },
        {
          id:4,
          record:"4栋外卖",
        }
      ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  handleClearHistory(){
    console.log(1);
  }
})