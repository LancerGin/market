<template>
  <div class="hot_area">
    <h2>{{hot.value}}</h2>
    <weui-button type="default" :plain="true" :mini="true" v-on:click="lookMore">查看更多</weui-button>
    <div class="list">
      <list-item v-for="(item, key) in list" :key="key" v-bind:listItem="item" />
    </div>
  </div>
</template>

<script>
import {Button} from 'vue-weui';
import ListItem from '@/components/common/ListItem.vue';

export default {
  name: 'HotArea',
  props: {
    hot: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      list :[
        {
          imgUrl:"./static/img/1.png",
          title:"吊带连衣裙套装",
          describe:"纯色纯色高端大气高端",
          nowprice:"199"
        },
        {
          imgUrl:"./static/img/1.png",
          title:"吊带连衣裙套装",
          describe:"纯色纯色高端大气高端大气大气大气",
          nowprice:"234"
        },
        {
          imgUrl:"./static/img/1.png",
          title:"吊带连衣裙套装",
          describe:"纯色纯色高端大气高端",
          nowprice:"166"
        },
        {
          imgUrl:"./static/img/1.png",
          title:"吊带连衣裙套装",
          describe:"纯色纯色高端大气高端",
          nowprice:"178"
        }
      ]
    }
  },
  components: {
    'weui-button': Button,
    'list-item': ListItem
  },
  methods: {
    lookMore(){
      this.$router.push('/list');
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@font-face {
  font-family: hyqk;
  src: url('../../assets/fonts/hyqk.ttf');
}
.hot_area {
    width: 100%;
    height: 100px;
}
h2{
    padding:6px 0;
    font-family: hyqk;
    font-size: 2rem;
    color:#99CC99;
}
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

</style>
