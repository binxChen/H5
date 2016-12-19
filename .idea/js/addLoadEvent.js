function addLoadEvent(func) {
    // body...
    console.log("xb","onLoad");
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    } else{
        window.onload = function  () {
            // body...
            oldonload();
            func();
            console.log("xb","onLoad");
        }
    }
}


