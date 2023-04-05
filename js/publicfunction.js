const POLICY = `
<h5>欢迎使用 xtGitVote 投票网站。在使用本网站之前，请仔细阅读以下协议和免责声明，以确保您的权益和安全。</h5>
<h3> 1. 服务条款 </h3>
<h4> 1.1 用户协议适用范围 </h4>
本协议适用于所有使用 xtGitVote 网站的用户。在使用本网站之前，用户应当仔细阅读本协议，如有疑问，请及时联系我们。
<h4> 1.2 网站内容 </h4>
本网站提供在线投票服务，用户可以登录自己的 GitHub 账户并参与投票。网站的全部内容、包括但不限于网页、文本、图片、音频、视频、软件、程序、以及网站设计、排版、图标、数据等资源均由 xtGitVote 项目存储库提供。
<h4> 1.3 用户账号 </h4>
用户在使用本网站之前，需要使用自己的 GitHub 账号登录。用户应当保管好自己的账号信息，对于用户在使用本网站时因账号信息泄露而导致的任何损失，本网站不承担任何责任。
<h4> 1.4 网站安全 </h4>
本网站在数据存储和传输过程中采用了一定的安全措施，但是无法保证数据的绝对安全。用户在使用本网站时，应当自行承担风险。
<h4> 1.5 禁止行为 </h4>
因所有的数据获取及处理均在客户端进行，用户不得尝试使用任何破解手段提交异常数据或修改客户端代码，否则账户会被封禁。
<h3> 2. 免责声明 </h3>
<h4> 2.1 免责声明适用范围 </h4>
本免责声明适用于所有使用 xtGitVote 网站的用户。在使用本网站之前，用户应当仔细阅读本免责声明，如有疑问，请及时联系我们。
<h4> 2.2 网站内容 </h4>
本网站的全部内容、包括但不限于网页、文本、图片、音频、视频、软件、程序、以及网站设计、排版、图标、数据等资源均由 xtGitVote 项目存储库提供。用户在使用本网站时，应当自行辨别是否安全以及是否登录账户，本网站不承担由此导致的任何损失。
<h4> 2.3 网站服务 </h4>
本网站提供的投票服务，是由 xtGitVote 项目提供。本网站仅提供服务平台，对于用户发布的内容和行为不承担任何责任。
<h4> 2.4 安全风险 </h4>
用户在使用本网站时，应当自行承担风险。本网站无法对用户的行为和操作进行监管，也无法保证用户的账号和个人信息的绝对安全，对于由此产生的任何损失，本网站不承担任何责任。
<h4> 2.5 其他免责事项 </h4>
除非本协议明确规定，否则本网站不对以下事项承担任何责任：
<ul> 网站因不可抗力因素（包括但不限于自然灾害、政府行为等）造成的服务中断、故障、损失；</ul>
<ul> 用户因自身原因（包括但不限于操作不当、未经授权使用账号等）造成的损失；</ul>
<ul> 用户在使用本网站时遭受的任何侵权行为或其它违法行为；</ul>
<ul> 用户因使用本网站链接到的其他网站而遭受的任何损失。</ul>
<h3> 3. 协议修订 </h3>
本协议的条款和内容可能根据实际情况进行变更。如果条款发生变更，本网站将在网站首页公告修改的内容。如果用户不同意修改后的条款，应立即停止使用本网站。如果用户继续使用本网站，则视为用户已经接受修改后的条款。
`
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
let allowCookies = false
function setCookie(cname,cvalue,save=true)
{
    if(allowCookies && save){
        document.cookie = cname + "=" + cvalue + "; expires=Wed, 01 Jan 3000 00:00:00 GMT";
    }
    else {
        document.cookie = cname + "=" + cvalue + "; ";
    }
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
function cvt(str){ // ConvertText
    return str.replaceAll("<","&lt;").replaceAll(">","&gt;")
}
function getheader(){
    if(accessToken==""){
        return {}
    }else{
        return {Authorization: `Bearer ${accessToken}`}
    }
}
function getGitHubLoginURL(c){
    if(clientSecret==""){ // 仅xtGitVote官网可使用，私人搭建请在config.js填写clientSecret
        return `https://xtgv-api.xxtg666.top/githublogin/${c}`
    }
    else{
        return `${acURL}https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${c}`
    }
}