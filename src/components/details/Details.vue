<!-- 商品详情 -->
<template>
  <div class="details" v-bind:class="{'noscroll':choosespecBorn===true}">
    <!-- 顶部 开始 -->
    <div class="top">
      <div class="back_home" v-on:click="turnTo('/')">
        <div class="img cover">
          <img v-bind:src="logo.url" alt="">
        </div>
        <span>{{logo.title}}</span>
      </div>
      <div class="dos" v-on:click="turnTo(logo.dos.link)">{{logo.dos.name}}</div>
    </div>
    <!-- 顶部 结束 -->
    <!-- 轮播图 开始 -->
    <wc-swiper v-if="slides.length" :duration="500" :interval="2000" class="swiper">
       <wc-slide v-for="(slide, key) in slides" :key="key" class="cover" >
         <img v-bind:src="slide.url" alt="slide.type">
       </wc-slide>
    </wc-swiper>
    <!-- 轮播图 结束 -->
    <!-- 商品信息 开始 -->
    <div class="proinfo">
      <h3>{{detailsObj.prodescribe}}</h3>
      <p class="showprice"><span>￥</span>{{detailsObj.showprice}}</p>
      <div class="sale_info">
        <span class="pull-left">运费：免运费</span>
        <span class="center">销量：215</span>
        <span class="pull-right">库存：100</span>
      </div>
    </div>
    <!-- 商品信息 结束 -->
    <!-- 挑选及评价信息 开始 -->
    <div class="buy cover_weui">
      <cells type="access">
        <link-cell link="javascript:void(0);" v-on:click.native="toChoose">
          <span slot="body">选择：分类</span>
          <span slot="footer"></span>
        </link-cell>
        <!-- <link-cell link="javascript:void(0);">
          <span slot="body">评价：21365</span>
          <span slot="footer"></span>
        </link-cell> -->
      </cells>
    </div>
    <!-- 挑选及评价信息 结束 -->
    <!-- 进入商店 开始 -->
    <div class="shop cover_weui">
      <cells type="access" >
        <link-cell link="javascript:void(0);" v-on:click.native="turnTo('/')">
          <span slot="body">
            <div class="img cover">
              <img v-bind:src="logo.url" alt="">
            </div>
            <span>{{logo.title}}</span>
          </span>
          <span slot="footer"></span>
        </link-cell>
      </cells>
      <div class="shop_info">
        <div>
          <span class="pull-left"><icon name="success_circle"></icon>企业认证</span>
          <span class="pull-left"><icon name="success_circle"></icon>担保交易</span>
        </div>
      </div>
    </div>
    <!-- 进入商店 结束 -->
    <!-- 商品详情介绍 开始 -->
    <div class="rich_details">
      <img v-for="(slide, key) in slides" v-bind:src="slide.url" alt="slide.type">
    </div>
    <!-- 商品详情介绍 结束 -->
    <!-- 弹出选择规格的面板 开始-->
    <div class="choosespec_container" v-bind:class="{'show':choosespecBorn===true}">
      <ChooseSpec v-bind:specObj="detailsObj" v-on:close-pannel="close"></ChooseSpec>
    </div>
    <!-- 弹出选择规格的面板 结束-->
    <toast v-model="showToast" type="text" :time="1500" is-show-mask :text="toastMsg" :position="'middle'"></toast>
  </div>
</template>

<script>
  import {Button,CellsTitle, CellsTips,
    Cells, Cell, LinkCell,Icon} from 'vue-weui';
  import { Toast } from 'vux';
  import ChooseSpec from '@/components/common/ChooseSpec.vue';

  export default {
    name: 'Details',
    data () {
      return {
        proid:"",
        logo:{
          url:"../../static/img/1.png",
          title:"潮流设计小店",
          dos:{
            name:"会员中心",
            link:"/vip"
          }
        },
        slides:[],
        detailsObj:{},
        choosespecBorn:false,  //判断选择规格面板是否弹出
        showToast:false,
        toastMsg:""
      }
    },
    components: {
      'weui-button': Button,
      CellsTitle,
      CellsTips,
      Cells,
      Cell,
      LinkCell,
      Icon,
      Toast,
      ChooseSpec
    },
    mounted (){
      this.getParams();
    },
    methods: {
      getParams(){
        let params = {};
        if(this.$route.params.value){
          sessionStorage.setItem('details_params',JSON.stringify(this.$route.params));
          params = this.$route.params;
        }else{
          params = JSON.parse(sessionStorage.getItem('details_params'));
        }
        this.$set(this,"proid",params.value);
        this.getDetails();
      },
      getDetails(){
        this.$http.get(this.GLOBAL.serverSrc + "rest/product/"+this.proid,{credentials: false})
                  .then(function (response) {
                    if(response.data.code==="0000"){
                      this.formatterData(response.data.data);
                    }else{

                    }
                  })
                .catch(function (response) {
                    console.log("获取商品详情-请求错误：", response)
                });
      },
      formatterData(msg){
        let obj = msg;
        this.$set(this,"detailsObj",obj);
        let imgArr = JSON.parse(obj.imgs);
        for(let i=0;i<imgArr.length;i++){
          if(imgArr[i].type===1){
            this.slides.push(imgArr[i]);
          }
        }
      },
      toChoose(){
        this.choosespecBorn=true;
      },
      close(msg){
        this.choosespecBorn=false;
        if(msg){
          this.toastMsg=msg;
          this.showToast=true;
        }
      },
      turnTo(link){
        this.$router.push(link);
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .details{
    position: relative;
    background-color:#f2f2f2;
  }
  .details.noscroll{
    position: fixed;
  }
  .top{
    width: 100%;
    height:.4rem;
    background-color:#282828;
  }
  .top .back_home{
    float: left;
    width: auto;
    height: .4rem;
    line-height: .4rem;
    font-size: .14rem;
  }
  .top .back_home .img{
    float: left;
    width:.28rem;
    height:.28rem;
    margin: .06rem;
    border-radius:.14rem;
    background-color:#BFBFBF;
    overflow: hidden;
  }
  .top .back_home span{
    color:#ffffff;
  }
  .top .dos{
    float: right;
    margin-right:.06rem;
    line-height: .4rem;
    font-size:.14rem;
    color:#ffffff;
  }

  .swiper {
      height: 4rem;
  }

  .proinfo{
    width:100%;
    padding:0 .1rem;
    font-size: 0.16rem;
    background-color: #ffffff;
  }
  .proinfo h3{
    text-align: left;
    line-height:.4rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 0.16rem;
    color:#333333;
  }
  .proinfo p.showprice{
    display: block;
    text-align: left;
    font-size: .16rem;
    color:#99CC99;
  }
  .proinfo p.showprice span{
    font-size: .12rem;
    color:#99CC99;
  }
  .sale_info{
    width:100%;
    border-top:2px solid #F0F7F0;
    margin-top:.1rem;
    line-height:.4rem;
  }
  .sale_info span{
    font-size: .12rem;
    color:#999999;
  }

  .buy{
    font-size:.16rem;
  }
  .buy>.weui_cells{
    margin-top:.1rem;
    line-height:.36rem;
    text-align: left;
    font-size:.13rem;
  }
  .shop{
    font-size:.16rem;
  }
  .shop>.weui_cells{
    margin-top:.1rem;
    line-height:.62rem;
    text-align: left;
  }
  .shop>.weui_cells span{
    font-weight:bold;
    color:#333333;
  }
  .shop .img{
    float: left;
    width:.5rem;
    height:.5rem;
    margin: .06rem .1rem .06rem 0;
    background-color:#BFBFBF;
    overflow: hidden;
  }
  .shop .shop_info{
    width:100%;
    height:.4rem;
    padding: 0 .1rem;
    background-color:#ffffff;
  }
  .shop .shop_info>div{
    line-height:.4rem;
  }
  .shop .shop_info span{
    font-size: .12rem;
    color:#999999;
    margin-right:.3rem;
  }
  .shop .shop_info .weui_icon_success_circle:before{
    font-size: .14rem;
    color:#999999;
    margin: -0.02rem .04rem 0 0;
  }

  .rich_details{
    margin-top:.1rem;
    width:100%;
    overflow: hidden;
    font-size:.14rem;
  }
  .rich_details img{
    display: block;
  }

  .choosespec_container{
    display: none;
  }
  .choosespec_container.show{
    display: block;
  }

  .vux-toast{
    font-size:.14rem;
  }

</style>
