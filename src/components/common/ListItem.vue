<template>
  <div class="list_item">
    <div v-on:click="lookDetails(hotItem.proid)">
      <div class="img cover">
        <img v-bind:src="hotItem.keyfrom" alt="">
      </div>
      <h3>{{listItem.proname}}</h3>
      <p>{{listItem.prodescribe}}</p>
    </div>
    <p class="price">￥{{listItem.showprice}}</p>
    <div class="shopping_cart"><i class="fa fa-shopping-cart"></i></div>
  </div>
</template>

<script>
import {Button} from 'vue-weui';

export default {
  name: 'ListItem',
  props: {
    listItem: {
      type: Object,
      required: true
    }
  },
  data () {
    return {

    }
  },
  components: {
    'weui-button': Button
  },
  methods: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.list_item{
  width: 47%;
  margin: 2% 1% 2% 2%;
  padding: 2%;
  overflow: hidden;
  float: left;
  background-color: #ffffff;
}
.list_item img{
  width: 96%;
}
.list_item h3{
  text-align: left;
  padding:.06rem .03rem;
  font-size: .18rem;
  color:#333333;
}
.list_item p{
  text-align: left;
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 0.1rem;
  color:#999999;
}
.list_item p.price{
  margin: .12rem 0;
  font-size: .18rem;
  color:#99CC99;
}
.shopping_cart{
  float: right;
  line-height: .1rem;
  font-size: .1rem;
  margin: .14rem 0 0 .02rem;
  padding: .04rem .02rem .02rem .02rem;
  color:#99CC99;
  border-color: #99CC99;
}

</style>
