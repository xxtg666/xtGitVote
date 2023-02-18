let clientID = "dcbb5c698b252fbc33a3"
let clientSecret = "4349f2638965852f835084030d98b28250fa3d43"
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
document.getElementById("btn-login-with-github").addEventListener("click",function(){
    window.location.href=`https://github.com/login/oauth/authorize?client_id=${clientID}`
})
document.getElementById("btn-new-vote").addEventListener("click",function(){
    alert("btn-new-vote")
})
function on_btn_logout(){
    setCookie("accessToken","")
    setCookie("username","")
    location.reload()
}

let code = getQueryVariable("code")
if (code != false){
    $.ajax({
        url:`https://ac.xxtg666.top/https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${code}`,
        type:"GET",
        success:function(data,status){
            let accessToken = _getQueryVariable(data,"access_token")
            setCookie("accessToken",accessToken)
            $.ajax({
                headers:{
                    accept: 'application/json',
                    Authorization: `token ${accessToken}`
                },
                type:"GET",
                url:"https://ac.xxtg666.top/https://api.github.com/user",
                success:function(data,status){
                    let userdata = JSON.parse(data)
                    let username = userdata.name
                    setCookie("username",username)
                    document.getElementById("ul-github-menu").innerHTML=`<li><a class="dropdown-item" href="#" id="btn-username">${username}</a></li><li><a class="dropdown-item" href="#" id="btn-logout">退出登录</a></li>`
                    document.getElementById("btn-logout").addEventListener("click",on_btn_logout)
                }
            })
        }
    })
}

let username = getCookie("username")
if(username!=""){
    document.getElementById("ul-github-menu").innerHTML=`<li><a class="dropdown-item" href="#" id="btn-username">${username}</a></li><li><a class="dropdown-item" href="#" id="btn-logout">退出登录</a></li>`
    document.getElementById("btn-logout").addEventListener("click",on_btn_logout)
}
