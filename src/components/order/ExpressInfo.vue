<template>
  <div class="express">
    <div class="head">
      <p>快递：圆通快递</p>
      <p>快递单号：1236547899522</p>
      <p>物流状态：<b>已签收</b></p>
    </div>
    <div class="timeline">
      <timeline>
  			<timeline-item>
  				<h4 class="recent">【广东】 广州市 已发出</h4>
  				<p class="recent">2016-04-17 12:00:00</p>
  			</timeline-item>
  			<timeline-item>
  				<h4> 申通快递员 广东广州 收件员 xxx 已揽件</h4>
  				<p>2016-04-16 10:23:00</p>
  			</timeline-item>
  			<timeline-item>
  				<h4> 商家正在通知快递公司揽件</h4>
  				<p>2016-04-15 9:00:00</p>
  			</timeline-item>
  		</timeline>
    </div>
  </div>
</template>

<script>
import { Timeline, TimelineItem, XButton } from 'vux';
export default {
  name:"ExpressInfo",
  props: {

  },

  components: {
    Timeline,
    TimelineItem,
    XButton
  },

  data(){
    return{
      sValue:undefined
    }
  },
  mounted(){
    this.getParams();
  },
  methods: {
    getParams(){
      let params = {};
      if(this.$route.params.value!=undefined){
        sessionStorage.setItem('express_params',JSON.stringify(this.$route.params));
        params = this.$route.params;
      }else{
        params = JSON.parse(sessionStorage.getItem('express_params'));
      }
      this.$set(this,"sValue",params.value);
      console.log(this.sValue);
      // this.getExpressInfo();
    },
    getExpressInfo(){
      this.$http.post(this.GLOBAL.serverSrc + "rest/",{

      },{credentials: false})
                .then(function (response) {
                  if(response.data.code==="0000"){

                  }else{
                      alert(response.data.msg)
                  }
                })
              .catch(function (response) {
                  console.log("获取物流信息-请求错误：", response)
              });
    }
  }
}
</script>

<style lang="less">
.express{
  font-size: .14rem;
  text-align: left;
}
.express .head{
  width:100%;
  background-color: #ffffff;
  padding:.1rem .2rem;
}
.express .head p{
  display: block;
  line-height: .28rem;
}
.express .head p b{
  color:#FF6600;
}
.timeline{
  padding-bottom: .4rem;
  overflow: auto;
}
.timeline .vux-timeline{
  padding:.2rem;
}
.timeline .vux-timeline-item-content{
  padding: 0 0 .2rem .2rem;
}
.timeline {
	p {
		color: #888;
		font-size: 0.12rem;
	}
	h4 {
		color: #666;
		font-weight: normal;
	}
	.recent {
		color: rgb(4, 190, 2)
	}
}
</style>
