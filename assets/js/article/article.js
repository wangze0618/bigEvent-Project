
$(function () {
    const layer = layui.layer
    const form = layui.form

    let table = document.querySelector('.table')
    initArticleList()

    function initArticleList() {
        $.ajax({
            type: "get",
            url: "/my/article/cates",
            success: function (res) {
                // console.log(res);
                let html = template('tpl', res)
                table.innerHTML = html
            }
        });
    }


    const addCate = document.querySelector('#tplAddCate')
    const btnAddCate = document.querySelector('.addCate')

    btnAddCate.addEventListener('click', function () {
        layer.open({
            type: 1,
            title: '添加类别',
            area: ['500px', '250px'],
            content: addCate.innerHTML,

        })
    })


    $('body').on('submit', '.addForm', function (e) {
        e.preventDefault();
        $.ajax({
            type: "post",
            url: "/my/article/addcates",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('添加失败')
                }
                layer.msg('添加成功')
                initArticleList()
            }
        });
    })
    let index = null;
    const editCate = document.querySelector('#tplEditCate')
    $('body').on('click', '.btn-edit', function () {
        index = layer.open({
            type: 1,
            title: '编辑',
            area: ['500px', '250px'],
            content: editCate.innerHTML,

        })

        let id = $(this)[0].getAttribute('data-id');
        console.log(id);
        $.ajax({
            type: "get",
            url: "/my/article/cates/" + id,
            success: function (res) {
                form.val("form-edit", res.data);
            }
        });
    })

    // 编辑文章功能
    $('html').on('submit', '.form-edit', function (e) {
        e.preventDefault()
        $.ajax({
            type: "post",
            url: "/my/article/updatecate",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新失败')
                }
                layer.msg('更新成功')
                layer.close(index)
                initArticleList()
            }
        });
    })

    // 删除文章功能
    $('html').on('click', '.btn-delete', function (e) {
        const id = this.getAttribute('data-id');
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                type: "get",
                url: "/my/article/deletecate/" + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg('删除失败')
                    }
                    layer.msg('删除成功')
                    initArticleList()
                }
            });
            layer.close(index);
        });
    })
})