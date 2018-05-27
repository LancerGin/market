<template>
  <div class="user">
    <div class="head">
      <img src="" alt="">
      <div class="slog">
        亲爱的小伙伴，欢迎光临 潮流设计小店
      </div>
    </div>
    <div class="order">
      <div class="orderlist">
        <div class="wait_pay">
          <i class="fa fa-suitcase"></i>
          <p>待付款</p>
        </div>
        <div class="wait_send">
          <i class="fa fa-clock-o"></i>
          <p>待发货</p>
        </div>
        <div class="had_send">
          <i class="fa fa-truck"></i>
          <p>已发货</p>
        </div>
        <div class="finish">
          <i class="fa fa-calendar-check-o"></i>
          <p>已完成</p>
        </div>
      </div>
      <group>
        <cell title="全部订单" is-link>
          <i slot="icon" width="20" style="display:block;margin-right:.16rem;" class="fa fa-file-text-o" aria-hidden="true"></i>
        </cell>
      </group>
    </div>
    <group>
      <cell title="我的购物车" is-link v-on:click.native="turnTo('/shopcart')">
        <i slot="icon" width="20" style="display:block;margin-right:.16rem;" class="fa fa-shopping-cart" aria-hidden="true"></i>
      </cell>
      <cell title="我的返现" is-link v-on:click.native="showTips('此功能暂未开放')">
        <i slot="icon" width="20" style="display:block;margin-left:.04rem;margin-right:.18rem;" class="fa fa-jpy" aria-hidden="true"></i>
      </cell>
    </group>
    <group>
      <cell title="分销人中心" is-link v-on:click.native="showTips('此功能暂未开放')">
        <i slot="icon" width="20" style="display:block;margin-right:.16rem;" class="fa fa-users" aria-hidden="true"></i>
      </cell>
    </group>
    <group>
      <cell title="我的优惠码" is-link v-on:click.native="showTips('此功能暂未开放')">
        <i slot="icon" width="20" style="display:block;margin-right:.16rem;" class="fa fa-credit-card" aria-hidden="true"></i>
      </cell>
      <cell title="关于店铺" is-link>
        <i slot="icon" width="20" style="display:block;margin-left:.02rem;margin-right:.16rem;" class="fa fa-puzzle-piece" aria-hidden="true"></i>
      </cell>
    </group>
    <!-- 信息提示 -->
    <toast v-model="showToast" type="text" :time="1500" is-show-mask :text="toastMsg" :position="'middle'"></toast>
    <!-- 底部导航 -->
    <div class="navbar">
      <div class="house" v-on:click="turnTo('/')">
        <i class="fa fa-home" aria-hidden="true"></i>
      </div>
      <div class="classification" v-on:click="turnTo('/classification')">
        <span>商品分类</span>
      </div>
      <div class="shopping_cart" v-on:click="turnTo('/shopcart')">
        <span>购物车</span>
      </div>
      <div class="vip" v-on:click="turnTo('/vip')">
        <span>会员中心</span>
      </div>
    </div>
  </div>
</template>

<script>

import { Group,Cell,Toast } from 'vux'

export default {
  name:"Vip",
  props: {

  },

  components: {
    Group,
    Cell,
    Toast
  },

  data() {
    return {
      showToast:false,
      toastMsg:""
    };
  },

  methods: {
    showTips(msg){
      this.toastMsg=msg;
      this.showToast=true;
    },
    turnTo(link){
      this.$router.push(link);
    }
  }
}
</script>

<style scoped>
.user{
  font-size:.16rem;
  text-align: left;
}

.head{
  width:100%;
  height:1.8rem;
  background-color: #99CC99;
  position: relative;
}
.head .slog{
  width:100%;
  height:0.36rem;
  line-height:0.36rem;
  padding-left: .1rem;
  font-size: .14rem;
  background-color: rgba(127,127,127,.9);
  color:#ffffff;
  position: absolute;
  bottom: 0;
  left:0;
}

.order{
  width:100%;
  background-color: #ffffff;
}
.order .orderlist{
  width:100%;
  display: flex;
  justify-content: space-between;
}
.order .orderlist>div{
  width:25%;
  padding-top: 16px;
  text-align: center;
}
.order .orderlist>div>i{
  display: block;
  font-size:.3rem;
  color:#666;
}
.order .orderlist>div>p{
  font-size:.12rem;
  color:#646464;
}

.navbar{
  position: fixed;
  bottom:0;
  left:0;
  width: 100%;
  height:.54rem;
  text-align: center;
  font-size:.16rem;
  box-shadow: 0 0 1px #eeeeee;
  background-color: #f2f2f2;
  display: -webkit-flex; /* Safari */
  display: flex;
  justify-content: space-between;
}
.navbar>div{
  height:.54rem;
  line-height:.54rem;
  background-color:#ffffff;
  margin-left:1px;
  flex-grow: 2;
}
.navbar>div span{
  font-size:.14rem;
}
.navbar>div.house{
  flex-grow: 1;
  color:#999999;
}
</style>
