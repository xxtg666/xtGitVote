export default {
  async fetch(request, env) {
    let pathname = request.url;
    // 替换成你自己的网址
    pathname = pathname.replace("https://ac.xxtg666.top/","").replace("https://ajaxcors.xxtg666.workers.dev/","")
    try {
      const newRequest = new Request(pathname,request)
      newRequest.headers.set('origin', pathname.split("/")[0]+"//"+pathname.split("/")[2])
      newRequest.headers.set('referer', pathname)
      const response = await fetch(newRequest)
      const newResponse = new Response(response.body, response)
      newResponse.headers.append('Access-Control-Allow-Origin','*')
      newResponse.headers.set('Access-Control-Allow-Origin','*')
      newResponse.headers.append('Cache-Control','no-cache')
      newResponse.headers.set('Cache-Control','no-cache')
      newResponse.headers.append('Pragma','no-cache')
      newResponse.headers.set('Pragma','no-cache')
      newResponse.headers.append('Expires','-1')
      newResponse.headers.set('Expires','-1')
      // newResponse.headers.append('Accept','*')
      return newResponse;
    } catch(err) {
      return new Response(err.stack, { status: 500 })
    }
  }
}