<template>
  <div class="express" v-if="sValue">
    <div class="head">
      <div class="img">
        <img v-bind:src="sValue.productinfo.img" alt="">
      </div>
      <p>快递：{{name}}</p>
      <p>快递单号：{{number}}</p>
      <p>物流状态：<b>{{statusinfo}}</b></p>
    </div>
    <div class="timeline" v-if="expressArr.length>0">
      <timeline>
  			<timeline-item v-for="(express,key) in expressArr" v-bind:key="key">
  				<h4 v-if="key===0" class="recent">{{express.AcceptStation}}</h4>
          <h4 v-else>{{express.AcceptStation}}</h4>
  				<p v-if="key===0" class="recent">{{express.AcceptTime}}</p>
          <p v-else>{{express.AcceptTime}}</p>
  			</timeline-item>
  		</timeline>
    </div>

    <loading :show="loading"></loading>
  </div>
</template>

<script>
import { Timeline, TimelineItem,Loading } from 'vux';
export default {
  name:"ExpressInfo",
  props: {

  },

  components: {
    Timeline,
    "timeline-item":TimelineItem,
    Loading
  },

  data(){
    return{
      loading:false,
      sValue:undefined,
      number:"",
      name:"",
      status:null,
      statusinfo:"",
      expressArr:[]
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
      this.getExpressInfo();
    },
    getExpressInfo(){
      let expcode = this.sValue.expcode;
      let expnumber = this.sValue.expnumber;
      this.loading=true;
      this.$http.get(this.GLOBAL.serverSrc + "rest/fastmeil/search?expcode="+expcode+
      "&expnumber="+expnumber,{credentials: false})
                .then(function (response) {
                  this.loading=false;
                  if(response.data.code==="0000"){
                      this.$set(this,"expressArr",response.data.data.list);
                      this.$set(this,"name",response.data.data.name);
                      this.$set(this,"number",response.data.data.number);
                      this.$set(this,"status",response.data.data.status);
                      this.$set(this,"statusinfo",response.data.data.statusinfo);
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
  position: relative;
}
.express .head .img{
  position: absolute;
  width:.8rem;
  height:.8rem;
  background-color: #cccccc;
}
.express .head p{
  display: block;
  line-height: .28rem;
  padding-left:1rem;
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
