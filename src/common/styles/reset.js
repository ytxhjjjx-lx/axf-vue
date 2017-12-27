//重置html字体
window.onload = window.onresize = function () {
    let windowW = document.body.clientWidth || document.documentElement.clientWidth
    let fontSize = windowW / 320 * 10
    document.querySelector('html').style.fontSize = fontSize + 'px'
}