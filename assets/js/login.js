$(function () {
    const linkToLogin = document.querySelector("#link_to_login");
    const linkToReg = document.querySelector("#link_to_reg");
    const regBox = document.querySelector(".regBox");
    const userloginBox = document.querySelector(".userloginBox");
    const password = document.querySelector('#password');
    const repassword = document.querySelector('#repassword');


    linkToReg.addEventListener('click', function () {
        regBox.classList.remove('hide')
        regBox.classList.add('show')
        userloginBox.classList.remove('show')
        userloginBox.classList.add('hide')
    })

    linkToLogin.addEventListener('click', function () {
        regBox.classList.remove('show')
        regBox.classList.add('hide')
        userloginBox.classList.remove('hide')
        userloginBox.classList.add('show')
    })


    // 进行自定义表单验证规则
    const form = layui.form;
    // form.addEventListener()
    form.verify({
        username: [
            /^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$/, '用户名不能有特殊字符'
        ],

        //value：表单的值、item：表单的DOM对象

        //我们既支持上述函数式的方式，也支持下述数组的形式
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        password: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {
            if (value != password.value) {
                return ('两次密码不一致');
            }
        }
    });

    // 注册
    $('.regForm').submit(function (e) {
        e.preventDefault();
        $loginValue = $('.regForm').serialize();

        $.ajax({
            type: "post",
            url: "http://api-breakingnews-web.itheima.net/api/reguser",
            data: $loginValue,
            success: function (res) {
                if (res.status === 0) {
                    layer.msg(res.message)
                } else {
                    layer.msg(res.message)
                }
            }
        });
    })

})