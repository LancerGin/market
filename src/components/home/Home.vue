<!-- 首页 -->
<template>
  <div class="home">
    <wc-swiper v-if="slides.length" :duration="500" :interval="2000" class="swiper">
       <wc-slide v-for="(slide, key) in slides" :key="key" class="cover" >
         <img v-bind:src="slide.img" alt="slide.bannerid">
       </wc-slide>
    </wc-swiper>
    <div class="cover_weui"><search-bar placeholder="搜索商品" ></search-bar></div>
    <div class="cover_search" v-on:click="turnTo('/search')"></div>
    <div class="hot_words">
      <ul>
        <li v-for="(hot, key) in hotWords" :key="key" v-on:click="lookList('byType',hot.ptid)">{{hot.ptname}}</li>
      </ul>
    </div>
    <hot-area v-for="(hot, key) in hotArea" :key="key" v-bind:hot="hot"/>
    <div class="nomore">
      <span>没有更多啦~</span>
    </div>
    <!-- 底部导航 -->
    <div class="navbar">
      <div class="house" v-on:click="turnTo('/')">
        <i class="fa fa-home" aria-hidden="true"></i>
      </div>
      <div class="classification" v-on:click="turnTo('/classification')">
        <span>商品分类</span>
      </div>
      <div class="shopping_cart" v-on:click="turnTo('/shoppingcart')">
        <span>购物车</span>
      </div>
      <div class="vip" v-on:click="turnTo('/vip')">
        <span>会员中心</span>
      </div>
    </div>
  </div>
</template>

<script>
import {SearchBar,Button} from 'vue-weui';
import HotArea from '@/components/home/HotArea.vue';

export default {
  name: 'home',
  data () {
    return {
      slides:[],
      hotWords: [],
      hotArea:[]
    }
  },
  components: {
    'search-bar':SearchBar,
    'weui-button': Button,
    'hot-area':HotArea
  },
  mounted (){
    this.getIndexInfo();
    this.getUserInfo();
  },
  methods: {
    getUserInfo(){
      this.$http.get(this.GLOBAL.serverSrc + "rest/user/login",{credentials: false})
                .then(function (response) {
                  if(response.data.code==="0000"){
                    let obj =  response.data.data;
                    // sessionStorage.setItem('STORAGE_TOKEN',obj);
                  }else{

                  }
                })
              .catch(function (response) {
                  console.log("获取用户信息-请求错误：", response)
              });
    },
    getIndexInfo(){
      this.$http.get(this.GLOBAL.serverSrc + "rest/index/search",{credentials: false})
                .then(function (response) {
                  if(response.data.code==="0000"){
                    let obj =  response.data.data;
                    let banners = obj.banner;
                    this.$set(this,"slides",banners);
                    let productList = obj.productList;
                    this.$set(this,"hotArea",productList);
                    let hotWords = obj.type;
                    this.$set(this,"hotWords",hotWords);
                  }else{

                  }
                })
              .catch(function (response) {
                  console.log("获取首页信息-请求错误：", response)
              });
    },
    lookList(key,value){
      this.$router.push({ name: 'List', params: { key: key,value: value}});
    },
    turnTo(link){
      this.$router.push(link);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .home{
    padding-bottom:.6rem;
  }
  .swiper {
      height: 2rem;
  }
  .cover_search{
      width: 100%;
      height: .44rem;
      position: absolute;
      top: 2rem;
      left: 0;
      z-index:11;
  }
  .hot_words:after{
    content: "\0020";
    display: block;
    height: 0;
    clear: both;
  }
  .hot_words ul li{
    display: block;
    float: left;
    width: 25%;
    padding:.1rem 0;
    font-size:.18rem;
    font-weight:bold;
    color:#99CC99;
  }

  .nomore{
    font-size:.12rem;
    padding: .1rem 0;
    background-color: #f2f2f2;
  }

  .navbar{
    position: fixed;
    bottom:0;
    left:0;
    width: 100%;
    height:.54rem;
    font-size:.16rem;
    background-color: #f2f2f2;
    display: -webkit-flex; /* Safari */
    display: flex;
    justify-content: space-between;
  }
  .navbar>div{
    height:.54rem;
    line-height:.54rem;
    background-color:#ffffff;
    margin-left:1px;
    flex-grow: 2;
  }
  .navbar>div span{
    font-size:.14rem;
  }
  .navbar>div.house{
    flex-grow: 1;
    color:#999999;
  }
</style>
