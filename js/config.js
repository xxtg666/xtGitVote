// 网站地址（不以/结尾）
let siteURL = "https://vote.xxtg666.top"
// 网站名称
let siteName = "xtGitVote"
// 网站标题
let siteTitle = "xxtg666-xtGitVote-投票站"
// 网站简介（显示在主页上）
let siteInfo = "这是一个使用 GitHub Repo 存储数据的投票网站"
// 投票页面标题（自动替换:{i}id)
let voteTitle = "Vote#{i}-xtGitVote"
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
// 绕过跨域请求服务器网址（以/结尾）
// 你可以使用js/ac.cloudflare-worker.js自行搭建
let acURL = "https://ac.xxtg666.top/"