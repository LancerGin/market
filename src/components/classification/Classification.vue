<!-- 商品分类 -->
<template>
  <div class="classification">
    <!-- 左边分类导航栏 -->
    <div class="navs">
      <div v-for="(item, key) in navs" :key="key" class="nav" v-bind:class="{'active':selected===key}" v-on:click="lookChild(key,item.url,item.typeChildList)">{{item.ptname}}</div>
    </div>
    <!-- 右侧子类模块 -->
    <div class="container">
      <div class="top img">
        <img v-bind:src="img" alt="">
      </div>
      <div class="childs">
        <div class="child" v-for="(item, key) in typeChildList" :key="key" v-on:click="lookList('byTypechild',item.tcid)">
          <div class="img">
            <img v-bind:src="item.url" alt="">
          </div>
          <h4>{{item.tcname}}</h4>
        </div>
      </div>
    </div>
    <!-- 底部导航 -->
    <div class="navbar">
      <div class="house" v-on:click="turnTo('/')">
        <i class="fa fa-home" aria-hidden="true"></i>
      </div>
      <div class="classification" v-on:click="turnTo('/classification')">
        <span>商品分类</span>
      </div>
      <div class="shopping_cart" v-on:click="turnTo('/shopcart')">
        <span>购物车</span>
      </div>
      <div class="vip" v-on:click="turnTo('/vip')">
        <span>会员中心</span>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'Classification',
    data () {
      return {
        navs:[],
        selected:0,
        img:'',
        typeChildList:[]
      }
    },
    mounted (){
      this.getProductType();
    },
    methods: {
      getProductType(){
        this.$http.get(this.GLOBAL.serverSrc + "rest/producttype/search",{credentials: false})
                  .then(function (response) {
                    if(response.data.code==="0000"){
                      let obj =  response.data.data;
                      this.$set(this,"navs",obj);
                      this.lookChild(0,obj[0].url,obj[0].typeChildList);
                    }else{

                    }
                  })
                .catch(function (response) {
                    console.log("获取首页信息-请求错误：", response)
                });
      },
      lookChild(key,imgUrl,typeChildList){
        this.selected=key;
        this.img=imgUrl;
        this.$set(this,"typeChildList",typeChildList);
      },
      lookList(key,value){
        this.$router.push({ name: 'List', params: { key: key,value: value}});
      },
      turnTo(link){
        this.$router.push(link);
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .navs{
    width:.7rem;
    height:100%;
    position: fixed;
    top: 0;
    left:0;
    z-index: 1;
    padding-bottom:.6rem;
    background-color: #f2f2f2;
    font-size:.14rem;
    display: -webkit-flex; /* Safari */
    display: flex;
    flex-direction: column;
  }
  .navs .nav{
    height:.6rem;
    line-height:.6rem;
    font-weight:bold;
    border-bottom:1px solid #e5e5e5;
  }
  .navs .nav.active{
    background-color: #ffffff;
  }
  .container{
    width:100%;
    padding-left:.7rem;
  }
  .container .top{
    width:100%;
    height:1.6rem;
    padding:.1rem;
  }
  .container .childs{
    width:100%;
    padding:.1rem;
    display: -webkit-flex; /* Safari */
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  .container .childs .child{
    font-size: .16rem;
    width:.8rem;
  }
  .container .childs .child>.img{
    height:.8rem;
    background-color: #cccccc;
  }
  .container .childs .child>h4{
    font-size:.12rem;
    line-height: .3rem;
    font-weight:normal;
    color:#646464;
  }

  .navbar{
    position: fixed;
    bottom:0;
    left:0;
    z-index: 10;
    width: 100%;
    height:.54rem;
    font-size:.16rem;
    background-color: #f2f2f2;
    display: -webkit-flex; /* Safari */
    display: flex;
    justify-content: space-between;
  }
  .navbar>div{
    height:.54rem;
    line-height:.54rem;
    background-color:#ffffff;
    margin-left:1px;
    flex-grow: 2;
  }
  .navbar>div span{
    font-size:.14rem;
  }
  .navbar>div.house{
    flex-grow: 1;
    color:#999999;
  }
</style>
