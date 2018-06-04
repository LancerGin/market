<template>
  <div class="user">
    <div class="head">
      <img v-bind:src="logo.url" alt="">
      <div class="slog">{{logo.slogan}}</div>
    </div>
    <div class="order">
      <div class="orderlist">
        <div class="wait_pay" v-on:click="lookList('wait_pay',1)">
          <i class="fa fa-suitcase"></i>
          <p>待付款<badge v-if="num.noPay>0" v-bind:text="num.noPay"></badge></p>
        </div>
        <div class="wait_send" v-on:click="lookList('wait_send',2)">
          <i class="fa fa-clock-o"></i>
          <p>待发货<badge v-if="num.noSendProduct>0" v-bind:text="num.noSendProduct"></badge></p>
        </div>
        <div class="had_send" v-on:click="lookList('had_send',3)">
          <i class="fa fa-truck"></i>
          <p>已发货<badge v-if="num.noReceiveProduct>0" v-bind:text="num.noReceiveProduct"></badge></p>
        </div>
        <div class="finish" v-on:click="lookList('finish',4)">
          <i class="fa fa-calendar-check-o"></i>
          <p>已完成</p>
        </div>
      </div>
      <group>
        <cell title="全部订单" is-link v-on:click.native="lookList('all',0)">
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

import { Group,Cell,Toast,Badge } from 'vux'

export default {
  name:"Vip",
  props: {

  },

  components: {
    Group,
    Cell,
    Toast,
    Badge
  },

  data() {
    return {
      logo:{
        url:"../../static/img/logo.png",
        slogan:"亲爱的小伙伴，欢迎光临 潮流设计小店"
      },
      num:{
        noReceiveProduct:0,
        noSendProduct:0,
        noPay:0
      },
      showToast:false,
      toastMsg:""
    };
  },
  created(){
    this.getNum();
  },
  methods: {
    getNum(){
      this.$http.get(this.GLOBAL.serverSrc + "rest/order/selectNumber",{credentials: false})
                .then(function (response) {
                  if(response.data.code==="0000"){
                      this.$set(this,"num",response.data.data)
                  }else{
                      
                  }
                })
              .catch(function (response) {
                  console.log("获取订单数量统计-请求错误：", response)
              });
    },
    showTips(msg){
      this.toastMsg=msg;
      this.showToast=true;
    },
    turnTo(link){
      this.$router.push(link);
    },
    lookList(key,value){
      this.$router.push({ name: 'OrderList', params: { key: key,value: value}});
    }
  }
}
</script>

<style scoped>
.user{
  font-size:.16rem;
  text-align: left;
  padding-bottom:.8rem;
}
.user .weui-cell{
  font-size:.14rem;
  padding:.13rem .2rem;
}

.head{
  width:100%;
  height:2rem;
  background-color: #99CC99;
  position: relative;
  text-align: center;
}
.head img{
  width:2rem;
  height:2rem;
}
.head .slog{
  width:100%;
  height:0.36rem;
  line-height:0.36rem;
  text-align: left;
  padding-left: .1rem;
  font-size: .14rem;
  background-color: rgba(127,127,127,.7);
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
  position: relative;
}
.order .orderlist>div>p>.vux-badge-single{
  position: absolute;
  top:-.36rem;
  right:-.04rem;
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
