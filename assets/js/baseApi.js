$(function () {
  // 定义一个地址根
  const baseurl = 'http://big-event-vue-api-t.itheima.net'
  $.ajaxPrefilter(function (options) {
    // console.log(options)
    // 统一设置基准地址
    options.url = `${baseurl}${options.url}`
  })
})