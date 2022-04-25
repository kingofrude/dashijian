$(function () {
    layer = layui.layer
    getUserInfo()
    $('#exit').click(function(){
        layer.confirm('确认退出登录?', {icon: 3, title:'提示'}, function(index){
            //do something
            localStorage.removeItem('token')
        location.href = './le-login.html'
        // console.log(index);
            layer.close(index);
          });
    })
})
function getUserInfo() {
    $.ajax({
        url: '/my/userinfo',
        method: 'GET',
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('请求数据失败')
            }
            renderAvatar(res.data);
        }
    })
}

function renderAvatar(data) {
    let name = data.nickname || data.username
    if (data.user_pic) {
        $('.userinfo img').attr('src', data.user_pic).show()
        $('.userinfo .text-avater').hide()
    } else {
        $('.userinfo img').hide()
        $('.userinfo .text-avater').html(name[0].toUpperCase()).show()
        $('.userinfo1 #infoname').html(name[0].toUpperCase())
    }

}