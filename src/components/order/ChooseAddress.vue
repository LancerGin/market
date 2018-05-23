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
        <div class="ul">
          <cells type="radio">
            <label v-bind:for="'address'+index" class="weui_cell weui_check_label" v-for="(address,index) in addressArr">
              <div class="weui_cell_hd" v-on:click.stop.prevent="editAddress(address.addressid)"><slot>
                <i class="fa fa-pencil-square-o"></i>
              </slot></div>
              <div class="weui_cell_bd weui_cell_primary"><slot>
                <span class="people">收货人：{{address.receivename}}&nbsp;&nbsp;&nbsp;&nbsp;{{address.tel}}</span><br>
                <span class="address">收货地址：{{address.province+address.city+address.addressinfo}}</span>
              </slot></div>
              <div class="weui_cell_ft"><slot>
                <input type="radio" name="address" class="weui_check" v-bind:id="'address'+index" v-bind:value="address.addressid" v-model="picked">
                <span class="weui_icon_checked"></span>
              </slot></div>
            </label>
          </cells>
        </div>
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
    <!-- 弹出编辑收货地址的面板 开始-->
    <div class="editAddress_container" v-bind:class="{'show':editAddressBorn===true}">
      <EditAddress v-bind:addressid="editAddressid" v-on:close-pannel="closeEditAddress" v-on:confirm="confirmEditAddress"></EditAddress>
    </div>
    <!-- 弹出编辑收货地址的面板 结束-->

    <!-- 信息提示 -->
    <toast v-model="showToast" type="text" :time="1500" is-show-mask :text="toastMsg" :position="'middle'"></toast>
  </div>
</template>

<script>
import {Icon,CellsTitle, CellsTips,Cells, Cell, LinkCell} from 'vue-weui';
import { Toast } from 'vux';
import NewAddress from '@/components/common/NewAddress.vue';
import EditAddress from '@/components/common/EditAddress.vue';

export default {
  name: 'ChooseAddress',
  props: {

  },
  data () {
    return {
      newAddressBorn:false,
      editAddressBorn:false,
      addressArr:[],
      address:{},
      picked:"",
      editAddressid:"",
      showToast:false,
      toastMsg:""
    }
  },
  watch:{
    picked:function(val){
      let arr = this.addressArr;
      for(let i=0;i<arr.length;i++){
        if(arr[i].addressid===val){
          this.$set(this,"address",arr[i]);
        }
      }
      this.$emit('change-address',this.address);
      this.cancel();
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
    Toast,
    NewAddress,
    EditAddress
  },
  methods: {
    renderField(){
      this.getAddressData();
    },
    getAddressData(){
      this.$http.get(this.GLOBAL.serverSrc + "rest/address/search",{credentials: false})
                .then(function (response) {
                  if(response.data.code==="0000"){
                      this.$set(this,"addressArr",response.data.data);
                  }else{
                      alert(response.data.msg)
                  }
                })
              .catch(function (response) {
                  console.log("获取收货地址列表-请求错误：", response)
              });
    },
    newAddress(){
      this.newAddressBorn=true;
      // this.$router.push({ name: 'NewAddress', params: { key: "fromOrderPage"}});
    },
    confirmNewAddress(msg){
      this.toastMsg=msg;
      this.showToast=true;
      this.getAddressData();
      this.newAddressBorn=false;
    },
    closeNewAddress(){
      this.newAddressBorn=false;
    },
    editAddress(addressid){
      this.editAddressid=addressid;
      this.editAddressBorn=true;
    },
    confirmEditAddress(msg){
      this.toastMsg=msg;
      this.showToast=true;
      this.getAddressData();
      this.editAddressBorn=false;
    },
    closeEditAddress(){
      this.editAddressBorn=false;
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
  .pan .body .ul{
    height:2rem;
    overflow: auto;
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

  .editAddress_container{
    display: none;
  }
  .editAddress_container.show{
    display: block;
  }

</style>
