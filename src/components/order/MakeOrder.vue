<!-- 生成订单待提交 -->
<template>
  <div class="make_order">
    <div class="receiving">
      <cells type="access">
        <link-cell link="javascript:void(0);" v-on:click.native="chooseAddress">
          <span slot="body">
            <i class="fa fa-map-marker" aria-hidden="true"></i>
            <span class="people"></span>收货人：谭帅&nbsp;&nbsp;&nbsp;&nbsp;13088094976<br>
            <span class="address">收货地址：四川省成都市新都区二台子保利紫荆</span>
          </span>
          <span slot="footer"></span>
        </link-cell>
      </cells>
    </div>
    <h3 class="title"><i class="fa fa-shopping-bag"></i> 潮流设计小店</h3>
    <div class="product">
      <div class="img">
        <img src="" alt="">
      </div>
      <p>连衣裙套装井口了群套装井口了群套装井口了群套装</p>
      <p>规格：红色 m</p>
      <p><span>￥</span>50.00</p>
      <div class="count">x3</div>
    </div>
    <cells>
      <cell>
        <span slot="body">配送方式</span>
        <span slot="footer">普通快递：+￥10.00</span>
      </cell>
    </cells>
    <cells type="form">
      <input-cell type="text" label="买家留言：" placeholder="给商家留言" :value.sync="remark"></input-cell>
    </cells>
    <div class="remark">
      买家留言：
      <input type="text" name="remark" placeholder="给商家留言" v-model="remark" class="weui_input">
    </div>
    <cells>
      <cell>
        <span slot="body">合计</span>
        <span slot="footer">￥160.00</span>
      </cell>
    </cells>
    <div class="coupon">
      <cells type="access">
        <link-cell link="javascript:void(0);" v-on:click.native="chooseAddress">
          <span slot="body">优惠码<span class="coupon_num">023654211555455</span></span>
          <span slot="footer"></span>
        </link-cell>
      </cells>
    </div>
    <cells type="form">
      <switch-cell name="switch" label="短信通知收件人" :on.sync="switchOn"></switch-cell>
    </cells>
    <div class="info">
      <span>商品金额</span><span>￥150</span>
      <span>运费</span><span>+￥10</span>
      <span>优惠码</span><span>-￥10</span>
    </div>
    <div class="submit">
      <div class="btn">提交订单</div>
      <div class="total_final">合计: <span>160.00</span></div>
    </div>
  </div>
</template>

<script>
  import {CellsTitle, CellsTips,Cells, Cell, LinkCell} from 'vue-weui';

  export default {
    name: 'MakeOrder',
    data () {
      return {
        orderObj:{}
      }
    },
    mounted(){
      // this.getParams();
    },
    components: {
      CellsTitle,
      CellsTips,
      Cells,
      Cell,
      LinkCell
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
        this.$set(this,"orderObj",params.value);
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .make_order{
    text-align: left;
    font-size:.14rem;
  }
  .receiving{
    width:100%;
    height:.8rem;
    position: relative;
  }
  .receiving .people{
    padding-left: .2rem;
  }
  .receiving .address{
    font-size:.12rem;
    padding-left: .2rem;
  }
  .receiving .fa-map-marker{
    position: absolute;
    top: .2rem;
    left: .1rem;
    font-size:.2rem;
  }

  .title{
    font-size: .14rem;
    padding-left: .1rem;
  }
  .title .fa{
    margin-right: .06rem;
  }

  .submit{
    width:100%;
    height:.4rem;
    line-height:.4rem;
    position: fixed;
    bottom:0;
    left:0;
    z-index:30;
    background-color:#ffffff;
    font-size:.16rem;
  }
  .submit div{
    float: right;
  }
  .submit .btn{
    width:.8rem;
    background-color:#646464;
    color:#ffffff;
  }
  .submit .total_final{
    color:#646464;
  }
  .submit .total_final span{
    color:#99CC99;
  }

</style>
