<!-- 商品列表 -->
<template>
  <div class="product_list">
    <div class="list">
      <list-item v-for="(item, key) in list" :key="key" v-bind:listItem="item" />
      <div v-if="list.length===0" class="nodata">没有找到相关商品QAQ</div>
    </div>
    <p v-if="loading" style="text-align:center;width:100%;">
      <span style="vertical-align:middle;display:inline-block;font-size:14px;">加载中&nbsp;&nbsp;</span><inline-loading></inline-loading>
    </p>
    <div v-if="list.length!=0&&nomore" class="nomore">
      <span>没有更多啦~</span>
    </div>
  </div>
</template>

<script>
  import { InlineLoading } from 'vux'
  import ListItem from '@/components/common/ListItem.vue';

  export default {
    name: 'List',
    data () {
      return {
        loading:false,
        sValue:"", //查询列表的条件值
        sKey:"",   //查询列表的方式
        keywords:"",
        typechild:"",
        type:"",
        showpage:1, //页码
        pageSize:20, //分页后每次请求的数据量
        nomore:false, //判断是否最后一页数据
        requestIsBack:false, //判断发送的请求是否响应
        list :[]
      }
    },
    mounted(){
      this.getParams();
    },
    components: {
      InlineLoading,
      'list-item': ListItem
    },
    methods: {
      getParams(){
        let params = {};
        if(this.$route.params.value){
          sessionStorage.setItem('list_params',JSON.stringify(this.$route.params));
          params = this.$route.params;
        }else{
          params = JSON.parse(sessionStorage.getItem('list_params'));
        }
        this.$set(this,"sValue",params.value);
        this.$set(this,"sKey",params.key);
        this.getList();
      },
      getList(){
        this.loading=true;
        this.requestIsBack = false;
        if(this.sKey==="byCutpage"){
          this.$http.post(this.GLOBAL.serverSrc + "rest/index/cutpage",{
            "page":this.showpage,
          	"size":this.pageSize,
          	"typeid":this.sValue
          },{credentials: false})
                    .then(function (response) {
                      if(response.data.code==="0000"){
                        this.requestIsBack = true;
                        this.pushData(response.data.data);
                        this.onScroll();
                      }else{

                      }
                    })
                  .catch(function (response) {
                      console.log("获取商品列表-请求错误：", response)
                  });
        }else{
          if(this.sKey==="byKeywords"){
            this.keywords = this.sValue;
          }else if(this.sKey==="byTypechild"){
            this.typechild = this.sValue;
          }else if(this.sKey==="byType"){
            this.type = this.sValue;
          }
          this.$http.post(this.GLOBAL.serverSrc + "rest/product/search",{
            "page":this.showpage,
          	"size":this.pageSize,
          	"status":1,
          	"keywords":this.keywords,
          	"typechild":this.typechild,
          	"type":this.type
          },{credentials: false})
                    .then(function (response) {
                      if(response.data.code==="0000"){
                        this.requestIsBack = true;
                        this.pushData(response.data.data);
                        this.onScroll();
                      }else{

                      }
                    })
                  .catch(function (response) {
                      console.log("获取商品列表-请求错误：", response)
                  });
        }

      },
      pushData(msg){
        this.loading=false;
        let obj = msg;
        let len = obj.length;
        //返回的数据条数不足 this.pageSize，说明是最后一页了
        if(len<this.pageSize){
          this.nomore=true;
        }
        for(let i=0;i<len;i++){
          this.list.push(obj[i]);
        }
      },
      getScrollTop(){
        let scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
        if(document.body){
          bodyScrollTop = document.body.scrollTop;
        }
        if(document.documentElement){
          documentScrollTop = document.documentElement.scrollTop;
        }
          scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
          return scrollTop;
      },
      getScrollHeight(){
        let scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
        if(document.body){
    　　　　bodyScrollHeight = document.body.scrollHeight;
    　　}
    　　if(document.documentElement){
    　　　　documentScrollHeight = document.documentElement.scrollHeight;
    　　}
    　　scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
    　　return scrollHeight;
      },
      getWindowHeight(){
      　　let windowHeight = 0;
      　　if(document.compatMode == "CSS1Compat"){
      　　　　windowHeight = document.documentElement.clientHeight;
      　　}else{
      　　　　windowHeight = document.body.clientHeight;
      　　}
      　　return windowHeight;
      },
      onScroll(){
        let _this = this;
        window.onscroll = function(){
          if(_this.requestIsBack){
            _this.addPages();
          }
        }
        // window.touchmove = function(){
        //   _this.addPages();
        //
        // }
      },
      addPages(){
        let _this = this;
        //下一页还有内容并且
        //滚动到页面的 0.7倍高度的时候请求下一页的数据
    　　if(this.nomore===false&&_this.getScrollTop() + _this.getWindowHeight() >= 0.7*(_this.getScrollHeight())){
    　　　　 _this.showpage++;
            _this.getList();
    　　}
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.product_list{
  font-size: .14rem;
}
.list{
  width: 100%;
  padding: 1%;
}
.list:after{
  content: "\0020";
  display: block;
  height: 0;
  clear: both;
}
.nodata{
  padding: .3rem 0;
  font-size: .14rem;
  color:#999999;
}
.nomore{
  font-size:.12rem;
  padding: .1rem 0;
}

</style>
