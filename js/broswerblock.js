for(i in navigator.userAgentData.brands){
    if(navigator.userAgentData.brands[i]['brand']=="Safari"){
        document.write("不支持 Safari 浏览器访问，请使用 Chrome 或 Firefox")
    }
}