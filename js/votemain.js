function malert(body,title="提示信息",button="确认"){
    document.getElementById("window-js-label").innerHTML=title
    document.getElementById("window-js-body").innerHTML=body
    document.getElementById("window-js-button").innerHTML=button
    new mdb.Modal(document.getElementById("window-js")).show()
}
function b64e(str){
    return btoa(encodeURI(str))
}
function b64d(str){
    return decodeURI(atob(str))
}
function getQueryVariable(variable)
{
    var query = window.location.search.substring(1);
    return _getQueryVariable(query,variable)
}
function _getQueryVariable(query,variable)
{
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] == variable){return pair[1];}
    }
    return false;
}
function setCookie(cname,cvalue)
{
  document.cookie = cname + "=" + cvalue + "; ";
}
function getCookie(cname)
{
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i=0; i<ca.length; i++)
  {
    var c = ca[i].trim();
    if (c.indexOf(name)==0) return c.substring(name.length,c.length);
  }
  return "";
}
function on_btn_logout(){
    setCookie("accessToken","")
    location.reload()
}
document.getElementById("window-login-failed-button").addEventListener("click",on_btn_logout)

let accessToken = getCookie("accessToken")
if(accessToken!=""){
$.ajax({
    headers:{
        accept: 'application/json',
        Authorization: `token ${accessToken}`
    },
    type:"GET",
    url:"https://ac.xxtg666.top/https://api.github.com/user",
    success:function(data,status){
        let username = data.name
        let useravatar = data.avatar_url
        document.getElementById("img-github-avatar").src=useravatar
        document.getElementById("ul-github-menu").innerHTML=`<li><a class="dropdown-item" href="#" id="btn-username">${username}</a></li><li><a class="dropdown-item" href="#" id="btn-logout">退出登录</a></li>`
        document.getElementById("btn-logout").addEventListener("click",on_btn_logout)
    },
    error:function(data,status){
        new mdb.Modal(document.getElementById("window-login-failed")).show()
    }
})
}

let code = getQueryVariable("id")
if (code != false){
    $.ajax({
        url:`https://ac.xxtg666.top/https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${code}`,
        type:"GET",
        success:function(data,status){
            let accessToken = _getQueryVariable(data,"access_token")
            setCookie("accessToken",accessToken)
            window.location.href = siteURL
        },
        error:function(data,status){
            new mdb.Modal(document.getElementById("window-login-failed")).show()
        }
    })
}
else{
    document.getElementById("div-notfound-id").style=""
}