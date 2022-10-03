// 入口函数
$(function () {
  // 设置登录和注册页面哪个显示
  $('#reg').on('click', function () {
    $('.reg-wrap').show()
    $('.login-wrap').hide()
  })
  $('#login').on('click', function () {
    $('.login-wrap').show()
    $('.reg-wrap').hide()
  })


  // 定义表单输入验证规则
  const form = layui.form
  form.verify({
    pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
    // 获取表单中输入的密码值
    repwd: function (value) {
      let psw = $('#psw').val()
      if (psw !== value) {
        return '两次密码不一致'
      }
    }
  })

  // 定义弹框
  const layer = layui.layer

  // 注册页面
  // 给表单添加提交事件
  $('#form-reg').on('submit', function (e) {
    // 阻止表单默认跳转行为
    e.preventDefault()
    // 通过ajax向服务器发送请求
    $.ajax({
      method: 'POST',
      // url: 'http://big-event-vue-api-t.itheima.net/api/reg',
      url: '/api/reg',
      // 请求头默认是x-www-form-urlencoded，但是接口是json格式，所以需要修改设置
      contentType: 'application/json',
      data: JSON.stringify({
        username: $('#username').val(),
        password: $('#psw').val(),
        repassword: $('#repsw').val(),
      }),
      success(res) {
        if (res.code !== 0) {
          return layer.msg(res.message);
        }
        layer.msg('注册成功');
        // 模拟人进行点击
        $('#login').click()
      }
    })
  })


  // 登录页面
  // 给登录表单添加提交事件
  $('#form-login').on('submit', function (e) {
    e.preventDefault()
    $.ajax({
      method: 'POST',
      // url: 'http://big-event-vue-api-t.itheima.net/api/login',
      url: '/api/login',
      contentType: 'application/json',
      data: JSON.stringify({
        username: $('#form-login [name=username]').val(),
        password: $('#form-login [name=password]').val()
      }),
      success(res) {
        if (res.code !== 0) {
          return layer.msg(res.message);
        }
        layer.msg('登录成功');
        localStorage.setItem('ev_token', res.token)
        location.href = '/index.html'
      }
    })
  })

})