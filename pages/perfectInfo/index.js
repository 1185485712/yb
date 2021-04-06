// pages/perfectInfo/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: "",
    grade: "",
    studentId: "",
    dormtory: "",
    // 选择的图片路劲数组
    chooseImgs: []


  },
  // 外网的图片路径数组
  UpLoadImgs: [],

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  // 选择图片
  handleChooseImg() {
    // 2 调用小程序内置的选择图片api
    wx.chooseImage({
      // 同时选中的图片的数量
      count: 1,
      // 图片的格式  原图  压缩
      sizeType: ['original', 'compressed'],
      // 图片的来源  相册  照相机
      sourceType: ['album', 'camera'],
      success: (result) => {
        this.setData({
          // 图片数组 进行拼接 
          chooseImgs: [result.tempFilePaths]
        })
      }
    });
  },

  handleRemoveImg() {
    let { chooseImgs } = this.data;
    chooseImgs.splice(0, 1);
    this.setData({
      chooseImgs
    })
  },

  // 文本框双向绑定
  onChange(e) {
    this.setData({
      [e.currentTarget.dataset.prop]: e.detail
    })
  },

  // 提交表单
  handleFormSubmit() {
    // 1 获取文本域的内容  获取图片数组
    let { username, grade, studentId, dormtory, chooseImgs } = this.data;

    // 3 准备上传图片 到专门的图片服务器
    // 上传文件的 api 不支持 多个文件同时上传 遍历数组 挨个上传
    // 显示正在等待的图片
    wx.showLoading({
      title: "正在上传中",
      mask: true,
    });

        // 判断有没有需要上传图片的数组
        if(chooseImgs.length !=0){
          chooseImgs.forEach((v,i) => {
            wx.uploadFile({
              // 图片上传到哪里
              url: 'https://img.coolcr.cn/api/upload',
              // 被上传的文件路径
              filePath: v,
              // 上传文件的名称  给后台获取文件  file
              name: "image",
              // 顺带的文本信息
              formData: {},
              success: (result)=>{
                const {url}= JSON.parse(result.data).data;
                // const {url} = data
                this.UpLoadImgs.push(url);
                
                // // 所有图片都上传完毕了才触发
                // if(i === chooseImgs.length-1){
                //   wx.hideLoading();
                //   // 
                //   console.log("把文本的内容和外网的图片数组 提交到后台中");
                //   // 提交都成功了
                //   // 返回上一个页面
                //   this.setData({
                //     textval:"",
                //     chooseImgs:[],
    
                //   })
                  // 返回上一个页面
                  // wx.navigateBack({
                  //   delta: 1
                  // });
                //}
    
              },
    
            });
        })
    
        }else{
          wx.hideLoading();
          console.log("只是提交了文本");
          // wx.navigateBack({
          //   delta: 1
          // });
        }

  }
})