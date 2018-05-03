<template>
  <div class="search">
    <div class="search-bar">
      <search-bar placeholder="搜索商品" cancel-text="取消" v-on:weui-search-bar-submit="getSearchBarVal"></search-bar>
    </div>
    <h3>热门搜索</h3>
    <div id="hot_words">
      <div v-for="words in popularSearch" v-on:click="setValue(words.keyname)">{{words.keyname}}</div>
    </div>
  </div>
</template>

<script>
  import SearchBar from '@/components/common/SearchBar.vue';

  export default {
    data() {
      return {
        popularSearch:[],
        value: ''
      };
    },

    components: {
      'search-bar':SearchBar
    },
    mounted (){
      this.getPopularSearch();
    },
    methods:{
      getPopularSearch(){
        this.$http.get(this.GLOBAL.serverSrc + "rest/keyword/search",{credentials: false})
                  .then(function (response) {
                    if(response.data.code==="0000"){
                      let obj =  response.data.data;
                      this.$set(this,"popularSearch",obj);
                    }else{

                    }
                  })
                .catch(function (response) {
                    console.log("获取首页信息-请求错误：", response)
                });
      },
      setValue(value){
        this.$set(this,"value",value);
        this.lookList();
      },
      getSearchBarVal(msg){
        this.$set(this,"value",msg);
        this.lookList();
      },
      lookList(){
        this.$router.push({ name: 'List', params: { key: "byKeywords",value: this.value}});
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .search{
    font-size:.16rem;
  }
  .search h3{
    height:.4rem;
    line-height:.4rem;
    padding: .1rem;
    font-size:.16rem;
    font-weight:normal;
    text-align: left;
  }
  #hot_words{
    margin-top:.2rem;
    display: -webkit-flex; /* Safari */
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
  }
  #hot_words>div{
    height:.3rem;
    line-height:.3rem;
    margin:0 .1rem .1rem .1rem;
    padding:0 .06rem;
    color:#999999;
    border: 1px solid #aaaaaa;
    border-radius: 4px;
    /* flex-grow:1; */
  }

</style>
