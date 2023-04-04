function malert(body,title="提示信息",button="确认"){
    document.getElementById("window-js-label").innerHTML=title
    document.getElementById("window-js-body").innerHTML=body
    document.getElementById("window-js-button").innerHTML=button
    new mdb.Modal(document.getElementById("window-js")).show()
}
let last_confirm_func = function(){}
function mconfirm(body,title="提示信息",func=function(){},ok="确认",cancel="取消"){
    document.getElementById("window-js-confirm-ok").removeEventListener("click",last_confirm_func)
    last_confirm_func = func
    document.getElementById("window-js-confirm-label").innerHTML=title
    document.getElementById("window-js-confirm-body").innerHTML=body
    document.getElementById("window-js-confirm-ok").innerHTML=ok
    document.getElementById("window-js-confirm-cancel").innerHTML=cancel
    document.getElementById("window-js-confirm-ok").addEventListener("click",last_confirm_func)
    new mdb.Modal(document.getElementById("window-js-confirm")).show()
}
function on_btn_logout(){
    setCookie("accessToken","")
    location.reload()
}
document.getElementById("window-login-failed-button").addEventListener("click",on_btn_logout)
document.getElementById("btn-login-with-github").addEventListener("click",function(){
    let aurl = `https://github.com/login/oauth/authorize?client_id=${clientID}&scope=repo`
    malert(POLICY,"用户协议 与 免责声明",`<a href="${aurl}">我已阅读并同意《用户协议与免责声明》，继续登录</a>`)
})
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
        username = data["login"]
        if(notAllowUser(username)){new mdb.Modal(document.getElementById("window-login-failed")).show();return}
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
        headers:getheader(),
        url:`https://ac.xxtg666.top/https://api.github.com/repos/${dataRepo}/issues/${code}`,
        type:"GET",
        success:function(data,status){try{
            document.getElementById("h-vote-title").innerHTML=cvt(data["title"])
            if(data["state"]=="open"){
                document.getElementById("h-vote-title").innerHTML+='&ensp;<span class="badge rounded-pill badge-success">进行中</span>'
            }else{
                document.getElementById("h-vote-title").innerHTML+='&ensp;<span class="badge rounded-pill badge-danger">已截止</span>'
            }
            document.getElementById("h-vote-body").innerHTML=cvt(b64d(data["body"].split("\n")[0]))
            document.getElementById("div-vote-tb").style=""
            document.getElementById("img-vote-info").src=data["user"]["avatar_url"]
            document.getElementById("p-vote-info-name").innerHTML=cvt(data["user"]["login"])
            $.ajax({
                url:`https://ac.xxtg666.top/https://api.github.com/repos/${dataRepo}/issues/${code}/comments`,
                type:"GET",
                headers:getheader(),
                success:function(idata,status){
                    for(i in idata){
                        if(idata[i]["user"]["login"]==username){
                            userVoted=true
                        }
                    }
                    comments=idata
                    if((!userVoted) && data["state"]=="open") {
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
                        let votes={}
                        let users = []
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
                            if(!users.includes(comments[i]["user"]["login"])){
                            votes[comments[i]["body"]]["people"] += 1
                            users.push(comments[i]["user"]["login"])
                            total_num += 1
                            if(comments[i]["user"]["login"]==username){
                                votes[comments[i]["body"]]["isuser"]=true
                            }}
                        }
                        for(i in votes){
                            votes[i]["percent"]=Math.round(100*(votes[i]["people"]/total_num))
                        }
                        for(i in data["body"].split("\n")){
                            if (i == 0) {
                                continue
                            }
                            let l = data["body"].split("\n")[i].split("|")
                            if (l[1] != undefined) {
                                displayChooseB(b64d(l[1]),l[0],votes[l[0]]["isuser"],votes[l[0]]["people"],votes[l[0]]["percent"])
                            }
                        }
                    }
                    document.getElementById("ac-vote").style=""
                },
                error:function (data,status){
                    malert("加载投票选项时发生未知错误","错误")
                }
            })
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
  <label class="form-check-label" for="ra-choose-${number}">${cvt(title)}</label>
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
            malert("投票成功，已选择："+v, "完成")
            setTimeout(function () {
                location.href = `${siteURL}/vote.html?id=${c}`
            }, 2000)
        },
        error:function(data,status){
            if(accessToken==""){
                malert("投票失败，请先点击右上角登录 GitHub","错误")
                setTimeout(function (){location.href=`${siteURL}`},2000)
            }else {
                malert("投票失败", "错误")
                setTimeout(function () {
                    location.href = `${siteURL}`
                }, 2000)
            }
        }
    })
}

function displayChooseB(title,number,isuser,people,percent){
    let u='&ensp;<span class="badge badge-success rounded-pill">我投票的</span>'
    if(isuser!=true){u=""}
    htm=`<li class="list-group-item d-flex justify-content-between align-items-start">
    <div class="ms-2 me-auto">
      <div class="fw-bold">${cvt(title)}&ensp;<span class="badge badge-primary rounded-pill">${people}人</span>${u}</div>
      <div class="progress" style="height: 20px;">
    <div class="progress-bar" role="progressbar" style="width: ${percent}%;" aria-valuenow="${percent}" aria-valuemin="0" aria-valuemax="100">${percent}%</div>
    </div>
    </div>
  </li>`
    document.getElementById("ol-choose-list").innerHTML += htm
}
document.getElementById("btn-vote-finish").addEventListener("click",function (){
    mconfirm("确认<strong>结束</strong>这个投票？","",function (){
        $.ajax({
            headers:{
                accept: 'application/json',
                Authorization: `Bearer ${accessToken}`
            },
            url:`https://ac.xxtg666.top/https://api.github.com/repos/${dataRepo}/issues/${code}/lock`,
            type:"PUT",
            data:`{"lock_reason":"resolved"}`,
            success:function(data,status){
                $.ajax({
                  url: `https://ac.xxtg666.top/https://api.github.com/repos/${dataRepo}/issues/${code}`,
                  type: 'PATCH',
                  headers: {
                    'Authorization': `Bearer ${accessToken}`
                  },
                  data: JSON.stringify({
                    state: 'closed'
                  }),
                  success: function(data) {
                    malert("投票已结束","完成")
                    setTimeout(function () {
                        location.href = `${siteURL}/vote.html?id=${code}`
                    }, 2000)
                  },
                  error:function(data,status){
                        malert("结束投票失败", "错误")
                    }
                });
            },
            error:function(data,status){
                malert("结束投票失败", "错误")
            }
        })

    })
})
document.getElementById("btn-vote-delete").addEventListener("click",function (){
    mconfirm("确认<strong>删除</strong>这个投票？（不可恢复！）","",function (){
        $.ajax({
          url: `https://ac.xxtg666.top/https://api.github.com/repos/${dataRepo}/issues/${code}`,
          type: 'DELETE',
          headers: {
            'Authorization': `Bearer ${accessToken}`
          },
          success: function(data,status){
                malert("删除投票成功", "完成")
                setTimeout(function () {
                    location.href = `${siteURL}/vote.html?id=${code}`
                }, 2000)
          },
          error: function(data,status){
                malert("删除投票失败", "错误")
            }
        });
    })
})
document.getElementById("btn-vote-hide").addEventListener("click",function (){
    mconfirm("确认<strong>隐藏</strong>这个投票？","",function (){
        $.ajax({
          url: `https://ac.xxtg666.top/https://api.github.com/repos/${dataRepo}/issues/${code}/labels/xtGitVote`,
          type: 'DELETE',
          headers: {
            'Authorization': `Bearer ${accessToken}`
          },
          success: function(data,status){
                malert("隐藏投票成功", "完成")
                setTimeout(function () {
                    location.href = `${siteURL}/vote.html?id=${code}`
                }, 2000)
          },
          error: function(data,status){
                malert("隐藏投票失败", "错误")
            }
        });
    })
})