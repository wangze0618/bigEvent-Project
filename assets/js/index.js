$(function () {
    getUserInfo()




    // 检测是否登录
    function isLogin(res) {
        if (res.status == 1 && res.message == '身份认证失败！') {
            // alert('尚未登录！请登录！');
            localStorage.removeItem('token')
            location.href = '../../login.html';
        }
    }


    // 获取用户基本信息
    function getUserInfo() {
        $.ajax({
            type: "get",
            url: "/my/userinfo",
            success: function (res) {
                isLogin(res)
                if (res) {
                    renderInfo(res)
                } else {
                    layer.msg(res.message)
                }
            }
        });
    }

    // 渲染用户信息
    function renderInfo(resData) {
        const welText = document.querySelector('#welcome');
        const span_text = document.querySelectorAll('.text-avatar');
        // 欢迎文字
        const username = resData.data.nickname || resData.data.username
        welText.innerHTML = username;
        // 头像
        if (resData.data.user_pic != null) {
            $('.avatar').attr('src', resData.data.user_pic).show();
            $('.text-avatar').hide()
        } else {
            const first_str = username.slice(0, 1);
            $('.avatar').hide()
            $('.text-avatar').show()
            for (let index = 0; index < span_text.length; index++) {
                span_text[index].innerHTML = first_str.toUpperCase()
            }
        }
    }

    // 退出登录
    const btnLogout = document.querySelector('#btnLogout');
    function logout() {
        layer.confirm('退出登录?', { icon: 3, title: '退出登录' }, function (index) {
            localStorage.removeItem('token');
            location.href = '../../login.html';
            layer.close(index)
        })
    }
    // 防抖函数
    function debounce(fn) {
        let timer = null
        return function () {
            if (timer) {
                clearTimeout(timer)
            }
            timer = setTimeout(function () {
                fn()
            }, 200)
        }
    }
    btnLogout.addEventListener('click', debounce(logout))
})

