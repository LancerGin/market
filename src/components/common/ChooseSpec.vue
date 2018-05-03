<!-- 购买时选择商品规格 -->
<template>
  <div class="spec">

  </div>
</template>

<script>
import {Icon} from 'vue-weui';

export default {
  name: 'specItem',
  props: {
    specItem: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      fieldid:null,

    }
  },
  components: {
    Icon
  },
  methods: {
    addToShopCart(){
      this.$http.post(this.GLOBAL.serverSrc + "",{

      },{credentials: false})
                .then(function (response) {
                  if(response.data.code==="0000"){

                  }else{

                  }
                })
              .catch(function (response) {
                  console.log("获取商品详情-请求错误：", response)
              });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.list_item{
  width: 48%;
  margin: 1%;
  padding: 2%;
  overflow: hidden;
  float: left;
  background-color: #ffffff;
  border-radius: 6px;
  border:1px solid #eee;
}
.list_item .img{
  width: 100%;
  height: 1.5rem;
}
.list_item h3{
  text-align: left;
  padding:.06rem .03rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 0.14rem;
  color:#333333;
}
.list_item p{
  text-align: left;
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 0.12rem;
  color:#999999;
}
.list_item p.prodescribe{
  display: block;
  padding-bottom: .1rem;
  border-bottom: 1px solid #99CC99;
}
.list_item div.close{
  position: relative;
  height: 1px;
}
.list_item div.close>i{
  font-size: .12rem;
  position: absolute;
  left: 50%;
  bottom: -0.04rem;
  margin-left: -0.06rem;
  color:#99CC99;
}
.list_item p.showprice{
  float: left;
  margin: .1rem 0;
  font-size: .14rem;
  color:#99CC99;
}
.list_item p.showprice span{
  font-size: .12rem;
  color:#99CC99;
}
.list_item p.showoldprice{
  float: left;
  margin: .14rem 0 0 .02rem;
  text-decoration:line-through;
  font-size: 0.1rem;
  color:#999999;
}
.shopping_cart{
  float: right;
  line-height: .1rem;
  font-size: .16rem;
  margin: .14rem 0 0 .02rem;
  padding: .04rem .02rem .02rem .02rem;
  color:#99CC99;
  border-color: #99CC99;
}

</style>
