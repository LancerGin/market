<!-- 生成订单待提交 -->
<template>
  <div class="make_order" v-bind:class="{'noscroll':chooseAddressBorn===true}">
    <div class="receiving">
      <cells type="access">
        <link-cell link="javascript:void(0);" v-on:click.native="chooseAddress">
          <span v-if="address" slot="body">
            <i class="fa fa-map-marker" aria-hidden="true"></i>
            <span class="people">收货人：{{address.receivename}}&nbsp;&nbsp;&nbsp;&nbsp;{{address.tel}}</span><br>
            <span class="address">收货地址：{{address.province+address.city+address.addressinfo}}</span>
          </span>
          <span v-else slot="body">
            <i class="fa fa-plus-circle" aria-hidden="true"></i>
            <span class="noaddress">添加收货地址</span>
          </span>
          <span slot="footer"></span>
        </link-cell>
      </cells>
    </div>
    <div class="bags" v-for="(bag,index) in productArr">
      <h3 class="title"><i class="fa fa-shopping-bag"></i>商品{{index+1}}</h3>
      <div class="product">
        <div class="img">
          <img v-bind:src="bag.imgurl" alt="">
        </div>
        <p>{{bag.prodescribe}}</p>
        <p class="spec">规格：{{bag.profield?bag.profield:'默认'}} {{bag.spec}}</p>
        <p><span class="rmb">￥</span>{{bag.price}}</p>
        <div class="count">x{{bag.count}}</div>
      </div>
      <cells>
        <cell>
          <span slot="body">商品总额：</span>
          <span slot="footer"><span class="rmb">￥</span>{{bag.totalproprice}}</span>
        </cell>
        <cell>
          <span slot="body">运费：</span>
          <span slot="footer">+<span class="rmb">￥</span>{{bag.postage}}</span>
        </cell>
        <!-- <div class="coupon">
          <cells type="access">
            <link-cell link="javascript:void(0);">
              <span slot="body">优惠码</span>
              <span slot="footer"><span class="coupon_num">暂无可用</span></span>
            </link-cell>
          </cells>
        </div> -->
        <cell>
          <span slot="body">合计</span>
          <span slot="footer"><span class="rmb">￥</span>{{bag.totalprice}}</span>
        </cell>
      </cells>
    </div>

    <!-- <cells type="form" class="other">
      <div class="weui_cell remark">
        <div class="weui_cell_bd weui_cell_primary"><slot><span>买家留言：</span></slot></div>
        <div class="weui_cell_ft"><slot>
          <input type="text" name="remark" placeholder="给商家留言" v-model="remark" class="weui_input">
        </slot></div>
      </div>
      <div class="weui_cell weui_cell_switch">
        <div class="weui_cell_bd weui_cell_primary"><slot>短信通知收件人</slot></div>
        <div class="weui_cell_ft"><slot>
          <input type="checkbox" id="id" name="switch" class="weui_switch" v-model="switchOn">
        </slot></div>
      </div>
    </cells> -->

    <div class="submit">
      <div class="btn" v-on:click="comfirOrder">提交订单</div>
      <div class="total_final">合计: <span><span class="rmb">￥</span>{{cashCount}}</span></div>
    </div>

    <!-- 弹出选择收货地址的面板 开始-->
    <div class="chooseAddress_container" v-bind:class="{'show':chooseAddressBorn===true}">
      <ChooseAddress v-on:close-pannel="close" v-on:change-address="changeAddress"></ChooseAddress>
    </div>
    <!-- 弹出选择收货地址的面板 结束-->

    <loading :show="loading"></loading>
    <!-- 信息提示 -->
    <toast v-model="showToast" type="text" :time="1500" is-show-mask :text="toastMsg" :position="'middle'"></toast>
  </div>
</template>

<script>
  import {CellsTitle, CellsTips,Cells, Cell, LinkCell} from 'vue-weui';
  import { Loading,Toast } from 'vux';
  import ChooseAddress from '@/components/order/ChooseAddress.vue';

  export default {
    name: 'MakeOrder',
    data () {
      return {
        loading:false,
        orderid:'',
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
    created(){
      this.getParams();
    },
    components: {
      CellsTitle,
      CellsTips,
      Cells,
      Cell,
      LinkCell,
      ChooseAddress,
      Toast,
      Loading
    },
    methods: {
      getParams(){
        let params = {};
        if(this.$route.params.value){
          sessionStorage.setItem('order_params',JSON.stringify(this.$route.params));
          params = this.$route.params;
        }else{
          params = JSON.parse(sessionStorage.getItem('order_params'));
        }
        this.$set(this,"orderid",params.value);
        this.getOrderData();
      },
      getOrderData(){
        this.loading = true;
        this.$http.get(this.GLOBAL.serverSrc + "rest/shopcar/orderInfo/"+this.orderid,
        {credentials: false})
                  .then(function (response) {
                    this.loading = false;
                    if(response.data.code==="0000"){
                        this.formatData(response.data.data);
                    }else{
                        this.showTips(response.data.msg);
                    }
                  })
                .catch(function (response) {
                    console.log("获取订单信息-请求错误：", response)
                });
      },
      formatData(obj){
        let arr = obj.products;
        let newArr =[];
        for(let i=0;i<arr.length;i++){
          newArr.push({
            proid:arr[i].proid,
            imgurl:arr[i].keyfrom,
            shopcartid:arr[i].shopcarid,
            profield:arr[i].profield,
            spec:arr[i].spec,
            prodescribe:arr[i].prodescribe,
            price:arr[i].price,
            postage:arr[i].freight, //运费
            checked:false,
            count:arr[i].number,
            totalproprice:(parseFloat(arr[i].price)*(arr[i].number)).toFixed(2),//商品总额
            totalprice:(parseFloat(arr[i].price)*(arr[i].number)+parseFloat(arr[i].freight)).toFixed(2),//合计
            min:1,
            max:99
          });
        }
        this.$set(this,"productArr",newArr);
        this.$set(this,"cashCount",obj.cashCount);
        this.$set(this,"address",obj.address);
      },
      comfirOrder(){
        this.loading = true;
        this.$http.post(this.GLOBAL.serverSrc + "rest/order/addOrder",{
          "out_trade_no":this.orderid,
        	"payentrance":"1",
        	"address":{
        		"addressinfo":this.address.province+this.address.city+this.address.addressinfo,
        		"receivename":this.address.receivename,
        		"tel":this.address.tel
        	}
        },{credentials: false})
                  .then(function (response) {
                    this.loading = false;
                    if(response.data.code==="0000"){
                        this.collet(response.data.data);
                    }else{
                        this.showTips(response.data.msg);
                    }
                  })
                .catch(function (response) {
                    console.log("提交订单-请求错误：", response)
                });
      },
      collet(e){
          let _this = this;
          WeixinJSBridge.invoke('getBrandWCPayRequest', e ,function(res){
              WeixinJSBridge.log(res.err_msg);
              //alert(res.err_code + res.err_desc + res.err_msg);
              if(res.err_msg == "get_brand_wcpay_request:ok"){
                  alert("支付成功！");
                  //跳转到订单列表页，并查询所有订单
                  _this.$router.push({ name: 'OrderList', params: { key: "all",value: 0}});
              }else if(res.err_msg == "get_brand_wcpay_request:cancel"){
                  alert("用户取消支付!");
                  //跳转到订单列表页，并查询未付款订单
                  _this.$router.push({ name: 'OrderList', params: { key: "wait_pay",value: 1}});
              }else{
                  alert(res.err_code+res.err_desc+res.err_msg);
                  alert("支付失败!");
                  //跳转到订单列表页，并查询未付款订单
                  _this.$router.push({ name: 'OrderList', params: { key: "wait_pay",value: 1}});
              }

          })
      },
      chooseAddress(){
        this.chooseAddressBorn=true;
      },
      changeAddress(msg){
        this.changeDefaultAddress(this.address.addressid,msg.addressid);
        setTimeout(()=>{
          this.$set(this,"address",msg);
        },2);
      },
      changeDefaultAddress(oldid,newid){
        this.$http.post(this.GLOBAL.serverSrc + "rest/address/update/status",{
          "newaddressid":newid,
        	"oldaddressid":oldid
        },{credentials: false})
                  .then(function (response) {
                    if(response.data.code==="0000"){
                        this.showTips(response.data.msg)
                    }else{
                        this.showTips(response.data.msg)
                    }
                  })
                .catch(function (response) {
                    console.log("更改默认地址-请求错误：", response)
                });
      },
      showTips(msg){
        this.toastMsg=msg;
        this.showToast=true;
      },
      close(){
        this.chooseAddressBorn=false;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .make_order{
    padding-bottom:.6rem;
    text-align: left;
    font-size:.13rem;
    color:#000;
  }
  .make_order.noscroll{
    position: fixed;
    width:100%;
  }
  .weui_cells{
    margin-top:0;
    font-size:.13rem;
  }
  .weui_cells::before,
  .weui_cells::after{
    border: none;
  }
  .weui_cell_primary span{
    color:#000;
  }
  span.rmb{
    font-size: .11rem;
  }

  .receiving{
    width:100%;
    position: relative;
  }
  .receiving .weui_cells{
    padding: .1rem 0;
    background-color: #f2f2f2;
  }
  .receiving .people{
    font-size:.13rem;
    color:#000;
    padding-left: .2rem;
    margin-bottom: .06rem;
  }
  .receiving .address{
    color:#999999;
    font-size:.11rem;
    padding-left: .2rem;
  }
  .receiving .fa-map-marker{
    position: absolute;
    top: 24px;
    left: .1rem;
    font-size:.2rem;
    color:#646464;
  }
  .receiving .noaddress{
    font-size:.13rem;
    color:#000;
    padding-left: .2rem;
  }

  .bags{
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
  .title .fa{
    color:#646464;
    margin-right: .1rem;
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
    color:#999999;
  }
  .product .count{
    position: absolute;
    right: .16rem;
    bottom: .1rem;
  }

  .coupon .weui_cells{
    margin-top:0;
    margin-bottom: .1rem;
  }

  .other{
    margin-top: .1rem;
    margin-bottom: .7rem;
  }
  .remark{
    margin-top:.1rem;
    margin-bottom:.1rem;
  }
  .remark .weui_input{
    font-size: .12rem;
  }
  .remark .weui_cell_ft{
    flex-grow: 1;
  }

  .submit{
    width:100%;
    height:.5rem;
    line-height:.5rem;
    position: fixed;
    bottom:0;
    left:0;
    z-index:3;
    background-color:#ffffff;
    border-top:1px solid #f2f2f2;
    font-size:.16rem;
  }
  .submit div{
    float: right;
  }
  .submit .btn{
    width:1.2rem;
    margin-left: .1rem;
    text-align: center;
    background-color:#99CC99;
    color:#ffffff;
  }
  .submit .total_final{
    color:#646464;
  }
  .submit .total_final span{
    color:#99CC99;
  }

  .chooseAddress_container{
    display: none;
  }
  .chooseAddress_container.show{
    display: block;
  }

</style>
