<template>
  <div>
    <div>
      <router-link to="/game/index">게임 매쳐</router-link>
      <router-link to="/game/response?data=1&hello=zerocho&bye=chanho">response</router-link>
      <router-link to="/game/test">test</router-link>
      <router-link to="/game/world">world</router-link>
      <router-link to="/game/lotto">lotto</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import router from './routes'

export default {
  router, 
};


</script>





<style>
  table {
    border-collapse: collapse;
  }
  td {
    border: 1px solid black;
    width: 40px;
    height: 40px;
    text-align: center;
  }
</style>
