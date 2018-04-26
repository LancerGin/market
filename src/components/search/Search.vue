<template>
<div class="page search-bar">
  <div class="hd">
    <h1 class="page_title">Search Bar</h1>
  </div>
  <div class="bd">
    <search-bar placeholder="搜索商品" cancel-text="取消" :value.sync="value"></search-bar>
    <h3>热门搜索</h3>
    <cells type="access" class="search_show" v-show="!value">
      <weui-button type="default" :mini="true" v-for="sr in searchResult" :key="key">{{sr.name}}</weui-button>
    </cells>
  </div>
</div>
</template>

<script>
import {SearchBar, Button, Cells} from 'vue-weui';

export default {
  data() {
    return {
      searchResult:[
        {
          name:"衣服",
          id:1
        },
        {
          name:"裤子",
          id:2
        },
        {
          name:"鞋",
          id:3
        }
      ],
      value: ''
    };
  },

  components: {
    'search-bar':SearchBar,
    'cells':Cells,
    'weui-button': Button
  }
}
</script>
