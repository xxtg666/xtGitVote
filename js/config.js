// 网站地址
let siteURL = "https://vote.xxtg666.top"
// 请先创建一个 GitHub OAuth App 用于用户登录（你不能用我这个，会报错无法登录）
// https://github.com/settings/applications/new
// Application name : 随便写，用户登录的时候会看到这个名称，可以写网站名称
// Homepage URL : 写投票网址（与上面的siteURL相同）
// Authorization callback URL : 同上
// Application description : app介绍，可以不写
// Enable Device Flow : ……这个我也不知道是干啥的
// 复制 Client ID 填入下方
let clientID = "dcbb5c698b252fbc33a3"
// 点击 Generate a new client secret
// 复制 Client secret 填入下方
let clientSecret = ""
// 创建一个新仓库，用于数据存放（必须启用issue）（需要用户有管理仓库的权限才可创建投票，所以不能直接用我这个）
let dataRepo = "xxtg666/xtGitVote-data"