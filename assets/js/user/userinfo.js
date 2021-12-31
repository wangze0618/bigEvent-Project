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
    btnReset.addEventListener('click', debounce(initUserInfo))

    // 更新用户基本信息
    const formBody = document.querySelector('.form')
    function updateInfo() {
        const data = new FormData(formBody);
        const id = data.get('id')
        const nickname = data.get('nickname')
        const email = data.get('email')

        $.ajax({
            type: "post",
            url: "/my/userinfo",
            data: {
                id: id,
                nickname: nickname,
                email: email

            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新用户信息失败')
                }
                layer.msg('更新用户信息成功')
                window.parent.getUserInfo()
            }
        });

    }
    formBody.addEventListener('submit', debounce(updateInfo))
})