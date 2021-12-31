$(function () {
    const form = layui.form;
    const formBody = document.querySelector('.form')

    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        samePwd: function (value) {
            if (value === $('[name=oldPwd]').val()) {
                return '新旧密码不能相同！'
            }
        },
        rePwd: function (value) {
            if (value !== $('[name=newPwd]').val()) {
                return '两次密码不一致！'
            }
        }
    })

    formBody.addEventListener('submit', function (e) {
        e.preventDefault();
        $.ajax({
            type: "post",
            url: "/my/updatepwd",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status != 0) {
                    layer.msg('更新密码失败')
                } else {
                    layer.msg('更新密码成功')
                }
                formBody.reset()
            }
        });
    })
})