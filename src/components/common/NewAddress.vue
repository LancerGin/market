<!-- 新增收货地址 -->
<template>
  <div class="new_address">
    <div class="zz"></div>
    <div class="pan">
      <div class="head">
        <div class="title">新增收货地址</div>
        <div class="icon" v-on:click="cancel">
          <icon name="cancel"></icon>
        </div>
      </div>
      <div class="body">
        <cells type="form">
          <div class="weui_cell">
            <div class="weui_cell_bd weui_cell_primary"><slot>收货人</slot></div>
            <div class="weui_cell_ft"><slot>
              <input type="text" name="people" placeholder="名字" v-model="people" class="weui_input">
            </slot></div>
          </div>
        </cells>
      </div>
    </div>
  </div>
</template>

<script>
import {Icon,CellsTitle, CellsTips,Cells, Cell, LinkCell} from 'vue-weui';

export default {
  name: 'NewAddress',
  props: {

  },
  data () {
    return {
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
    LinkCell
  },
  methods: {
    renderField(){

    },
    cancel(){
      this.$emit('close-pannel');

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .new_address{
    position: fixed;
    top:0;
    left:0;
    z-index: 20;
    width:100%;
    height:120%;
  }
  .new_address .weui_input{
    font-size: .14rem;
  }
  .new_address .weui_cell_ft{
    flex-grow: 1;
  }
  .zz{
    width:100%;
    height:120%;
    background-color: rgba(0,0,0,0.9);
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


</style>
