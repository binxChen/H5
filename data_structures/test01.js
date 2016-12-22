

// 这里使用了闭包的思想，在函数内部重新定义了name，不至于引用到外部的变量
//这是一种javascript的优雅的写法
var pet =  function (name,legs) {
    var that = {
        name:name,
        getDetails:function () {
            return that.anme +"has  legs";
        }
    };return that;
}
var cat = function (name) {
    var that = pet(name,4);
    that.action = function () {
        return;
    };return that;
};

var petCat2 = cat('felix');
details = petCat2.getDetails();
action = petCat2.action();
petCat2.name = 'syl';
petCat2.legs = 7;
details = petCat2.getDetails();

// 内部函数
var a = function () {
    function someSetuo() {
        var setup = 'done';
        function actualWork() {
            alert('Worky-W');
        }
        someSetuo();
        return actualWork();
    }
}();
    // 闭包循环
function f() {
    var a = [];
    var i;
    for(i = 0;i<3;i++){
        a[i] = function () {
            return i ;
        }
    }
    return a;
}
/*
输出为：
var a = f();
>>>a[0]();
3
>>>a[1]();
3
>>>a[2]();
3*/


//换一种优雅的解决方案
function f() {
    var a = [];
    var i;
    for(i=0;i<3;i++){
        a[i] = (function (x) {
          return function () {
              return x;
          }
        })(i);
    }
    return a;
}
// 将十六进制值转化为颜色
function getRGB(hex){
    var rgb=[0,0,0];
    if(/#(..)(..)(..)/g.test(hex)){
        rgb=[parseInt(RegExp.$1,16),parseInt(RegExp.$2,16),parseInt(RegExp.$3,16)];
    };
    return "rgb("+rgb.join(",")+")";
}