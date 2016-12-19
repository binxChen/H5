// 返回函数所接受的所有的参数
function args(){
    return arguments;
}
args();
// 将其收到的任何输入值转换成整数类型输出
parseInt();
// 与上面的相同，遇到第一个异常字符就会放弃，无论剩下的是否可用
parseFloat();


//用来确定某个输入值是否是一个可以参与算术运算的数字
//因此也可以用来检测parseInt()和parseFloat()的调用是否成功
isNaN();
//将其输入的字符串当作javascript代码来执行
eval();


//函数域始终优先于全局域，所以A会覆盖掉所有的与它同名的全局变量，这种现象叫做提升
var a = 123;
function f() {
    alert(a);
    var a = 1;
    alert(a);
}
f();

// 回调函数
function multiplyByTwo(a,b,c,callback) {
    var i,ar = [];
    for(i = 0;i<3;i++){
        ar[i] = callback(arguments[i]*2);
    }
    return ar;
}
myarr = multiplyByTwo(1,1,3,function(a){return a+1;});
