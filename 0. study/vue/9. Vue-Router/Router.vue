<template>
  <div>
    <div>
      <router-link to="/response">반응속도체크</router-link>
      <router-link to="/rock-scissors-paper">가위바위보</router-link>
      <router-link to="/lotto">로또추첨기</router-link>
      <router-link to="/test">test</router-link>
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
