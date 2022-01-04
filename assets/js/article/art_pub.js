$(function () {
    const form = layui.form
    initCate()
    initEditor()
    function initCate() {
        $.ajax({
            type: "get",
            url: "/my/article/cates",
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('初始化文章分类失败')
                }
                console.log(res);
                // 调用模板引擎
                const htmlStr = template('tpl-cate', res)
                $('.select1').html(htmlStr)
                form.render()
            }
        });
    }

    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)

    $('.select_img').on('click', function () {
        $('#imgFile').click()
    })

    var art_state = '已发布';
    $('#btn-save2').on('click', function () {
        art_state = '草稿'
    })
    $('.form-body').on('submit', function (e) {
        e.preventDefault();

        let fd = new FormData($(this)[0])
        fd.append('state', art_state)

        $('#imgFile').on('change', function (e) {
            const imgObj = e.target.files;
            if (imgObj.length === 0) {
                return
            }
            const newImgURL = URL.createObjectURL(imgObj[0])
            $image
                .cropper('destroy')      // 销毁旧的裁剪区域
                .attr('src', newImgURL)  // 重新设置图片路径
                .cropper(options)        // 重新初始化裁剪区域
            $image
                .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                    width: 400,
                    height: 280
                })
                .toBlob(function (blob) {       // 将 Canvas 画布上的内容，转化为文件对象
                    // 得到文件对象后，进行后续的操作
                    fd.append('cover_img', blob)
                    publishArticle(fd)
                })
        })
        function publishArticle(fd) {
            $.ajax({
                type: "post",
                url: "my/article/add",
                data: fd,
                contentType: false,
                processData: false,

                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg('发布失败')
                    }
                    layer.msg('发布成功')
                    location.href = '/article/art_list.html'
                }
            });
        }
    })



})