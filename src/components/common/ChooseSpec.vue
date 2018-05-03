<!-- 购买时选择商品规格 -->
<template>
  <div class="spec">
    <div class="pan">
      <div class="head">
        <div class="img">
          <img src="" alt="">
        </div>
        <div class="title">
          还便于与第三方库或既有项目整合
        </div>
        <div class="icon">
          <icon name="cancel_circle"></icon>
        </div>
      </div>
      <div class="body">
        <div class="field_title">
          颜色：
        </div>
        <div class="field_body">
          <div class="field">蓝色</div>
          <div class="field">绿色</div>
          <div class="field">紫色</div>
        </div>
        <div class="spec_title">
          尺寸：
        </div>
        <div class="spec_body">
          <div class="spec">大</div>
          <div class="spec">中</div>
          <div class="spec">小</div>
        </div>
      </div>
      <div class="count">

      </div>
      <weui-button type="default" :plain="true" :mini="true">点击购买</weui-button>
    </div>
  </div>
</template>

<script>
import {Icon,Button} from 'vue-weui';

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
      fieldid:null,
      specItem: this.specObj
    }
  },
  components: {
    Icon,
    'weui-button': Button
  },
  methods: {
    addToShopCart(){
      this.$http.post(this.GLOBAL.serverSrc + "",{

      },{credentials: false})
                .then(function (response) {
                  if(response.data.code==="0000"){

                  }else{

                  }
                })
              .catch(function (response) {
                  console.log("添加到购物车-请求错误：", response)
              });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .spec{
    position: fixed;
    top:0;
    left:0;
    z-index: 2;
    background-color: rgba(0,0,0,0.2);
  }
  .pan{
    width:100%;
    height:3rem;
    position: fixed;
    bottom:0;
    left:0;
    z-index: 3;
  }
  .pan .head{
    width:100%;
    position: relative;
  }
  .pan .head .img{
    width: 1.5rem;
    height: 1.5rem;
    background-color: #cccccc;
  }
  .pan .head .title{
    text-align: left;
    padding:.06rem .03rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 0.14rem;
    color:#333333;
  }
  .pan .head .icon{
    position: absolute;
  }

</style>
