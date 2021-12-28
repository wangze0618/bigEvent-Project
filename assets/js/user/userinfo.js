$(function () {
    initUserInfo()

    const form = layui.form
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称的长度必须在1~6个字符之间！'
            }
        }
    })

    // 初始化用户基本信息
    const layer = layui.layer
    function initUserInfo() {
        $.ajax({
            type: "get",
            url: "/my/userinfo",
            success: function (res) {
                if (res.status != 0) {
                    layer.msg('获取用户基本信息失败！')
                }
                console.log(res);
                form.val('userinfo', res.data)
            }
        });
    }
    // 防抖函数
    function debounce(fn) {
        let timer = null;

        return function (e) {
            e.preventDefault()
            if (timer) {
                clearTimeout(timer)
            }
            timer = setTimeout(function () {
                fn()
            }, 300)

        }
    }

    // 重置用户信息
    const btnReset = document.querySelector("#btnReset");
    // 添加防抖
    btnReset.addEventListener('click', debounce(initUserInfo)
    )
})