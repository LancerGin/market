<!-- 提交订单前选择收货地址 -->
<template>
  <div class="choose_address">
    <div class="zz"></div>
    <div class="pan">
      <div class="head">
        <div class="title">选择收货地址</div>
        <div class="icon" v-on:click="cancel">
          <icon name="cancel"></icon>
        </div>
      </div>
      <div class="body">
        <cells type="radio">
          <label for="address1" class="weui_cell weui_check_label">
            <div class="weui_cell_hd"><slot>
              <i class="fa fa-pencil-square-o"></i>
            </slot></div>
            <div class="weui_cell_bd weui_cell_primary"><slot>
              <span class="people">收货人：谭帅&nbsp;&nbsp;&nbsp;&nbsp;13088094976</span><br>
              <span class="address">收货地址：四川省成都市新都区二台子保利紫荆</span>
            </slot></div>
            <div class="weui_cell_ft"><slot>
              <input type="radio" name="address" class="weui_check" id="address1" value="address1" v-model="picked">
              <span class="weui_icon_checked"></span>
            </slot></div>
          </label>
          <label for="address2" class="weui_cell weui_check_label">
            <div class="weui_cell_hd"><slot>
              <i class="fa fa-pencil-square-o"></i>
            </slot></div>
            <div class="weui_cell_bd weui_cell_primary"><slot>
              <span class="people">收货人：谭帅&nbsp;&nbsp;&nbsp;&nbsp;13088094976</span><br>
              <span class="address">收货地址：四川省成都市高新区新园南二路索贝数码科技股份有限公司</span>
            </slot></div>
            <div class="weui_cell_ft"><slot>
              <input type="radio" name="address" class="weui_check" id="address2" value="address2" v-model="picked">
              <span class="weui_icon_checked"></span>
            </slot></div>
          </label>
        </cells>
        <cells type="access">
          <link-cell link="javascript:void(0);" class="new" v-on:click.native="newAddress">
            <span slot="body"><i class="fa fa-plus-circle" aria-hidden="true"></i>新建地址</span>
            <span slot="footer"></span>
          </link-cell>
        </cells>
      </div>
    </div>

    <!-- 弹出新建收货地址的面板 开始-->
    <div class="newAddress_container" v-bind:class="{'show':newAddressBorn===true}">
      <NewAddress v-on:close-pannel="closeNewAddress" v-on:confirm="confirmNewAddress"></NewAddress>
    </div>
    <!-- 弹出新建收货地址的面板 结束-->
  </div>
</template>

<script>
import {Icon,CellsTitle, CellsTips,Cells, Cell, LinkCell} from 'vue-weui';
import NewAddress from '@/components/common/NewAddress.vue';

export default {
  name: 'ChooseAddress',
  props: {

  },
  data () {
    return {
      newAddressBorn:false,
      picked:""
    }
  },
  mounted(){
    this.renderField();
  },
  components: {
    Icon,
    CellsTitle,
    CellsTips,
    Cells,
    Cell,
    LinkCell,
    NewAddress
  },
  methods: {
    renderField(){

    },
    newAddress(){
      this.newAddressBorn=true;
      // this.$router.push({ name: 'NewAddress', params: { key: "fromOrderPage"}});
    },
    confirmNewAddress(msg){
      alert(msg)
      this.newAddressBorn=false;
    },
    closeNewAddress(){
      this.newAddressBorn=false;
    },
    cancel(){
      this.$emit('close-pannel');
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .choose_address{
    position: fixed;
    top:0;
    left:0;
    z-index: 20;
    width:100%;
    height:120%;
  }
  .zz{
    width:100%;
    height:120%;
    background-color: rgba(0,0,0,0.7);
  }
  .pan{
    width:100%;
    background-color:#ffffff;
    position: fixed;
    bottom:0;
    left:0;
    z-index: 30;
    font-size: .16rem;
    animation: DWONTOUP .4s;
  }
  @keyframes DWONTOUP
  {
      from {bottom: -3rem;}
      to {bottom: 0;}
  }
  .pan .head{
    width:100%;
    position: relative;
  }
  .pan .head .title{
    text-align: center;
    line-height:.42rem;
    font-size: 0.14rem;
    color:#333333;
  }
  .pan .head .icon{
    position: absolute;
    top:.06rem;
    right:.1rem;
    z-index: 40;
  }

  .pan .body{
    width:100%;
  }
  .pan .body .weui_cells{
    margin-top:0;
  }
  .pan .body .weui_cell_ft{
    min-width:.3rem;
  }
  .pan .body .people{
    font-size:.13rem;
    color:#000;
    padding-left: .2rem;
    margin-bottom: .06rem;
  }
  .pan .body .address{
    color:#999999;
    font-size:.11rem;
    padding-left: .2rem;
  }
  .pan .body .new{
    font-size:.13rem;
    line-height: .32rem;
  }
  .pan .body .new i.fa{
    color:#0078CE;
    margin-right:.1rem;
  }

  .newAddress_container{
    display: none;
  }
  .newAddress_container.show{
    display: block;
  }

</style>
