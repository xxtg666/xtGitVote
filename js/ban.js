let ban_mode="blacklist"
let blacklist = []
let whitelist = []
function allowUser(user){
    if(ban_mode=="blacklist"){
        return !(user in blacklist)
    }else{
        return (user in whitelist)
    }
}
function notAllowUser(user){
    return !allowUser(user)
}