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