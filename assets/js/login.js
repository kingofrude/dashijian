$(function(){
    // 模块切换
    $('.register-box .change').on('click', function(){
        $('.register-box').hide();
        $('.login-box').show()
    })
    $('.login-box .change').on('click', function(){
        $('.login-box').hide();
        $('.register-box').show()
    })
    // 验证模块
    let layer = layui.layer
    let form = layui.form
    form.verify({
        repsw: function(value){ //value：表单的值、item：表单的DOM对象
          if(value !== $('#repsw').val()){
            return '两次密码不一致';
          }
          console.log(111);
        }
        
        //我们既支持上述函数式的方式，也支持下述数组的形式
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        ,password: [
          /^[\S]{6,12}$/
          ,'密码必须6到12位，且不能出现空格'
        ] 
      });
      $('#form-login').on('submit', function(e){
        e.preventDefault();
        let dat = {
          username: $('#form-login input[name="username"]').val(),
          password: $('#form-login input[name="password"]').val()
        }
        $.ajax({
          url: '/api/login',
          method: 'POST',
          data: dat,
          success: function(res){
            if(res.status !== 0){
              return layer.msg('登录失败');
            }
            layer.msg('登录成功');
            console.log(res);
            localStorage.setItem('token', res.token)
            // location.href = '/le-index.html'
          }
        })
      })
      $('#register-form').on('submit', function(e){
        e.preventDefault();
        let dat = {
          username: $('#register-form input[name="username"]').val(),
          password: $('#register-form input[name="password"]').val()
        }
        console.log(dat);
        $.ajax({
          url: '/api/reguser',
          method: 'POST',
          data: dat,
          success: function(res){
            if(res.status !== 0){
              return layer.msg('注册失败');
            }
            layer.msg('注册成功');
            console.log(11);
            $('.change').click();
          }
        })
      })   
})