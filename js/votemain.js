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
let username = ""
if(accessToken!=""){
$.ajax({
    headers:{
        accept: 'application/json',
        Authorization: `token ${accessToken}`
    },
    type:"GET",
    url:"https://ac.xxtg666.top/https://api.github.com/user",
    success:function(data,status){
        username = data.name
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

let userVoted = false;
let comments = [];
let vchoose = getQueryVariable("voteChoose")
let code = getQueryVariable("id")
if (code != false){
    $.ajax({
        url:`https://ac.xxtg666.top/https://api.github.com/repos/${dataRepo}/issues/${code}`,
        type:"GET",
        success:function(data,status){try{
            document.getElementById("h-vote-title").innerHTML=data["title"]
            if(data["state"]=="open"){
                document.getElementById("h-vote-title").innerHTML+='&ensp;<span class="badge rounded-pill badge-success">进行中</span>'
            }else{
                document.getElementById("h-vote-title").innerHTML+='&ensp;<span class="badge rounded-pill badge-danger">已截止</span>'
            }
            document.getElementById("h-vote-body").innerHTML=b64d(data["body"].split("\n")[0])
            document.getElementById("div-vote-tb").style=""
            $.ajax({
                url:`https://ac.xxtg666.top/https://api.github.com/repos/${dataRepo}/issues/${code}/comments`,
                type:"GET",
                success:function(data,status){
                    for(i in data){
                        if(data[i]["user"]["login"]==username){
                            userVoted=true
                        }
                    }
                    comments=data
                },
                error:function (data,status){
                    malert("加载投票选项时发生未知错误","错误")
                }
            })
            setTimeout(function(){
                if((!userVoted) && data["state"]=="open") {
                    console.log("用户未投票")
                    console.log(userVoted)
                    console.log(data)
                    for (i in data["body"].split("\n")) {
                        if (i == 0) {
                            continue
                        }
                        let l = data["body"].split("\n")[i].split("|")
                        if (l[1] != undefined) {
                            displayChooseA(b64d(l[1]), l[0])
                        }
                    }
                    document.getElementById("ol-choose-list").style = ""
                    document.getElementById("div-vote-main").innerHTML+=`<button type="submit" class="btn btn-primary">投票</button>`
                }else{
                    console.log("用户已投票 或 投票已截止")
                    let votes={}
                    for(i in data["body"].split("\n")){
                        if (i == 0) {
                            continue
                        }
                        let l = data["body"].split("\n")[i].split("|")
                        if (l[1] != undefined) {
                            votes[l[0]] = {"people": 0, "percent": 0, "isuser": false}
                        }
                    }
                    let total_num = 0
                    for(i in comments){
                        votes[comments[i]["body"]]["people"] += 1
                        total_num += 1
                        if(comments[i]["user"]["login"]==username){
                            votes[comments[i]["body"]]["isuser"]=true
                        }
                    }
                    for(i in votes){
                        votes[i]["percent"]=toInt(100*(votes[i]["people"]/total_num))
                    }
                    for(i in data["body"].split("\n")){
                        if (i == 0) {
                            continue
                        }
                        let l = data["body"].split("\n")[i].split("|")
                        if (l[1] != undefined) {
                            displayChooseB(l[1],l[0],votes[l[0]]["isuser"],votes[l[0]]["people"],votes[l[0]]["percent"])
                        }
                    }
                }
            },2000)

        }catch(e){
            malert("加载投票信息时发生未知错误","错误")
        }},
        error:function(data,status){
            document.getElementById("div-notfound-id").style=""
        }
    })
}
else{
    if(vchoose==false) {
        document.getElementById("div-notfound-id").style = ""
    }
}

function displayChooseA(title,number){
    htm=`<li class="list-group-item d-flex justify-content-between align-items-start">
    <div class="ms-2 me-auto">
      <div class="fw-bold">
      <div class="form-check">
  <input class="form-check-input" type="radio" name="voteChoose" value="${code}-${number}" required/>
  <label class="form-check-label" for="ra-choose-${number}">${title}</label>
</div>
</div>
    </div>
    </li>`
    document.getElementById("ol-choose-list").innerHTML+=htm
}

if (vchoose != false){
    let c = vchoose.split("-")[0]
    let v = vchoose.split("-")[1]
    $.ajax({
        headers:{
            accept: 'application/json',
            Authorization: `Bearer ${accessToken}`
        },
        url:`https://ac.xxtg666.top/https://api.github.com/repos/${dataRepo}/issues/${c}/comments`,
        type:"POST",
        data:`{"body":"${v}"}`,
        success:function(data,status){
            location.href=`${siteURL}/vote.html?id=${c}`
        },
        error:function(data,status){
            malert("投票失败","错误")
            setTimeout(function (){location.href=`${siteURL}/vote.html?id=${c}`},3000)
        }
    })
}

function displayChooseB(title,number,isuser,people,percent){
    let u='&ensp;<span class="badge badge-success rounded-pill">我投票的</span>'
    if(isuser==true){u=""}
    htm=`<li class="list-group-item d-flex justify-content-between align-items-start">
    <div class="ms-2 me-auto">
      <div class="fw-bold">${title}&ensp;<span class="badge badge-primary rounded-pill">${people}人</span>${u}</div>
      <div class="progress" style="height: 20px;">
    <div class="progress-bar" role="progressbar" style="width: ${percent}%;" aria-valuenow="${percent}" aria-valuemin="0" aria-valuemax="100">${percent}%</div>
    </div>
    </div>
  </li>`
    document.getElementById("ol-choose-list").innerHTML += htm
}