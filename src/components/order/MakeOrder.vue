<!-- 生成订单待提交 -->
<template>
  <div class="make_order">
    <div class="receiving">
      <cells type="access">
        <link-cell link="javascript:void(0);" v-on:click.native="chooseAddress">
          <span slot="body">
            <i class="fa fa-map-marker" aria-hidden="true"></i>
            <span class="people">收货人：谭帅&nbsp;&nbsp;&nbsp;&nbsp;13088094976</span><br>
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
      <p class="spec">规格：红色 m</p>
      <p><span class="rmb">￥</span>160.00</p>
      <div class="count">x3</div>
    </div>
    <cells>
      <cell>
        <span slot="body">配送方式</span>
        <span slot="footer">普通快递：+<span class="rmb">￥</span>10.00</span>
      </cell>
      <div class="weui_cell remark">
        <div class="weui_cell_bd weui_cell_primary"><slot><span>买家留言：</span></slot></div>
        <div class="weui_cell_ft"><slot>
          <input type="text" name="remark" placeholder="给商家留言" v-model="remark" class="weui_input">
        </slot></div>
      </div>
      <cell>
        <span slot="body">合计</span>
        <span slot="footer"><span class="rmb">￥</span>160.00</span>
      </cell>
    </cells>
    <div class="coupon">
      <cells type="access">
        <link-cell link="javascript:void(0);" v-on:click.native="chooseAddress">
          <span slot="body">优惠码</span>
          <span slot="footer"><span class="coupon_num">023654211555455</span></span>
        </link-cell>
      </cells>
    </div>
    <cells type="form">
      <div class="weui_cell weui_cell_switch">
        <div class="weui_cell_bd weui_cell_primary"><slot>短信通知收件人</slot></div>
        <div class="weui_cell_ft"><slot>
          <input type="checkbox" id="id" name="switch" class="weui_switch" v-model="switchOn">
        </slot></div>
      </div>
    </cells>
    <div class="info">
      <div>
        <span class="lf">商品金额</span><span><span class="rmb">￥</span>160</span>
      </div>
      <div>
        <span class="lf">运费</span><span>+<span class="rmb">￥</span>20</span>
      </div>
      <div>
        <span class="lf">优惠码</span><span>-<span class="rmb">￥</span>10</span>
      </div>
    </div>
    <div class="submit">
      <div class="btn">提交订单</div>
      <div class="total_final">合计: <span><span class="rmb">￥</span>170.00</span></div>
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
    font-size:.13rem;
    color:#000;
  }
  .weui_cells{
    margin-top:0;
    font-size:.13rem;
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
    margin-right: .06rem;
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
    margin-top:.1rem;
    margin-bottom: .1rem;
  }
  .remark .weui_input{
    font-size: .12rem;
  }
  .remark .weui_cell_ft{
    flex-grow: 1;
  }

  .info{
    background-color: #ffffff;
    padding: .2rem .1rem;
    margin-top: .1rem;
    margin-bottom: .5rem;
  }
  .info>div{
    display: -webkit-flex; /* Safari */
    display: flex;
  }
  .info>div span{
    color:#000;
  }
  .info>div .lf{
    flex: 1;
  }

  .submit{
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

</style>
