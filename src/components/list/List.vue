<template>
  <div class="list">
    <list-item v-for="(item, key) in list" :key="key" v-bind:listItem="item" />
  </div>
</template>

<script>

import ListItem from '@/components/common/ListItem.vue';

export default {
  name: 'List',
  data () {
    return {
      list :[
        {
          imgUrl:"./static/img/1.png",
          title:"吊带连衣裙套装",
          describe:"纯色纯色高端大气高端",
          nowprice:"199"
        },
        {
          imgUrl:"./static/img/1.png",
          title:"吊带连衣裙套装",
          describe:"纯色纯色高端大气高端大气大气大气",
          nowprice:"234"
        },
        {
          imgUrl:"./static/img/1.png",
          title:"吊带连衣裙套装",
          describe:"纯色纯色高端大气高端",
          nowprice:"166"
        },
        {
          imgUrl:"./static/img/1.png",
          title:"吊带连衣裙套装",
          describe:"纯色纯色高端大气高端",
          nowprice:"178"
        }
      ]
    }
  },
  mounted(){
    this.getParams();
  },
  components: {
    'list-item': ListItem
  },
  methods: {
    getParams(){
      const params = this.$route.params;
      console.log(params);
    },
    lookDetails(){
      this.$router.push('/details');
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.list{
  width: 100%;
  height:auto;
  background-color: #f2f2f2;
}
.list:after{
  content: "\0020";
  display: block;
  height: 0;
  clear: both;
}

</style>
