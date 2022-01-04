$(function () {
    const layer = layui.layer
    const form = layui.form
    const laypage = layui.laypage
    const q = {
        pagenum: 1, // 页码值
        pagesize: 2, // 每页显示几条数据
        cate_id: '', // 文章分类的 Id
        state: '' // 文章发布状态
    }
    template.defaults.imports.dataFormat = function (date) {
        let dt = new Date(date);
        let year = dt.getFullYear()
        let month = padZero(dt.getMonth() + 1)
        let day = padZero(dt.getDay())

        let hour = padZero(dt.getHours())
        let minute = padZero(dt.getMinutes())
        let second = padZero(dt.getSeconds())


        return `${year}-${month}-${day} ${hour}:${minute}:${second}`
    }
    function padZero(n) {
        n = n > 9 ? n : '0' + n
    }
    initTable()
    initCate()
    function initTable() {
        $.ajax({
            type: "get",
            url: "/my/article/list",
            data: q,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取失败')
                }
                const tbody = document.querySelector('tbody');
                const t1 = template('tpl', res);
                tbody.innerHTML = t1
                renderPage(res.total)
            }
        });
    }

    function initCate() {
        $.ajax({
            type: "get",
            url: "/my/article/cates",
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取失败')
                }
                let t2 = template('tpl_select', res)
                $('[name="cate_id"]').html(t2)
                form.render()
            }
        });
    }
    // 筛选
    const form_body = document.querySelector('.form')
    const cate_id1 = document.querySelector('.select1')
    const state1 = document.querySelector('.select2')
    form_body.addEventListener('submit', function (e) {
        e.preventDefault()
        const cate_id = cate_id1.value
        const state = state1.value
        q.cate_id = cate_id;
        q.state = state;
        initTable()
    })

    function renderPage(totalsize) {
        const total = totalsize;
        console.log(total);
        laypage.render({
            elem: 'pageBox',
            count: total,
            limit: q.pagesize,
            curr: q.pagenum,
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 10],
            jump: function (obj, first) {
                // console.log(obj.curr);
                q.pagenum = obj.curr
                q.pagesize = obj.limit
                if (!first) {

                    initTable()
                }
            }
        });
    }


    $('tbdy').on('click', '.btn-delete', function () {
        const id = $(this).attr('data-id')
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                type: "get",
                url: "/my/article/delete/" + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg('删除失败')
                    }
                    layer.msg('删除成功')
                    if (len === 1) {
                        q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1
                    }
                    initTable()
                }
            });

            layer.close(index);
        });
    })
});




















