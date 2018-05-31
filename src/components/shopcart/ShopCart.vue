<!-- 购物车 -->
<template>
  <div class="shop_cart">
      <div class="head">
        <cells type="checkbox">
          <label for="checkall1" class="weui_cell weui_check_label">
            <div class="weui_cell_hd" v-on:click="checkAll()"><slot>
              <input type="checkbox" name="checkall" class="weui_check" id="checkall1" true-value="yes" false-value="no" v-model="checkall">
              <span class="weui_icon_checked"></span>
            </slot></div>
            <div class="weui_cell_bd weui_cell_primary"><slot>
              <h3 class="title"><i class="fa fa-shopping-bag"></i>潮流设计小店</h3>
            </slot></div>
            <div class="weui_cell_ft"><slot>
              <span v-if="canedit===false" v-on:click.stop.prevent="edit">编辑</span>
              <span v-else-if="canedit===true" v-on:click.stop.prevent="finish">完成</span>
            </slot></div>
          </label>
        </cells>
      </div>
      <div class="body">
        <cells type="checkbox">
          <div v-for="(item,index) in productArr" class="cc">
            <label v-bind:for="item.shopcartid" class="weui_cell weui_check_label">
              <div v-if="item.prostatus===1" class="weui_cell_hd" v-on:click="toggleCheck(item)"><slot>
                <input type="checkbox" name="item.shopcartid" class="weui_check" id="item.shopcartid" v-bind:value="item.shopcartid" v-bind:checked="item.checked">
                <span class="weui_icon_checked"></span>
              </slot></div>
              <div v-else class="weui_cell_hd"><slot>
                <span class="statusinfo">{{item.statusinfo}}</span>
              </slot></div>
              <div class="weui_cell_bd weui_cell_primary"><slot>
                <div class="product" v-bind:class="{'change_num':canedit===true}">
                  <div class="img">
                    <img v-bind:src="item.imgurl" alt="">
                  </div>
                  <div class="det">
                    <p class="describe">{{item.prodescribe}}</p>
                    <p class="spec">{{item.profield}} {{item.spec}}</p>
                    <p class="price"><span class="rmb">￥</span>{{item.price}}</p>
                  </div>
                  <div class="count">x{{item.count}}</div>
                  <div v-if="item.prostatus===1" class="count_dos">
                    <div class="reduce" v-bind:class="{'not_allowed':item.min===item.count}" v-on:click.stop.prevent="reduceCount(item)">-</div>
                    <input type="number" name="count" v-model="item.count" readonly>
                    <div class="add" v-bind:class="{'not_allowed':item.max===item.count}" v-on:click.stop.prevent="addCount(item)">+</div>
                  </div>
                  <div v-else class="count_dos">
                    <span>{{item.statusinfo}}</span>
                  </div>
                  <div class="delete_btn" v-on:click.stop.prevent="removepro(item.shopcartid,index)">删除</div>
                </div>
              </slot></div>
            </label>
          </div>
        </cells>
      </div>
      <div class="foot">
        <cells type="checkbox">
          <label for="checkall2" class="weui_cell weui_check_label">
            <div class="weui_cell_hd" v-on:click="checkAll()"><slot>
              <input type="checkbox" name="checkall2" class="weui_check" id="checkall2" true-value="yes" false-value="no" v-model="checkall">
              <span class="weui_icon_checked"></span>
              <span class="title">全选</span>
            </slot></div>
            <div class="weui_cell_bd weui_cell_primary"><slot>
              <div class="info">
                <p>合计：<span>{{totalprice}}</span></p>
                <p>含运费：￥{{postage}}</p>
              </div>
            </slot></div>
            <div class="weui_cell_ft"><slot>
              <div class="btn"  v-on:click.stop.prevent="settleAccounts">
                结算({{totalnum}})
              </div>
            </slot></div>
          </label>
        </cells>
      </div>
      <!-- 信息提示 -->
      <toast v-model="showToast" type="text" :time="1500" is-show-mask :text="toastMsg" :position="'middle'"></toast>
      <loading :show="loading"></loading>
  </div>
</template>

<script>
import {Icon,CellsTitle, CellsTips,Cells, Cell, LinkCell} from 'vue-weui';
import { Toast,Loading } from 'vux';

export default {
  name: 'ShopCart',
  props: {

  },
  data () {
    return {
      loading:false,
      page:"1",
      size:"20",
      canedit:false,
      checkall:'no',
      checkedArr:[],
      productArr:[],
      totalnum:0,
      totalprice:"0.00",
      postage:"0.00",
      showToast:false,
      toastMsg:""
    }
  },
  computed:{
    allchecked: function () {
      return this.checkall==="yes"
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
    Loading
  },
  methods: {
    renderField(){
      this.loading=true;
      this.$http.get(this.GLOBAL.serverSrc + "rest/shopcar/search"+
      "?size="+this.size+"&page="+this.page,
      {credentials: false})
                .then(function (response) {
                  this.loading=false;
                  if(response.data.code==="0000"){
                      this.formatData(response.data.data);
                  }else{
                      alert(response.data.msg)
                  }
                })
              .catch(function (response) {
                  console.log("获取购物车信息-请求错误：", response)
              });
    },
    formatData(arr){
      let newArr =[];
      for(let i=0;i<arr.length;i++){
        newArr.push({
          proid:arr[i].proid,
          imgurl:arr[i].keyfrom,
          shopcartid:arr[i].shopcarid,
          profield:arr[i].profield?arr[i].profield:"默认",
          spec:arr[i].spec,
          prodescribe:arr[i].prodescribe,
          price:arr[i].price,
          postage:arr[i].freight,
          checked:false,
          count:arr[i].number,
          min:1,
          max:arr[i].stock,
          prostatus:arr[i].prostatus,
          statusinfo:arr[i].statusinfo
        });
      }
      this.$set(this,"productArr",newArr);
      //计算总价
      this.showTotalprice();
    },
    //计算总价
    showTotalprice(){
      let productArr = this.productArr;
      let postage = 0;//运费
      let totalprice = 0;//商品总价
      for(let i=0;i<productArr.length;i++){
        if(productArr[i]["checked"]===true){
          totalprice+=(parseFloat(productArr[i].price)*productArr[i].count);
          postage+=parseFloat(productArr[i].postage);
        }
      }
      this.$set(this,"postage",postage.toFixed(2));
      this.$set(this,"totalprice",(totalprice+postage).toFixed(2));
    },
    //全部勾选
    checkAll(){
      setTimeout(()=>{
        let productArr = this.productArr;
        if(this.allchecked){
          for(let i=0;i<productArr.length;i++){
            if(productArr[i].prostatus===1){
              productArr[i]["checked"]=true;
            }
          }
        }else{
          for(let i=0;i<productArr.length;i++){
            productArr[i]["checked"]=false;
          }
        }
      },6)
      //把勾选的购物车id放进数组
      this.pushCheckedid();
    },
    //点击单个购物车时勾选或取消勾选
    toggleCheck(item){
      if(item.checked===false){
        item.checked=true;
      }else{
        item.checked=false;
      }
      //判断所有购物车是否都勾选了
      setTimeout(()=>{
        let allchecked=true;
        let productArr = this.productArr;
        for(let i=0;i<productArr.length;i++){
          if(productArr[i]["checked"]===false){
            allchecked=false;
          }
        }
        if(allchecked){
          this.checkall="yes";
        }else{
          this.checkall="no";
        }
      },6)
      //把勾选的购物车id放进数组
      this.pushCheckedid();

    },
    //把勾选的购物车id放进数组
    pushCheckedid(){
      setTimeout(()=>{
        this.checkedArr.length=0;
        let productArr = this.productArr;
        for(let i=0;i<productArr.length;i++){
          if(productArr[i]["checked"]===true){
            this.checkedArr.push(productArr[i]);
          }
        }
        this.$set(this,"totalnum",this.checkedArr.length);
        //计算总价
        this.showTotalprice();
      },6)
    },
    //编辑
    edit(){
      this.canedit=true;
    },
    //完成
    finish(){
      let params = [];
      let productArr = this.productArr;
      for(let i=0;i<productArr.length;i++){
        params.push({
          shopcarid:productArr[i].shopcartid,
          number:productArr[i].count
        });
      }
      this.$http.post(this.GLOBAL.serverSrc + "rest/shopcar/updatenumber",params,{credentials: false})
                .then(function (response) {
                  if(response.data.code==="0000"){
                      this.canedit=false;
                      this.toastMsg=response.data.msg;
                      this.showToast=true;
                      //把勾选的购物车id放进数组
                      this.pushCheckedid();
                  }else{
                      alert(response.data.msg)
                  }
                })
              .catch(function (response) {
                  console.log("修改购物车内商品数量-请求错误：", response)
              });
    },
    //减少数量
    reduceCount(item){
      if(item.count>item.min){
        item.count--;
      }
    },
    //增加数量
    addCount(item){
      if(item.count<item.max){
        item.count++;
      }
    },
    //删除购物车
    removepro(scid,index){
      this.$http.post(this.GLOBAL.serverSrc + "rest/shopcar/delete",[scid],{credentials: false})
                .then(function (response) {
                  if(response.data.code==="0000"){
                      this.productArr.splice(index,1);
                      this.toastMsg=response.data.msg;
                      this.showToast=true;
                      //把勾选的购物车id放进数组
                      this.pushCheckedid();
                  }else{
                      alert(response.data.msg)
                  }
                })
              .catch(function (response) {
                  console.log("删除购物车-请求错误：", response)
              });
    },
    //结算
    settleAccounts(){
      let params = [];
      let productArr = this.productArr;
      for(let i=0;i<productArr.length;i++){
        if(productArr[i]["checked"]===true){
          params.push(productArr[i].shopcartid);
        }
      }
      this.loading=true;
      this.$http.post(this.GLOBAL.serverSrc + "rest/shopcar/checkproducts",params,{credentials: false})
                .then(function (response) {
                  this.loading=false;
                  if(response.data.code==="0000"){
                      this.$router.push({ name: 'MakeOrder', params: { key: "fromShopcart",value: response.data.data.out_trade_no}});
                  }else{
                      alert(response.data.msg)
                  }
                })
              .catch(function (response) {
                  console.log("结算-请求错误：", response)
              });
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .shop_cart{
    text-align: left;
    font-size: .14rem;
  }
  .head{
    width:100%;
    position: fixed;
    top:0;
    left:0;
    z-index: 200;
  }
  .head .weui_cells{
    margin-top:0;
  }
  .head h3.title{
    font-size: .14rem;
    color:#646464;
  }
  .head h3.title i{
    font-size: .13rem;
    margin-left:.1rem;
    margin-right:.06rem;
    color:#999999;
  }
  .head .weui_cell_ft span{
    font-size: .13rem;
    color:#0368FF;
  }
  .body{
    padding:.5rem 0 .7rem 0;
  }
  .body  .weui_cells {
    background-color: #f2f2f2;
  }
  .body .cc{
    margin-bottom:.1rem;
    background-color: #ffffff;
  }
  .body .weui_cells{
    padding:0;
  }
  .body .weui_cells .weui_cell{
    padding:0 0 0 .16rem;
  }
  .body .weui_cells .weui_cell .weui_cell_hd{
    min-width: .28rem;
  }
  .body .weui_cells .weui_cell .weui_cell_hd .statusinfo{
    display: block;
    font-size: .12rem;
    text-align: center;
    background-color: #999;
    color:#ffffff;
  }
  .product{
    padding: .1rem;
    position: relative;
  }
  .product .det{
    height:.8rem;
    overflow: hidden;
  }
  .product .img{
    position: absolute;
    width:.8rem;
    height:.8rem;
    background-color: #cccccc;
  }
  .product p{
    display: block;
    width:3rem;
    padding-left: .9rem;
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
  .product p.price{
    color:#FF6600;
  }
  .product.change_num p.describe,
  .product.change_num p.spec,
  .product.change_num .count{
    visibility: hidden;
  }
  .product.change_num .count_dos,
  .product.change_num .delete_btn{
    visibility: visible;
  }
  .product .count_dos{
    visibility: hidden;
    position: absolute;
    font-size: 0.13rem;
    top:.12rem;
    left:1rem;
    z-index: 40;
    text-align: center;
    display: -webkit-flex; /* Safari */
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
  }
  .product .count_dos>div,
  .product .count_dos>input{
    font-size:.12rem;
    border: 1px solid #999999;
  }
  .product .count_dos>div{
    width:.36rem;
    height:.3rem;
    line-height:.3rem;
  }
  .product .count_dos>div.reduce{
    border-right:none;
    border-top-left-radius: 2px;
    border-bottom-left-radius: 2px;
  }
  .product .count_dos>div.add{
    border-left:none;
    border-top-right-radius: 2px;
    border-bottom-right-radius: 2px;
  }
  .product .count_dos>div.reduce.not_allowed,
  .product .count_dos>div.add.not_allowed{
    color:#cccccc;
    background-color: #f2f2f2;
    border-color:#dddddd;
  }
  .product .count_dos>input{
    text-align: center;
    width:.4rem;
    height:.3rem;
    line-height:.3rem;
  }
  .product .delete_btn{
    visibility: hidden;
    position: absolute;
    font-size: 0.13rem;
    top:0;
    right:.08rem;
    z-index: 40;
    width:.5rem;
    height:1rem;
    line-height: 1rem;
    text-align: center;
    color:#ffffff;
    background-color: #F95757;
  }
  .product .count{
    position: absolute;
    right: .16rem;
    bottom: .1rem;
  }

  .foot{
    position: fixed;
    bottom:0;
    left:0;
    z-index: 200;
    background-color: #ffffff;
    width:100%;
    height:.5rem;
  }
  .foot .weui_cells{
    margin-top:0;
  }
  .foot .weui_cells .weui_check_label{
    padding: 0 0 0 .16rem;
  }
  .foot .weui_icon_checked{
    margin-top:.06rem;
  }
  .foot .title{
    position: absolute;
    top: .16rem;
    left:.5rem;
    font-size: .13rem;
  }
  .foot .info{
    text-align: right;
    margin:0 .1rem;
    height:.5rem;
    line-height:.25rem;
  }
  .foot .info p{
    display: block;
    font-size: .13rem;
  }
  .foot .info p:nth-child(1) span{
    color:#F95757;
  }
  .foot .info p:nth-child(2){
    font-size: .1rem;
  }
  .foot .btn{
    height:.5rem;
    line-height:.5rem;
    font-size: .14rem;
    font-weight:bold;
    background-color: #F95757;
    color:#ffffff;
    padding:0 .3rem;
  }

</style>
