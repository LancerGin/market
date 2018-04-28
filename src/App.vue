<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import "@/assets/js/style.js";
export default {
  name: 'App'
}
</script>

<style>
@import "assets/css/base.css";
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
