<!-- 购买时选择商品规格 -->
<template>
  <div class="choose_spec">
    <div class="zz"></div>
    <div class="pan">
      <div class="head">
        <div class="img">
          <img v-bind:src="img" alt="">
        </div>
        <div class="title">{{title}}</div>
        <div class="price"><span>￥</span>{{price}}</div>
        <div class="icon" v-on:click="cancel">
          <icon name="cancel"></icon>
        </div>
      </div>
      <div class="body">
        <div class="field_title">{{fieldTitle}}：</div>
        <div class="field_body">
          <div class="field" v-for="(field,key) in fieldItems" v-bind:class="{'selected':key===fieldSelectedIndex}" v-on:click="setField(key,field.img,field.speclist)">
            {{field.field?field.field:"默认"}}
          </div>
        </div>
        <div class="spec_title">{{specTitle}}：</div>
        <div class="spec_body">
          <div class="spec" v-for="(spec,key) in specItems" v-bind:class="{'selected':key===specSelectedIndex}" v-on:click="setSpec(key,spec)">
            {{spec.spec?spec.spec:"默认"}}
          </div>
        </div>
      </div>
      <div class="count">
        <div class="count_title">
          购买数量：
        </div>
        <div class="count_dos">
          <div class="reduce" v-bind:class="{'not_allowed':min===count}" v-on:click="reduceCount">-</div>
          <input type="number" name="count" v-model="count" readonly>
          <div class="add" v-bind:class="{'not_allowed':max===count}" v-on:click="addCount">+</div>
        </div>
      </div>
      <div class="btns">
        <div class="add_to_shopcart btn" v-on:click="addToShopCart">加入购物车</div>
        <div class="btn" v-on:click="buyNow">立即购买</div>
      </div>
    </div>
    <toast v-model="showPositionValue" type="text" :time="8000" is-show-mask text="添加成功" :position="'middle'"></toast>
  </div>
</template>

<script>
import {Icon} from 'vue-weui';
import { Toast } from 'vux'

export default {
  name: 'specItem',
  props: {
    specObj: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      count:1,
      min:1,
      max:99,
      fieldid:null,
      title:this.specObj.prodescribe,
      img:"",
      price:"",
      fieldItems: this.specObj.fieldList,
      fieldTitle:"分类",
      fieldSelectedIndex:0,
      specItems:[],
      specTitle:"规格",
      specSelectedIndex:0,
      showPositionValue:false
    }
  },
  watch:{
    specObj:function(obj){
      this.$set(this,"title",obj.prodescribe);
      this.$set(this,"fieldItems",obj.fieldList);
      this.renderField();
    }
  },
  mounted(){
    this.renderField();
  },
  components: {
    Icon,
    Toast
  },
  methods: {
    renderField(){
      //如果此商品有自定义的分类类型就显示
      if(this.fieldItems[0].fieldkey){
        this.fieldTitle = this.fieldItems[0].fieldkey;
      }
      //默认选中第一个分类
      this.setField(0,this.fieldItems[0].img,this.fieldItems[0].speclist);
    },
    setField(index,imgUrl,obj){
      this.$set(this,"fieldSelectedIndex",index);
      //选中某个分类的时候显示此分类下的所有规格和此分类的缩略图
      this.$set(this,"specItems",obj);
      this.$set(this,"img",imgUrl);
      //如果此商品有自定义的规格类型就显示
      if(this.specItems[0].speckey){
        this.specTitle = this.specItems[0].speckey;
      }
      //默认选中第一个规格
      setTimeout(()=>{
        this.setSpec(0,this.specItems[0]);
      },100);
    },
    setSpec(index,obj){
      this.$set(this,"specSelectedIndex",index);
      //选中分类下的一个规格以后，显示此规格的价格
      //并把 id保存下来（加入购物车或者下单需要）
      this.$set(this,"fieldid",obj.fieldid);
      this.$set(this,"price",obj.price);
      //每种规格的库存
      this.$set(this,"max",obj.stock);
      // 每次选择分类重置数量为1
      this.$set(this,"count",1);
    },
    reduceCount(){
      if(this.count>this.min){
        this.count--;
      }
    },
    addCount(){
      if(this.count<this.max){
        this.count++;
      }
    },
    addToShopCart(){
      this.$http.post(this.GLOBAL.serverSrc + "rest/shopcar/add",{
        	"fieldid":this.fieldid,
        	"number":this.count
      },{credentials: false})
                .then(function (response) {
                  if(response.data.code==="0000"){
                      this.showToast(response.data.msg);
                  }else{
                      alert(response.data.msg)
                  }
                })
              .catch(function (response) {
                  console.log("添加到购物车-请求错误：", response)
              });
    },
    buyNow(){
      this.$http.post(this.GLOBAL.serverSrc + "rest/shopcar/checkproducts",[this.fieldid],{credentials: false})
                .then(function (response) {
                  if(response.data.code==="0000"){
                      this.$router.push({ name: 'MakeOrder', params: { key: "fromDetails",value: response.data.data}});
                  }else{
                      alert(response.data.msg)
                  }
                })
              .catch(function (response) {
                  console.log("立即购买-请求错误：", response)
              });
    },
    cancel(){
      this.$emit('close-pannel');
    },
    showToast (msg) {
      this.$emit('close-pannel',msg);
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .choose_spec{
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
    padding:0 0 .6rem .2rem;
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
    height:.8rem;
    position: relative;
    border-bottom: 1px solid #cccccc;
  }
  .pan .head .img{
    position: absolute;
    top:-0.2rem;
    left:0;
    width: .8rem;
    height: .8rem;
    border-radius: 4px;
    overflow: hidden;
    background-color: #cccccc;
  }
  .pan .head .title{
    text-align: left;
    padding:.1rem .6rem .1rem .9rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 0.12rem;
    color:#333333;
  }
  .pan .head .price{
    display: block;
    text-align: left;
    padding:.1rem .6rem .1rem .9rem;
    font-size: .16rem;
    color:#99CC99;
  }
  .pan .head .price span{
    font-size: .12rem;
    color:#99CC99;
  }
  .pan .head .icon{
    position: absolute;
    top:.06rem;
    right:.1rem;
    z-index: 40;
  }

  .pan .body{
    width:100%;
    padding-top:.06rem;
    border-bottom: 1px solid #cccccc;
  }
  .pan .body .field_title,
  .pan .body .spec_title,
  .pan .count .count_title{
    text-align: left;
    color:#000000;
    font-size: 0.13rem;
    line-height:.3rem;
  }
  .pan .body .field_body,
  .pan .body .spec_body{
    display: -webkit-flex; /* Safari */
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
  }
  .pan .body .field,
  .pan .body .spec{
    margin:0 .1rem .1rem 0;
    padding:.02rem .1rem 0 .1rem;
    font-size: 0.12rem;
    color:#646464;
    border: 1px solid #999999;
    border-radius: 2px;
    /* flex-grow:1; */
  }
  .pan .body .field.selected,
  .pan .body .spec.selected{
    color:#ffffff;
    border-color:#99CC99;
    background-color:#99CC99;
  }
  .pan .count{
    height:.5rem;
    padding-top:.06rem;
    position: relative;
  }
  .pan .count .count_dos{
    position: absolute;
    font-size: 0.13rem;
    top:.12rem;
    right:.12rem;
    z-index: 40;
    display: -webkit-flex; /* Safari */
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
  }
  .pan .count .count_dos>div,
  .pan .count .count_dos>input{
    font-size:.12rem;
    border: 1px solid #999999;
  }
  .pan .count .count_dos>div{
    width:.36rem;
    height:.3rem;
    line-height:.3rem;
  }
  .pan .count .count_dos>div.reduce{
    border-right:none;
    border-top-left-radius: 2px;
    border-bottom-left-radius: 2px;
  }
  .pan .count .count_dos>div.add{
    border-left:none;
    border-top-right-radius: 2px;
    border-bottom-right-radius: 2px;
  }
  .pan .count .count_dos>div.reduce.not_allowed,
  .pan .count .count_dos>div.add.not_allowed{
    color:#cccccc;
    background-color: #f2f2f2;
    border-color:#dddddd;
  }
  .pan .count .count_dos>input{
    text-align: center;
    width:.4rem;
    height:.3rem;
    line-height:.3rem;
  }

  .btns{
    width:100%;
    position: absolute;
    bottom:0;
    left:0;
    z-index: 40;
    font-size:.14rem;
    display: -webkit-flex; /* Safari */
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-start;
  }
  .btns .btn{
    height:.54rem;
    line-height:.54rem;
    color:#ffffff;
    background-color:#99CC99;
    flex-grow: 1;
  }
  .btns .btn.add_to_shopcart{
    color:#99CC99;
    background-color:#EBF5EB;
  }

  .vux-toast{
    font-size:.14rem;
  }

</style>
