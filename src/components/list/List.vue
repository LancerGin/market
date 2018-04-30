<!-- 商品列表 -->
<template>
  <div class="list">
    <list-item v-for="(item, key) in list" :key="key" v-bind:listItem="item" />
    <div v-if="list.length===0" class="nodata">没有找到相关商品QAQ</div>
  </div>
</template>

<script>

import ListItem from '@/components/common/ListItem.vue';

export default {
  name: 'List',
  data () {
    return {
      sValue:"", //查询列表的条件值
      sKey:"",   //查询列表的方式
      keywords:"",
      typechild:"",
      type:"",
      showpage:1, //页码
      list :[]
    }
  },
  mounted(){
    this.getParams();
  },
  components: {
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
      if(this.sKey==="byCutpage"){
        this.$http.post(this.GLOBAL.serverSrc + "rest/index/cutpage",{
          "page":this.showpage,
        	"size":8,
        	"typeid":this.sValue
        },{credentials: false})
                  .then(function (response) {
                    if(response.data.code==="0000"){
                      let obj =  response.data.data;
                      this.$set(this,"list",obj);
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
        	"size":8,
        	"status":1,
        	"keywords":this.keywords,
        	"typechild":this.typechild,
        	"type":this.type
        },{credentials: false})
                  .then(function (response) {
                    if(response.data.code==="0000"){
                      let obj =  response.data.data;
                      this.$set(this,"list",obj);
                    }else{

                    }
                  })
                .catch(function (response) {
                    console.log("获取商品列表-请求错误：", response)
                });
      }

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.list{
  width: 100%;
  height:auto;
  background-color: #f2f2f2;
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
</style>
