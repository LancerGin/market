<template>
  <div class="list_item" v-on:click="lookDetails(hotItem.proid)">
    <img v-bind:src="hotItem.keyfrom" alt="">
    <h3>{{hotItem.proname}}</h3>
    <p class="prodescribe">{{hotItem.prodescribe}}</p>
    <div class="close"><i class="fa fa-times"></i></div>
    <p class="showprice"><span>￥</span>{{hotItem.showprice}}</p>
    <p class="showoldprice">￥{{hotItem.showoldprice}}</p>
    <weui-button type="default" :plain="true" :mini="true">点击购买</weui-button>
  </div>
</template>

<script>
import {Button} from 'vue-weui';

export default {
  name: 'HotItem',
  props: {
    hotItem: {
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
    lookDetails(id){
      this.$router.push('/details');
    }
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
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 1.1rem;
  color:#333333;
}
.list_item p{
  text-align: left;
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 0.82rem;
  color:#999999;
}
.list_item p.prodescribe{
  display: block;
  padding-bottom: 10px;
  border-bottom: 1px solid #99CC99;
}
.list_item div.close{
  position: relative;
  height: 1px;
}
.list_item div.close>i{
  font-size: .8rem;
  position: absolute;
  left: 50%;
  bottom: -.2rem;
  margin-left: -.4rem;
  color:#99CC99;
}
.list_item p.showprice{
  float: left;
  margin: 1rem 0;
  font-size: .9rem;
  color:#99CC99;
}
.list_item p.showprice span{
  font-size: .7rem;
  color:#99CC99;
}
.list_item p.showoldprice{
  float: left;
  margin: 1.3rem 0 0 .2rem;
  text-decoration:line-through;
  font-size: 0.7rem;
  color:#999999;
}
.list_item a.weui_btn.weui_btn_mini{
  float: right;
  line-height: 1rem;
  font-size: .6rem;
  margin: 1.2rem 0 0 .2rem;
  padding: .2rem .2rem 0 .2rem;
  color:#99CC99;
  border-color: #99CC99;
}

</style>
