<!-- 首页热门专栏模块 -->
<template>
  <div class="hot_area">
    <h2>{{hot.title}}</h2>
    <div class="cover_weui">
      <weui-button type="default" :plain="true" :mini="true" v-on:click.native="lookList('byCutpage',hot.id)">查看更多</weui-button>
    </div>
    <div class="list">
      <hot-item v-for="(item, key) in hot.productList" :key="key" v-bind:hotItem="item" />
    </div>
  </div>
</template>

<script>
import {Button} from 'vue-weui';
import HotItem from '@/components/common/HotItem.vue';

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

    }
  },
  components: {
    'weui-button': Button,
    'hot-item': HotItem
  },
  methods: {
    lookList(key,value){
      this.$router.push({ name: 'List', params: { key: key,value: value }});
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hot_area {
    width: 100%;
}
h2{
    padding:.06rem 0;
    font-size: .26rem;
    color:#99CC99;
}
.list{
  width: 100%;
  height:auto;
  background-color: #f2f2f2;
  margin-top: .1rem;
}
.list:after{
  content: "\0020";
  display: block;
  height: 0;
  clear: both;
}

</style>
