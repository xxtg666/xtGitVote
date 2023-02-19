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
document.getElementById("btn-login-with-github").addEventListener("click",function(){
    window.location.href=`https://github.com/login/oauth/authorize?client_id=${clientID}&scope=repo`
})
document.getElementById("btn-new-vote").addEventListener("click",function(){
    if(accessToken=="") {
        malert("请先点击右上角登录 GitHub")
    }else {
        new mdb.Modal(document.getElementById("window-create-vote")).show()
    }
})
function on_btn_logout(){
    setCookie("accessToken","")
    location.reload()
}
document.getElementById("window-login-failed-button").addEventListener("click",on_btn_logout)

let code = getQueryVariable("code")
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

$.ajax({
    headers:{
        accept: 'application/json',
    },
    type:"GET",
    url:`https://ac.xxtg666.top/https://api.github.com/repos/${dataRepo}/labels`,
    success:function(data,status){
        let havelabel = false
        for(i in data){
            if(data[i].name=="xtGitVote"){
                havelabel = true
                break
            }
        }
        if(havelabel){
            $.ajax({
                headers: {
                    accept: 'application/json',
                },
                type: "GET",
                url: `https://ac.xxtg666.top/https://api.github.com/repos/${dataRepo}/issues?state=all&labels=xtGitVote`,
                success:function(data,status){
                    document.getElementById("div-votes").style=""
                    document.getElementById("div-votes-tip").style=""
                    for(d in data){
                        // data[d]
                    }
                    displayvote("title1","body1",true,1,"user1")
                    displayvote("title2","body2",false,2,"user2")
                    displayvote("title3","body3",true,3,"user1")
                },
                error:function(data,status){
                    malert("加载投票列表时发生错误")
                }
            })
        }
        else{
            document.getElementById("div-repo-no-label").style=""
        }
    },
    error:function(data,status){
        // malert("dataRepo 对应的数据存储库不存在或未公开，请联系网站管理员")
        document.getElementById("div-notfound-repo").style=""
    }
})

document.getElementById("btn-init-repo").addEventListener("click",function(){
    if(accessToken==""){
        malert("请先点击右上角登录 GitHub")
    }else{
        document.getElementById("btn-init-repo").innerHTML="· 正在初始化……"
        $.ajax({
            headers:{
                accept: 'application/json',
                Authorization: `Bearer ${accessToken}`
            },
            data:`{"name":"xtGitVote","description":"xtGitVote Data Storage. DO NOT DELETE THIS","color":"3b71ca"}`,
            type:"POST",
            url:`https://ac.xxtg666.top/https://api.github.com/repos/${dataRepo}/labels`,
            success:function(data,status){
                document.getElementById("btn-init-repo").innerHTML="√ 初始化完成 ."
            },
            error:function(data,status){
                document.getElementById("btn-init-repo").innerHTML="× 错误：你没有管理员权限"
            }
        })
        $.ajax({
            headers:{
                accept: 'application/json',
                Authorization: `Bearer ${accessToken}`
            },
            data:`{"name":"xtGitVoteActive","description":"xtGitVote Data Storage. DO NOT DELETE THIS","color":"d6f0e0"}`,
            type:"POST",
            url:`https://ac.xxtg666.top/https://api.github.com/repos/${dataRepo}/labels`,
            success:function(data,status){
                document.getElementById("btn-init-repo").innerHTML="√ 初始化完成 .."
            },
            error:function(data,status){
                document.getElementById("btn-init-repo").innerHTML="× 错误：你没有管理员权限"
            }
        })
        $.ajax({
            headers:{
                accept: 'application/json',
                Authorization: `Bearer ${accessToken}`
            },
            data:`{"name":"xtGitVoteEnded","description":"xtGitVote Data Storage. DO NOT DELETE THIS","color":"f9e1e5"}`,
            type:"POST",
            url:`https://ac.xxtg666.top/https://api.github.com/repos/${dataRepo}/labels`,
            success:function(data,status){
                document.getElementById("btn-init-repo").innerHTML="√ 初始化完成 ..."
                setTimeout(function(){location.reload()},3000)
            },
            error:function(data,status){
                document.getElementById("btn-init-repo").innerHTML="× 错误：你没有管理员权限"
            }
        })
    }
})

function displayvote(name,body,progress,id,username){
    let pt=""
    let pc=""
    if(progress == true){
        pt="进行中"
        pc="badge-success"
    }
    else{
        pt="已截止"
        pc="badge-danger"
    }
    htm = `<div class="col-xl-6 mb-4">
    <div class="card">
      <div class="card-body">
        <div class="d-flex justify-content-between align-items-center">
          <div class="d-flex align-items-center">
            <div class="ms-3">
              <p class="fw-bold mb-1">${name}</p>
              <p class="text-muted mb-0">${body}</p>
            </div>
          </div>
          <span class="badge rounded-pill ${pc}">${pt}</span>
        </div>
      </div>
      <div
        class="card-footer border-0 bg-light p-2 d-flex justify-content-around"
      >
        <a
          class="btn btn-link m-0 text-reset"
          href="vote.html?id=${id}"
          role="button"
          data-ripple-color="primary"
          ><i class="fa-solid fa-arrow-right"></i> 查看</a>
        <a
          class="btn btn-link m-0 text-reset"
          role="button"
          data-ripple-color="primary"
          ><i class="fa-solid fa-user"></i> ${username}</i
        ></a>
      </div>
    </div>
  </div>`
    document.getElementById("div-votes").innerHTML+=htm
}
let create_vote_id = 3
document.getElementById("btn-create-vote-add").addEventListener("click",function (){
    htm=`
    <div class="input-group mb-3" id="div-create-vote-${create_vote_id}">
        <div class="form-outline" style="">
            <input type="text" class="form-control" id="le-create-vote-${create_vote_id}">
            <label class="form-label" for="le-create-vote-${create_vote_id}">选项 ${create_vote_id}</label>
        </div>
        <!--<button class="btn btn-outline-primary" type="button" id="btn-create-vote-d${create_vote_id}" data-mdb-ripple-color="dark">×</button>-->
    </div>`
    $("div#div-create-vote-list").append(htm)
    create_vote_id+=1
})

/*function mpopover(id,title,body){
    elem=document.getElementById(id)
    elem.title=title
    elem.setAttribute("data-mdb-content",body)
    new mdb.Popover(elem,{}).show()
}*/
document.getElementById("btn-create-vote-submit").addEventListener("click",function (){
    let title = document.getElementById("le-create-vote-title").value
    if(title=="" || title==undefined){
        malert("标题不能为空","错误")
        return
    }
    let info = document.getElementById("le-create-vote-info").value
    if(info=="" || info==undefined){
        malert("简介不能为空","错误")
        return
    }
    info = b64e(info)
    let choose = []
    let votenum = 1
    while(votenum<create_vote_id){
        let cho = document.getElementById(`le-create-vote-${votenum}`).value
        if(cho=="" || cho==undefined){
            malert(`选项${votenum}不能为空`,"错误")
            return
        }
        choose.push(votenum+"|"+b64e(cho))
        votenum+=1
    }
    let bodystr = `${info}\n`
    for(i in choose){
        bodystr+=`${choose[i]}\n`
    }
    //alert(bodystr)
    $.ajax({
        headers:{
            accept: 'application/json',
            Authorization: `Bearer ${accessToken}`
        },
        data:`{114514}`,
        type:"POST",
        url:`https://ac.xxtg666.top/https://api.github.com/repos/${dataRepo}/issues`,
        success:function(data,status){

        },
        error:function(data,status){
            document.getElementById("btn-create-vote-submit").innerHTML="错误：你没有权限发起投票"
            document.getElementById("btn-create-vote-submit").disabled="disabled"
        }
    })
})