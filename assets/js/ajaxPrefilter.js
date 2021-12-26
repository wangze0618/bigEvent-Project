$(function () {
    $.ajaxPrefilter(function (options) {
        let rule = /\my/ig;
        // console.log('+++++', options.url);
        // let rule2 = /breakingnews/ig
        // if (rule2.test(options.url)) {
        options.url = 'http://api-breakingnews-web.itheima.net' + options.url
        // }
        // console.log(options);
        // 为url设置根路径
        // 为请求设置请求头
        if (rule.test(options.url)) {
            options.headers = { Authorization: localStorage.getItem('token') || '' }
        }
    })
})