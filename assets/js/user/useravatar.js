

const layer = layui.layer
// 1.1 获取裁剪区域的 DOM 元素
const $image = $('#image')
// 1.2 配置选项
const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
}

// 1.3 创建裁剪区域
$image.cropper(options);

$(".btnUpload").on('click', function () {
    $("#file").click()
});


const file = document.querySelector('#file');
file.addEventListener('change', function (e) {
    let img = e.target.files[0];
    var url = URL.createObjectURL(img)

    if (e.target.files.length === 0) {
        return layer.msg('请选择图片！')
    } else {

        $image.cropper('destroy')
            .attr('src', url)
            .cropper(options)
    }
})


const confirm = document.querySelector('.confirm');
confirm.addEventListener('click', function () {
    const dataURL = $image
        .cropper('getCroppedCanvas',
            { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
        .toDataURL('image/jpg')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
    $.ajax({
        type: "post",
        url: "/my/update/avatar",
        data: {
            avatar: dataURL
        },
        success: function (res) {
            if (res.status != 0) {
                return layer.msg('更新头像失败！')
            }
            layer.msg('更新成功！')
            window.parent.getUserInfo()
        }
    });
})
