<!-- 订单详情 -->
<template>
  <div class="order_details" v-if="order">
    <div v-if="order.status===1" class="progress">
      <p>待付款<b v-bind="timeout(order)">( {{order.showTime}} )</b><span>超时未付款，订单将自动取消</span></p>
    </div>
    <div v-else-if="order.status===2" class="progress">
      <p>商家已接单</p>
      <div class="flow">
        <flow>
          <flow-state state="1" title="买家已付款" is-done></flow-state>
          <flow-line is-done></flow-line>

          <flow-state state="2" is-done>
            <span slot="title">商家已接单</span>
          </flow-state>
          <flow-line tip="待发货"></flow-line>

          <flow-state state="3" title="待收货"></flow-state>
          <flow-line></flow-line>

          <flow-state state="4" title="交易完成"></flow-state>
        </flow>
      </div>
    </div>
    <div v-else-if="order.status===3" class="progress">
      <p>待收货</p>
      <div class="flow">
        <flow>
          <flow-state state="1" title="买家已付款" is-done></flow-state>
          <flow-line is-done></flow-line>

          <flow-state state="2" title="商家已接单" is-done></flow-state>
          <flow-line is-done></flow-line>

          <flow-state state="3" is-done>
            <span slot="title">已发货</span>
          </flow-state>
          <flow-line tip="待收货"></flow-line>

          <flow-state state="4" title="交易完成"></flow-state>
        </flow>
      </div>
    </div>
    <div v-else-if="order.status===5" class="progress">
      <p>已完成</p>
      <div class="flow">
        <flow>
          <flow-state state="1" title="买家已付款" is-done></flow-state>
          <flow-line is-done></flow-line>

          <flow-state state="2" title="商家已接单" is-done></flow-state>
          <flow-line is-done></flow-line>

          <flow-state state="3" title="已发货" is-done></flow-state>
          <flow-line is-done></flow-line>

          <flow-state state="4" title="交易完成" is-done></flow-state>
        </flow>
      </div>
    </div>
    <div v-else-if="order.status===5" class="progress">
      <p class="close">交易关闭 <span>超时关闭，订单自动取消</span></p>
    </div>
    <div class="receiving">
      <i class="fa fa-map-marker" aria-hidden="true"></i>
      <span class="people">收货人：{{order.receivename}}&nbsp;&nbsp;&nbsp;&nbsp;{{order.tel}}</span><br>
      <span class="address">收货地址：{{order.address}}</span>
    </div>

    <div class="bags">
      <h3 class="title">
        <i class="fa fa-shopping-bag"></i>包裹1
        <span v-if="order.status===3" style="float: right;margin-right:.1rem;color:#FF6600;">运输中</span>
        <span v-else-if="order.status===4" style="float: right;margin-right:.1rem;">已签收</span>
      </h3>
      <div class="product">
        <div class="img">
          <img v-bind:src="order.productinfo.img" alt="">
        </div>
        <p>{{order.productinfo.prodescribe}}</p>
        <p class="spec">规格：{{order.productinfo.profield?order.productinfo.profield:'默认'}} {{order.productinfo.spec}}</p>
        <p><span class="rmb">￥</span>{{order.price}}</p>
        <div class="count">x{{order.number}}</div>
      </div>
      <group class="totalprice">
        <cell title="商品总额:"><span class="rmb">￥</span>{{order.paycash}}</cell>
        <cell title="运费:">+<span class="rmb">￥</span>{{order.freight}}</cell>
      </group>
    </div>

    <group>
      <cell class="remark" title="买家留言:"><p>{{order.remarks}}</p></cell>
    </group>
    <group class="priceinfo">
      <cell title="总计:"><span class="rmb">￥</span>{{order.paycash}}</cell>
      <cell title="付款方式:">微信支付</cell>
      <cell title="实付金额:"><b class="orange"><span class="rmb">￥</span>{{order.paycash}}</b></cell>
    </group>

    <group class="orderinfo">
      <cell title="订单编号:">{{order.orderid}}</cell>
      <cell title="创建时间:">{{order.createtime}}</cell>
      <cell v-if="order.paytime" title="付款时间:">{{order.paytime}}</cell>
    </group>

    <div class="dos">
      <group>
        <cell v-if="order.status===1"><div class="btn pay_now" v-on:click="payNow(order.orderid)">立即付款</div></cell>
        <cell v-else-if="order.status===2"><div class="btn alarm" v-on:click="reminding(order.orderid)">提醒卖家</div></cell>
        <cell v-else-if="order.status===3"><div class="btn lookex" v-on:click="lookExpress('fromDetails',order)">查看物流</div><div class="btn comfirm" v-on:click="receiveProduct(order.orderid)">确认收货</div></cell>
        <cell v-else-if="order.status===4"><div class="btn lookex" v-on:click="lookExpress('fromDetails',order)">查看物流</div><div class="btn delete" v-on:click="deleteOrder(order.orderid)">删除</div></cell>
        <cell v-else-if="order.status===5"><div class="btn delete" v-on:click="deleteOrder(order.orderid)">删除</div></cell>
      </group>
    </div>
    <!-- 信息提示 -->
    <toast v-model="showToast" type="text" :time="1500" is-show-mask :text="toastMsg" :position="'middle'"></toast>
  </div>
</template>

<script>
  import { Group,Cell,Toast,Flow, FlowState, FlowLine } from 'vux'

  export default {
    name: 'OrderDetails',
    components: {
      Group,
      Cell,
      Toast,
      Flow,
      FlowState,
      FlowLine
    },
    data () {
      return {
        order:undefined,
        productArr:[], //商品列表
        remark:"", //留言
        switchOn:false, //短信通知
        cashCount:0,//总价
        address:{},//地址
        chooseAddressBorn:false,
        showToast:false,
        toastMsg:""
      }
    },
    mounted(){
      this.getParams();
    },
    methods: {
      getParams(){
        let params = {};
        if(this.$route.params.value){
          sessionStorage.setItem('orderdetails_params',JSON.stringify(this.$route.params));
          params = this.$route.params;
        }else{
          params = JSON.parse(sessionStorage.getItem('orderdetails_params'));
        }
        this.$set(this,"order",params.value);
      },
      formatData(obj){
        let arr = obj.products;
        let newArr =[];
        let otherprice = 10;//运费10元
        for(let i=0;i<arr.length;i++){
          newArr.push({
            proid:arr[i].proid,
            imgurl:arr[i].keyfrom,
            shopcartid:arr[i].shopcarid,
            profield:arr[i].profield,
            spec:arr[i].spec,
            prodescribe:arr[i].prodescribe,
            price:arr[i].price,
            checked:false,
            count:arr[i].number,
            totalproprice:(parseFloat(arr[i].price)*(arr[i].number)).toFixed(2),//商品总额
            otherprice:otherprice.toFixed(2),  //运费
            totalprice:(parseFloat(arr[i].price)*(arr[i].number)+otherprice).toFixed(2),//合计
            min:1,
            max:99
          });
        }
        this.$set(this,"productArr",newArr);
        this.$set(this,"cashCount",obj.cashCount);
        this.$set(this,"address",obj.address);
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
      lookExpress(key,value){
        this.$router.push({ name: 'ExpressInfo', params: { key: key,value: value}});
      },
      reminding(id){
        this.showTips("提醒成功");
        this.lookList('all',0);
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
                  this.lookList('all',0);
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
                        this.lookList('all',0);
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
                        this.lookList('all',0);
                    }else{
                        this.showTips(response.data.msg)
                    }
                  })
                .catch(function (response) {
                    console.log("确认收货-请求错误：", response)
                });
      },
      lookList(key,value){
        this.$router.push({ name: 'OrderList', params: { key: key,value: value}});
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .order_details{
    text-align: left;
    font-size:.14rem;
    color:#000;
    margin-bottom: .6rem;
  }
  .order_details .totalprice .weui-cells{
    margin-top:0;
  }
  .order_details .weui-cells{
    font-size:.14rem;
  }
  .order_details span.rmb{
    font-size: .11rem;
  }
  .order_details .progress{
    width:100%;
  }
  .order_details .progress>p{
    width:100%;
    height:.4rem;
    line-height:.4rem;
    padding-left: .1rem;
    font-size:.14rem;
    color:#ffffff;
    background-color: #F95555;
  }
  .order_details .progress>p.close{
    background-color: #999999;
  }
  .order_details .progress b{
    margin:0 .04rem;
  }
  .order_details .progress span{
    font-size:.12rem;
    margin-left:.16rem;
  }

  .order_details .receiving{
    width:100%;
    position: relative;
    padding: .1rem .2rem;
    background-color: #ffffff;
    border-top:1px solid #cccccc;
    margin-bottom:.1rem;
  }
  .order_details .receiving .people{
    font-size:.13rem;
    color:#000;
    padding-left: .2rem;
    margin-bottom: .06rem;
  }
  .order_details .receiving .address{
    color:#999999;
    font-size:.11rem;
    padding-left: .2rem;
  }
  .order_details .receiving .fa-map-marker{
    position: absolute;
    top: 24px;
    left: .1rem;
    font-size:.2rem;
    color:#646464;
  }

  .order_details .bags{
    margin-bottom:.1rem;
  }
  .order_details .title{
    font-size: .13rem;
    font-weight: normal;
    line-height: .48rem;
    padding-left: .1rem;
    color:#000000;
    background-color: #ffffff;
  }
  .order_details .title .fa{
    color:#646464;
    margin-right: .1rem;
  }

  .order_details .product{
    padding: .1rem;
    position: relative;
  }
  .order_details .product .img{
    position: absolute;
    width:.9rem;
    height:.9rem;
    background-color: #cccccc;
  }
  .order_details .product p{
    display: block;
    padding-left: 1rem;
    font-size: .12rem;
    margin-bottom: .06rem;
    color:#000000;
  }
  .order_details .product p.spec{
    color:#999999;
  }
  .order_details .product .count{
    position: absolute;
    right: .16rem;
    bottom: .1rem;
  }

  .order_details .remark{
    margin-top:.06rem;
    margin-bottom:.06rem;
  }
  .order_details .remark .weui-cell__ft{
    width:2rem;
    text-align: left;
    flex-grow: 1;
  }
  .order_details .remark .weui-cell__ft p{
    width:100%;
    line-height: .2rem;
    overflow: hidden;
    font-size: .13rem;
  }
  .order_details .priceinfo .weui-cells{
    margin-top:0;
  }
  .order_details .priceinfo .weui-cells::before,
  .order_details .priceinfo .weui-cell::before{
    border:none;
  }
  .order_details .priceinfo .orange{
    color:#FF6600;
  }

  .order_details .orderinfo .weui-cells::before,
  .order_details .orderinfo .weui-cell::before{
    border:none;
  }
  .order_details .orderinfo .weui-cell__ft{
    width:2rem;
    text-align: left;
    flex-grow: 1;
  }

  .order_details .dos .weui-cells{
    margin-top:0;
  }
  .order_details .dos .weui-cells::before,
  .order_details .dos .weui-cells::after,
  .order_details .dos .weui-cell::before{
    border:none;
  }
  .order_details .dos{
    width:100%;
    height:.5rem;
    line-height:.5rem;
    position: fixed;
    bottom:0;
    left:0;
    z-index:30;
    background-color:#ffffff;
    border-top:1px solid #f2f2f2;
    font-size:.16rem;
  }
  .order_details .dos .btn{
    float: left;
    margin-left:.1rem;
    font-size: .14rem;
    padding: .04rem .06rem .02rem .06rem;
    color:#646464;
    background-color:#ffffff;
    border: 1px solid #cccccc;
    border-radius: 4px;
  }
  .order_details .dos .btn.pay_now{
    color:#ffffff;
    background-color:#FF6600;
    border-color:#FF6600;
  }
  .order_details .dos .btn.comfirm{
    color:#FF6600;
    border-color:#FF6600;
  }


</style>
