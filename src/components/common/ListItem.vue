<template>
  <div class="list_item">
    <img v-bind:src="listItem.imgUrl" alt="">
    <h3>{{listItem.title}}</h3>
    <p>{{listItem.describe}}</p>
    <p class="price">￥{{listItem.nowprice}}</p>
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
  padding:6px 3px;
  font-size: 1.1rem;
  color:#333333;
}
.list_item p{
  text-align: left;
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 0.8rem;
  color:#999999;
}
.list_item p.price{
  margin: 12px 0;
  font-size: 1.1rem;
  color:#99CC99;
}

</style>
