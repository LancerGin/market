<template>
  <div class="order_list">
    <div class="orders" v-for="(order,index) in orderArr">
      <h3 class="title" v-bind:class="'status'+order.status">
        {{order.statusinfo}}
        <b v-if="order.status===1" v-bind="timeout(order)">({{order.showTime}})</b>
        <span v-on:click="lookDetails('fromlist',order)">订单详情 ></span>
      </h3>
      <div class="product">
        <div class="img">
          <img v-bind:src="order.productinfo.img" alt="">
        </div>
        <p>{{order.productinfo.prodescribe}}</p>
        <p class="spec">规格：{{order.productinfo.FIELD?order.productinfo.FIELD:'默认'}} {{order.productinfo.spce}}</p>
        <p><span class="rmb">￥</span>{{order.price}}</p>
        <div class="count">x{{order.number}}</div>
      </div>
      <group>
        <cell v-bind:title="order.createtime"><span style="color:#646464;">合计:￥{{order.paycash}}</span></cell>
        <cell v-if="order.status===1"><div class="btn pay_now" v-on:click="payNow(order.orderid)">立即付款</div></cell>
        <cell v-else-if="order.status===2"><div class="btn alarm" v-on:click="reminding(order.orderid)">提醒卖家</div></cell>
        <cell v-else-if="order.status===3"><div class="btn lookex" v-on:click="lookExpress('fromlist',order)">查看物流</div><div class="btn comfirm" v-on:click="receiveProduct(order.orderid)">确认收货</div></cell>
        <cell v-else-if="order.status===4"><div class="btn lookex" v-on:click="lookExpress('fromlist',order)">查看物流</div><div class="btn delete" v-on:click="deleteOrder(order.orderid)">删除</div></cell>
        <cell v-else-if="order.status===5"><div class="btn delete" v-on:click="deleteOrder(order.orderid)">删除</div></cell>
      </group>
    </div>
    <p v-if="loading" style="text-align:center;width:100%;">
      <span style="vertical-align:middle;display:inline-block;font-size:14px;">加载中&nbsp;&nbsp;</span><inline-loading></inline-loading>
    </p>
    <div v-if="orderArr.length===0" class="nodata">无订单记录QAQ</div>
    <div v-if="orderArr.length!=0&&nomore" class="nomore">
      <span>没有更多啦~</span>
    </div>
    <!-- 信息提示 -->
    <toast v-model="showToast" type="text" :time="1500" is-show-mask :text="toastMsg" :position="'middle'"></toast>
  </div>
</template>

<script>

import { Group,Cell,Toast,InlineLoading } from 'vux'

export default {
  name:"OrderList",
  props: {

  },

  components: {
    Group,
    Cell,
    Toast,
    InlineLoading
  },

  data() {
    return {
      loading:false,
      sValue:0, //查询列表的条件值
      showpage:1, //页码
      pageSize:10, //分页后每次请求的数据量
      nomore:false, //判断是否最后一页数据
      requestIsBack:false, //判断发送的请求是否响应
      orderArr:[], //订单列表
      showToast:false,
      toastMsg:""
    };
  },
  mounted(){
    this.getParams();
  },
  methods: {
    refreshData(){
      this.orderArr.length=0;
      this.showpage=1;
      this.showpage=10;
      this.getOrderList();
    },
    getParams(){
      let params = {};
      if(this.$route.params.value!=undefined){
        sessionStorage.setItem('orderlist_params',JSON.stringify(this.$route.params));
        params = this.$route.params;
      }else{
        params = JSON.parse(sessionStorage.getItem('orderlist_params'));
      }
      this.$set(this,"sValue",params.value);
      this.getOrderList();
    },
    getOrderList(){
      this.loading=true;
      this.requestIsBack = false;
      let params = {};
      if(this.sValue===0){
        params = {
          "page":this.showpage,
        	"size":this.pageSize
        }
      }else{
        params = {
          "page":this.showpage,
        	"size":this.pageSize,
          "status":this.sValue
        }
      }
      this.$http.post(this.GLOBAL.serverSrc + "rest/order/cutpage",params,{credentials: false})
                .then(function (response) {
                  if(response.data.code==="0000"){
                      this.requestIsBack = true;
                      this.pushData(response.data.data);
                      this.onScroll();
                  }else{

                  }
                })
              .catch(function (response) {
                  console.log("获取订单列表-请求错误：", response)
              });
    },
    pushData(msg){
      this.loading=false;
      let obj = msg;
      let len = obj.length;
      //返回的数据条数不足 this.pageSize，说明是最后一页了
      if(len<this.pageSize){
        this.nomore=true;
      }
      for(let i=0;i<len;i++){
        this.orderArr.push(obj[i]);
      }
    },
    getScrollTop(){
      let scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
      if(document.body){
        bodyScrollTop = document.body.scrollTop;
      }
      if(document.documentElement){
        documentScrollTop = document.documentElement.scrollTop;
      }
        scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
        return scrollTop;
    },
    getScrollHeight(){
      let scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
      if(document.body){
  　　　　bodyScrollHeight = document.body.scrollHeight;
  　　}
  　　if(document.documentElement){
  　　　　documentScrollHeight = document.documentElement.scrollHeight;
  　　}
  　　scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
  　　return scrollHeight;
    },
    getWindowHeight(){
    　　let windowHeight = 0;
    　　if(document.compatMode == "CSS1Compat"){
    　　　　windowHeight = document.documentElement.clientHeight;
    　　}else{
    　　　　windowHeight = document.body.clientHeight;
    　　}
    　　return windowHeight;
    },
    onScroll(){
      let _this = this;
      window.onscroll = function(){
        if(_this.requestIsBack){
          _this.addPages();
        }
      }
      // window.touchmove = function(){
      //   _this.addPages();
      //
      // }
    },
    addPages(){
      let _this = this;
      //下一页还有内容并且
      //滚动到页面的 0.7倍高度的时候请求下一页的数据
  　　if(this.nomore===false&&_this.getScrollTop() + _this.getWindowHeight() >= 0.7*(_this.getScrollHeight())){
  　　　　 _this.showpage++;
          _this.getOrderList();
  　　}
    },
    timeout(obj){
      obj.showTime = this.formatTime(obj.orderlimittime*1000);
      let s = parseInt(obj.orderlimittime);
      setTimeout(()=>{
        if((s-1)<0){
          obj.orderlimittime=0;
          obj.status=5;
          obj.statusinfo="交易关闭";
        }else{
          this.timeout(obj);
          obj.orderlimittime=s-1;
        }
        obj.showTime = this.formatTime(obj.orderlimittime*1000);
      },1000);
    },
    formatTime(ms){
      let m = parseInt((ms % (1000 * 60 * 60)) / (1000 * 60));
      let s = (ms % (1000 * 60)) / 1000;
      let minutes = m<10?"0"+m:m;
      let seconds = s<10?"0"+s:s;
      return minutes + " : " + seconds
    },
    showTips(msg){
      this.toastMsg=msg;
      this.showToast=true;
    },
    lookDetails(key,value){
      this.$router.push({ name: 'OrderDetails', params: { key: key,value: value}});
    },
    lookExpress(key,value){
      this.$router.push({ name: 'ExpressInfo', params: { key: key,value: value}});
    },
    reminding(id){
      this.showTips("提醒成功")
      // this.$http.get(this.GLOBAL.serverSrc + "rest/",{credentials: false})
      //           .then(function (response) {
      //             if(response.data.code==="0000"){
      //                 this.showTips(response.data.msg)
      //             }else{
      //                 this.showTips(response.data.msg)
      //             }
      //           })
      //         .catch(function (response) {
      //             console.log("提醒卖家-请求错误：", response)
      //         });
    },
    payNow(id){
      this.$http.get(this.GLOBAL.serverSrc + "rest/pay/orderid?orderid="+id,{credentials: false})
                .then(function (response) {
                  if(response.data.code==="0000"){
                      this.collet(response.data.data)
                  }else{
                      this.showTips(response.data.msg)
                  }
                })
              .catch(function (response) {
                  console.log("立即支付-请求错误：", response)
              });
    },
    collet(e){
        WeixinJSBridge.invoke('getBrandWCPayRequest', e ,function(res){
            WeixinJSBridge.log(res.err_msg);
            //alert(res.err_code + res.err_desc + res.err_msg);
            if(res.err_msg == "get_brand_wcpay_request:ok"){
                alert("支付成功！");
                this.refreshData();
            }else if(res.err_msg == "get_brand_wcpay_request:cancel"){
                alert("用户取消支付!");
            }else{
                alert(res.err_code+res.err_desc+res.err_msg);
                alert("支付失败!");
            }
        })
    },
    deleteOrder(id){
      this.$http.get(this.GLOBAL.serverSrc + "rest/order/deleteOrderId/"+id,{credentials: false})
                .then(function (response) {
                  if(response.data.code==="0000"){
                      this.showTips(response.data.msg);
                      this.refreshData();
                  }else{
                      this.showTips(response.data.msg)
                  }
                })
              .catch(function (response) {
                  console.log("删除订单-请求错误：", response)
              });
    },
    receiveProduct(id){
      this.$http.get(this.GLOBAL.serverSrc + "rest/order/receiveProduct/"+id,{credentials: false})
                .then(function (response) {
                  if(response.data.code==="0000"){
                      this.showTips(response.data.msg);
                      this.refreshData();
                  }else{
                      this.showTips(response.data.msg)
                  }
                })
              .catch(function (response) {
                  console.log("确认收货-请求错误：", response)
              });
    }
  }
}
</script>

<style scoped>
.order_list{
  font-size:.16rem;
  text-align: left;
  padding-bottom:.8rem;
}
.order_list .weui-cell{
  font-size:.14rem;
  padding:.13rem .2rem;
  color:#999999;
}

.orders{
  margin-bottom:.1rem;
}
.title{
  font-size: .13rem;
  font-weight: normal;
  line-height: .48rem;
  padding-left: .1rem;
  color:#000000;
  background-color: #ffffff;
}
.title.status1,
.title.status2,
.title.status3{
  color:#FF6600;
}
.title span{
  float: right;
  margin-right:.1rem;
  color:#999999;
}

.product{
  padding: .1rem;
  position: relative;
}
.product .img{
  position: absolute;
  width:.9rem;
  height:.9rem;
  background-color: #cccccc;
}
.product p{
  display: block;
  padding-left: 1rem;
  font-size: .12rem;
  margin-bottom: .06rem;
  color:#000000;
}
.product p.spec{
  width:3rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-right:.2rem;
  color:#999999;
}
.product .count{
  position: absolute;
  right: .16rem;
  bottom: .1rem;
}

.orders .btn{
  float: left;
  margin-left:.1rem;
  font-size: .14rem;
  padding: .04rem .06rem .02rem .06rem;
  color:#646464;
  background-color:#ffffff;
  border: 1px solid #cccccc;
  border-radius: 4px;
}
.orders .btn.pay_now{
  color:#ffffff;
  background-color:#FF6600;
  border-color:#FF6600;
}
.orders .btn.comfirm{
  color:#FF6600;
  border-color:#FF6600;
}

.nodata{
  text-align: center;
  padding: .3rem 0;
  font-size: .14rem;
  color:#999999;
}
.nomore{
  text-align: center;
  font-size:.12rem;
  padding: .1rem 0;
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
