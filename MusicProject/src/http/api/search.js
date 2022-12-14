import service from '@/http/index'
const search = { 
    // 热搜榜
   hotSearch(){
       return service({
           url: "/search/hot/detail",
           method: "get",
       })
   },
   // 关键字搜索
   keywordSearch(keywords,limit,offset,type){
       return service({
           url:'/cloudsearch?keywords='+keywords+"&limit="+limit+"&offset="+offset+"&type="+type,
           method:'get'
       })
   },
   // 搜索建议
   suggest(keywords){
       return service({
           url:'/search/suggest?keywords='+keywords,
           method:'get'
       })
   }
}
// export default search