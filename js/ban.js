let ban_mode="blacklist"
let blacklist = []
let whitelist = []
function allowUser(user){
    if(ban_mode=="blacklist"){
        return !(blacklist.indexOf(user)!=-1)
    }else{
        return (whitelist.indexOf(user)!=-1)
    }
}
function notAllowUser(user){
    return !allowUser(user)
}