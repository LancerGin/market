<!-- 编辑收货地址 -->
<template>
  <div class="edit_address">
    <div class="pan">
      <div class="head">
        <div class="title">编辑收货地址</div>
        <div class="icon" v-on:click="cancel">
          <icon name="cancel"></icon>
        </div>
      </div>
      <div class="body">
        <cells type="split">
          <div class="weui_cell">
            <div class="weui_cell_bd weui_cell_primary"><slot>收货人</slot></div>
            <div class="weui_cell_ft"><slot>
              <input type="text" name="people" placeholder="名字" v-model="people" class="weui_input">
            </slot></div>
          </div>
          <div class="weui_cell">
            <div class="weui_cell_bd weui_cell_primary"><slot>联系电话</slot></div>
            <div class="weui_cell_ft"><slot>
              <input type="text" name="phone" placeholder="手机或固定电话" v-model="phone" class="weui_input">
            </slot></div>
          </div>
          <div class="weui_cell weui_cell_select">
            <div class="weui_cell_bd weui_cell_primary"><slot>选择地区</slot></div>
            <div class="weui_cell_ft select"><slot>
              <div class="province">
                <select class="weui_select" v-model="province" v-on:change="setCity()">
                  <option value="">选择省份</option>
                  <option v-for="(p,index) in provinceArr" v-bind:value="p.name" v-bind:selected="index===0">{{p.name}}</option>
                </select>
              </div>
              <div class="city">
                <select class="weui_select" v-model="city" v-on:change="setArea()">
                  <option value="">选择城市</option>
                  <option v-for="(c,index) in cityArr" v-bind:value="c.name" v-bind:selected="index===0">{{c.name}}</option>
                </select>
              </div>
              <div class="area">
                <select class="weui_select" v-model="area">
                  <option value="">选择地区</option>
                  <option v-for="(a,index) in areaArr" v-bind:value="a.name" v-bind:selected="index===0">{{a.name}}</option>
                </select>
              </div>
            </slot></div>
          </div>
          <div class="weui_cell">
            <div class="weui_cell_bd weui_cell_primary"><slot>详细地址</slot></div>
            <div class="weui_cell_ft"><slot>
              <input type="text" name="address" placeholder="如街道、楼层等" v-model="address" class="weui_input">
            </slot></div>
          </div>
          <div class="weui_cell">
            <div class="weui_cell_bd weui_cell_primary"><slot>邮政编码</slot></div>
            <div class="weui_cell_ft"><slot>
              <input type="text" name="postalcode" placeholder="选填" v-model="postalcode" class="weui_input">
            </slot></div>
          </div>
        </cells>
      </div>
      <div class="submit">
        <div class="btn" v-on:click="save">保存</div>
      </div>
    </div>
  </div>
</template>

<script>
import {Icon,CellsTitle, CellsTips,Cells, Cell, LinkCell} from 'vue-weui';

export default {
  name: 'EditAddress',
  props: {
    addressid:{
      type: String,
      required: true
    }
  },
  data () {
    return {
      people:"",
      phone:"",
      province:"",
      provinceArr:[],
      city:"",
      cityArr:[],
      area:"",
      areaArr:[],
      address:"",
      postalcode:""
    }
  },
  watch:{
    addressid:function(){
      this.renderField();
    }
  },
  mounted(){

  },
  components: {
    Icon,
    CellsTitle,
    CellsTips,
    Cells,
    Cell,
    LinkCell
  },
  methods: {
    renderField(){
      this.getChinaJson();
      this.getAddressData();
    },
    getAddressData(){
      this.$http.get(this.GLOBAL.serverSrc + "rest/address/findById/"+this.addressid,{credentials: false})
                .then(function (response) {
                  if(response.data.code==="0000"){
                    let address = response.data.data;
                      this.$set(this,"people",address.receivename);
                      this.$set(this,"phone",address.tel);
                      this.$set(this,"province",address.province);
                      this.setCity();
                      this.$set(this,"city",address.city);
                      this.setArea();
                      this.$set(this,"address",address.addressinfo);
                      this.$set(this,"postalcode",address.postcode);
                  }else{

                  }
                })
              .catch(function (response) {
                  console.log("获取收货地址-请求错误：", response)
              });
    },
    getChinaJson(){
      this.$http.get('../../../static/china.json')
                .then(function (response) {
                    let arr =  response.data;
                    this.$set(this,'provinceArr',arr);

                })
              .catch(function (response) {
                  console.log("获取地区数据-请求错误：", response)
              });
    },
    setCity(){
      let province = this.province;
      let provinceArr = this.provinceArr;
      for(let i=0;i<provinceArr.length;i++){
        if(provinceArr[i].name===province){
          this.$set(this,'cityArr',provinceArr[i].sub);
          this.$set(this,"city",provinceArr[i]["sub"][0].name);
          this.$set(this,'areaArr',[]);
          this.$set(this,"area","请选择");
        }
      }
    },
    setArea(){
      let city = this.city;
      let cityArr = this.cityArr;
      for(let i=0;i<cityArr.length;i++){
        if(cityArr[i].name===city){
          this.$set(this,'areaArr',cityArr[i].sub||cityArr);
          this.$set(this,"area",cityArr[i].sub?cityArr[i]["sub"][0].name:cityArr[0].name);
        }
      }
    },
    //修改收货地址
    save(){
      this.$http.post(this.GLOBAL.serverSrc + "rest/address/update",{
        "addressid": this.addressid,
        "province": this.province,
        "city": this.city,
        "addressinfo": this.area+this.address,
        "tel": this.phone,
        "receivename": this.people,
        "postcode": this.postalcode
      },{credentials: false})
                .then(function (response) {
                  let obj =  response.data;
                  if(obj.code==="0000"){
                    this.$emit('confirm',obj.msg);
                  }
                })
              .catch(function (response) {
                  console.log("修改收货地址-请求错误：", response)
              });
    },
    cancel(){
      this.$emit('close-pannel');
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .edit_address{
    position: fixed;
    top:0;
    left:0;
    z-index: 60;
    width:100%;
    height:100%;
    overflow: auto;
    text-align: left;
    background-color: rgba(0,0,0,1);
  }
  .edit_address .weui_input{
    font-size: .14rem;
  }
  .edit_address .weui_cell_ft{
    flex-grow: 1;
  }
  .pan{
    width:100%;
    background-color:#ffffff;
    font-size: .16rem;
    animation: DWONTOUP .4s;
  }
  @keyframes DWONTOUP
  {
      from {transform: translateY(-3rem);}
      to {transform: translateY(0);}
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
    z-index: 80;
  }

  .pan .body{
    width:100%;
  }
  .pan .body .weui_cells{
    margin-top:0;
  }
  .pan .body .weui_cell_ft{
    min-width:.3rem;
    max-width: 2.6rem;
  }
  .pan .body .weui_cells .weui_cell{
    height:.48rem;
  }
  .pan .body .weui_cells .weui_cell_primary{
    font-size: 0.13rem;
    color:#646464;
  }
  .pan .body .weui_cells .weui_cell_ft input{
    font-size: 0.13rem;
    color:#000;
  }
  .pan .body .weui_cells .weui_cell_ft input::-webkit-input-placeholder{
    font-size: 0.12rem;
    color:#ccc;
  }

  .pan .body .weui_cells .weui_cell_select{
    padding:10px 15px;
  }
  .pan .body .weui_cells .weui_cell_select .weui_cell_primary{
    flex-grow: 2;
  }
  .pan .body .weui_cells .weui_cell_select .weui_cell_ft.select{
    display: -webkit-flex; /* Safari */
    display: flex;
    justify-content: center;
  }
  .pan .body .weui_cells .weui_cell_select .weui_cell_ft.select div{
    flex-grow: 1;
  }
  .pan .body .weui_cells .weui_cell_select .weui_cell_ft.select select{
    text-align: center;
    font-size: .12rem;
    padding-right:10px;
    padding-left:10px;
  }

  .submit{
    width:100%;
    height:.9rem;
    line-height:.5rem;
    padding:.2rem .1rem;
    background-color:#ffffff;
    border-top:1px solid #f2f2f2;
    font-size:.16rem;
  }
  .submit .btn{
    margin: auto;
    text-align: center;
    background-color:#99CC99;
    color:#ffffff;
  }

</style>
