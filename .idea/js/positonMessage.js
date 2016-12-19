/*
* @Author: binxchen
* @Date:   2016-12-19 00:16:33
* @Last Modified by:   binxchen
* @Last Modified time: 2016-12-19 01:10:47
*/

// 进行的是DOM艺术的封装以及学习

//设置message这个元素的属性
function positionMseeage () {
    // body...
    if (!document.getElementById) return false;
    if (!document.getElementById('message')) return false;
    var elem = document.getElementById('message');
    elem.style.position = "absolute";
    elem.style.left = "50px";
    elem.style.top = "100px";
    moveElement("message",125,25,10);
    if (!document.getElementById('message2')) return false;
    var elem = document.getElementById('message2');
    elem.style.position = "absolute";
    elem.style.left = "50px";
    elem.style.top = "50px";
    //设置时间函数使得变化可以延时发生
    //在5秒内的时间可以随时使用clearTimeout();取消行为
    // movement = setTimeout("moveMessage()",5000);
    moveElement("message2",125,125,20);
}
addLoadEvent(positionMseeage);



//动画初次设置
// function moveMessage() {
//     if (!document.getElementById) return false;
//     if (!document.getElementById('message')) retuen false;
//     var elem = document.getElementById('message');
//     elem.style.left = "200px";
// };


//第二次版本
//使用parseInt()函数来获取位移量的字符串,然后将他转化为了整数
// function moveMessage() {
//     if (!document.getElementById) return false;
//     if (!document.getElementById('message')) retuen false;
//     var elem = document.getElementById('message');
//     //获取到元素原先的定位的数值
//     var xpos = parseInt(elem.style.left);
//     var ypos = parseInt(elem.style.top);
//     if(xpos == 200&& ypos == 100){
//         retuen true;
//     }
//     if(xpos < 200){
//         xpos++;
//     }
//     if(xpos > 200){
//             xpos--;
//         }
//     if(ypos < 200){
//             ypos++;
//         }
//     if(ypos < 200){
//             ypos--;
//         }
//     // elem..style.left = "200px";
//     elem..style.left = xpos + "px";
//     elem..style.top = ypos + "px";
//     movement = setTimeout("moveMessage()",10);
// };



