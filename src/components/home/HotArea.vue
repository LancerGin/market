<template>
  <div class="hot_area">
    <h2>{{hot.title}}</h2>
    <weui-button type="default" :plain="true" :mini="true" v-on:click.native="lookMore(hot.id)">查看更多</weui-button>
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
    lookMore(id){
      this.$router.push({ name: 'List', params: { key: "byId",value: id }});
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
