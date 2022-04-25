$.ajaxPrefilter(function(options){
    // 请求地址上加上网址
    options.url = 'http://www.liulongbin.top:3007' + options.url;
    // 请求中加上授权头
    if(options.url.indexOf('/my/') !== -1){
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        };
    }
    options.complete = function(res){
        if(res.responseJSON.message === '身份认证失败！' && res.responseJSON.status === 1){
            localStorage.removeItem('token')
            location.href = './le-login.html'
        }
    }
})