//像素自适应
function changeFont(){
    var deviceWidth = document.documentElement.clientWidth;
    var fontSize = deviceWidth / 3.75 + "px";
    document.documentElement.style.fontSize = fontSize;
}
changeFont();
//实时监听屏幕尺寸变化
window.onresize = function(){
    changeFont();
};
