<template>
  <div class="home">
    <wc-swiper :duration="500" :interval="2000" class="swiper">
       <wc-slide v-for="(slide, key) in slides" :key="key">
         <img v-bind:src="slide.url" alt="slide.title">
       </wc-slide>
    </wc-swiper>
    <search-bar placeholder="搜索商品" ></search-bar>
    <div class="cover_search" v-on:click="openSearchPage"></div>
    <div class="hot_words">
      <ul>
        <li v-for="(hot, key) in hotWords" :key="key">{{hot.value}}</li>
      </ul>
    </div>
    <hot-area v-for="(hot, key) in hotArea" :key="key" v-bind:hot="hot"/>
  </div>
</template>

<script>
import {SearchBar,Button} from 'vue-weui';
import HotArea from '@/components/children/HotArea.vue';

export default {
  name: 'home',
  data () {
    return {
      slides:[
        {
          title:"图片1",
          url:"./static/img/1.png"
        },
        {
          title:"图片3",
          url:"./static/img/3.png"
        },
        {
          title:"图片4",
          url:"./static/img/4.jpg"
        }
      ],
      hotWords: [
        {value:"家居"},
        {value:"美护"},
        {value:"男装"},
        {value:"女装"},
        {value:"男鞋"},
        {value:"女鞋"},
        {value:"饰品"},
        {value:"包包"}
      ],
      hotArea:[
        {value:"潮流之选"},
        {value:"爆款专区"}
      ]
    }
  },
  components: {
    'search-bar':SearchBar,
    'weui-button': Button,
    'hot-area':HotArea
  },
  methods: {
    openSearchPage(){
      this.$router.push('/search');
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@font-face {
  font-family: hyqk;
  src: url('../assets/fonts/hyqk.ttf');
}
.swiper {
    height: 200px;
}
.cover_search{
    width: 100%;
    height: 44px;
    position: absolute;
    top: 200px;
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
  padding:10px 0;
  font-family: hyqk;
  font-size:1.2rem;
  color:#99CC99;
}
</style>
