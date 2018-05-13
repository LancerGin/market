<!-- 商品列表下的商品模块 -->
<template>
  <div>
    <div class="list_item">
      <div v-on:click="lookDetails(listItem.proid)">
        <div class="img cover">
          <img v-bind:src="listItem.keyfrom" alt="">
        </div>
        <h3>{{listItem.proname}}</h3>
        <p>{{listItem.prodescribe}}</p>
      </div>
      <p class="showprice"><span>￥</span>{{listItem.showprice}}</p>
      <p v-if="listItem.showoldprice" class="showoldprice">￥{{listItem.showoldprice}}</p>
      <div class="shopping_cart" v-on:click="toChoosespec(listItem.proid)"><i class="fa fa-shopping-cart"></i></div>
    </div>
    <!-- 弹出选择规格的面板 开始-->
    <div class="choosespec_container" v-bind:class="{'show':choosespecBorn===true}">
      <ChooseSpec v-if="detailsObj.proid" v-bind:specObj="detailsObj" v-on:close-pannel="close"></ChooseSpec>
    </div>
    <!-- 弹出选择规格的面板 结束-->
    <toast v-model="showToast" type="text" :time="1500" is-show-mask :text="toastMsg" :position="'middle'"></toast>
  </div>
</template>

<script>
import {Button} from 'vue-weui';
import { Toast } from 'vux';
import ChooseSpec from '@/components/common/ChooseSpec.vue';

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
      detailsObj:{},   //点击购物车按钮弹出选择规格面板，需要获取详情
      choosespecBorn:false   //判断选择规格面板是否弹出
    }
  },
  components: {
    Toast,
    'weui-button': Button,
    ChooseSpec
  },
  methods: {
    lookDetails(proid){
      this.$router.push({ name: 'Details', params: { key: "byId",value: proid }});
    },
    toChoosespec(proid){
      this.choosespecBorn=true;
      this.getDetails(proid);
    },
    getDetails(proid){
      this.$http.get(this.GLOBAL.serverSrc + "rest/product/"+proid,{credentials: false})
                .then(function (response) {
                  if(response.data.code==="0000"){
                    this.$set(this,"detailsObj",response.data.data);
                  }else{

                  }
                })
              .catch(function (response) {
                  console.log("获取商品详情-请求错误：", response)
              });
    },
    close(msg){
      this.choosespecBorn=false;
      if(msg){
        this.toastMsg=msg;
        this.showToast=true;
      }
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


.choosespec_container{
  display: none;
}
.choosespec_container.show{
  display: block;
}

.vux-toast{
  font-size:.14rem;
}
</style>
