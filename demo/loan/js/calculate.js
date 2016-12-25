'use strict'
function calculate() {
    var amount = document.getElementById("amount");
    var apr = document.getElementById("apr");
    var years = document.getElementById("years");
    var zipcode = document.getElementById("zipcode");
    var payments = document.getElementById("payment");
    var total = document.getElementById("total");
    var totalinterest = document.getElementById("totalinterest");

    // 将百分比格式转换为小数格式,并将年利率转换为月利率
    // 将年赔付转换为月度赔付
    var principal = parseInt(amount.value);
    var interest = parseFloat(apr.value);
    var payments = parseFloat(years.value)*12;
    var x=Math.pow(1+interest,payments);//幂次运算
    var monthly = (principal*x*interest);
    // 如果运算合法切没有超过范围
    if(isFinite(monthly)){
        payments.innerHTML = monthly.toFixed(2);//取小数点后2位
        total.innerHTML = (monthly*payments).toFixed(2);
        totalinterest.innerHTML = ((monthly*payments)-principal).toFixed(2);
        // 保存数据
        save(amount.value,apr.value,years.value,zipcode.value);

        // 找到本地放贷人,但忽略网络异常
        try {
            getLenders(amount.value,apr.value,years.value,zipcode.value);
        }catch (e){
            // 计算结果出错,清空
            payments.innerHTML = "";
            total.innerHTML = "";
            totalinterest.innerHTML = "";
            chart();//不传参数的话就是清楚图表
        }
    }
    function save(amount,apr,years,zipcode) {
        if (window.localStorage){
            localStorage.loan_apr = apr;
            localStorage.loan_years = years;
            localStorage.loan_amount = amount;
            localStorage.loan_zipcode = zipcode;
        }
    }
    window.onload = function () {
        // 如果本地支持储存切上次保存值存在
        if (window.localStorage&&window.localStorage.loan_amount){
            document.getElementById("amount").value=localStorage.loan_amount;
            document.getElementById("apr").value=localStorage.loan_apr;
            document.getElementById("years").value=localStorage.loan_years;
            document.getElementById("zipcode").value=localStorage.loan_zipcode;

        }
    };
    function getLenders(amount,apr,years,zipcode) {
        if (!window.XMLHttpRequest)return;//如如果浏览器不支持,则退出
        var ad = document.getElementById("lenders");
        if(!ad)return;//如果返回为空,则退出
        //通过XMLHttpRequest对象来提取返回数据
        var url = "getLenders.php"+"?amt="+encodeURI(amount)+"?apr="+encodeURI(apr)+"?yrs="+encodeURI(years)+"?zip="+encodeURI(zipcode);
        req.open("GET",url);
        req.send(null);
        req.onreadystatechange= function () {
            if (req.readyState==4&&req.status==200){
                var response = req.responseText;//返回以字符串的形式
                var lenders = JSON.parse(response);
                var list = "";
                for (var i=0;i<lenders.length;i++){
                    list+="<li><a href='"+lenders[i].url+"'>"+lenders[i].name+"</a>";
                }
                ad.innerHTML = "<ul>"+list+"</ul>";
            }
        }
    }
    function chart(principal,interest,monthly,oayments) {
        var graph = document.getElementById("graph");
        graph.width = graph.width;

        if(arguments.length==0||!graph.getContext)return;
        var g = graph.getContext("2d");
        var width = graph.width,
        height = graph.height;

        function paymentToX(n) {
            return n *width/payments;
        }
        function amountToY(a) {
            return height-(a*height/(monthly*payments*1.05));
        }
        g.moveTo(paymentToX(0),amountToY(0));
        g.lineTo(paymentToX(payments),amountToY(monthly*payments));
        g.lineTo(paymentToX(payments),amountToY(0));
        g.closePath();//将结尾连接至开头
        g.fillStyle = "#f88";
        g.fill();
        g.font = "bold 12px sans-serif";
        g.fillText("Total Interest Payments",20,20);

        var equity = 0;
        g.beginPath();//开始绘制新图形
        g.moveTo(paymentToX(0),amountToY(0));
        for(var p=1;p<payments;p++){
            var thisMonthsInterest = (principal-equity)*interest;
            equity+=(monthly-thisMonthsInterest);//得到资产额
            g.lineTo(paymentToX(p),amountToY(equity));
        }
        g.lineTo(paymentToX(payments),amountToY(0));
        g.closePath();//将线条结尾连接至开头
        g.fillStyle ="green";
        g.fill();
        g.fillText("Total Equity",20,35);

        var bal=principal;
        g.beginPath();//开始绘制新图形
        g.moveTo(paymentToX(0),amountToY(bal));
        for(var p=1;p<payments;p++){
            var thisMonthsInterest = bal*interest;
            bal-=(monthly-thisMonthsInterest);//得到资产额
            g.lineTo(paymentToX(p),amountToY(bal));
        }
        g.lineWidth=3;
        g.stroke();//绘制曲线
        g.fillStyle ="black";
        g.fill();
        g.fillText("Loan Balance",20,50);

        g.textAlign = "center";
        var y = amountToY(0);
        for(var year = 1;year*12<=payments;year++){
            //便利年份
            var x = paymentToX(year*12);
            g.fillRect(x-0.5,y-3,1,3);//开始绘制标志
            if (year ==1)g.fillText("Year",x,y-5);//在坐标轴做标记
            if(year%5==0&&tear*12!==payments)g.fillText(String(year),x,y-5);
            g.testAlign = "right";
            g.textBaseline="middle";
            var ticks = [monthly*payments,principal];
            var rightEdge = paymentToX(payments);
            for(var i=0;i<ticks.length;i++){
                var y = amountToY(ticks[i]);
                g.fillRect(rightEdge-3,y-0.5,3,1);
                g.fillText(String(ticks[i].toFixed(0)),rightEdge-5,y);
            }
        }

    }
}