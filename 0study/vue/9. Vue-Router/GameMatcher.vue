<template>
  <div v-if="currentGame === 'response'"> 
    <response></response>
  </div>
  <div v-else-if="currentGame === 'test'"> test </div>
  <div v-else-if="currentGame === 'world'"> world </div>
  <div v-else-if="currentGame === 'lotto'">
    <lotto-generator></lotto-generator>
  </div>
  <div v-else> 일치하는 게임이 없습니다 </div>
</template>


<script>
import world from './hello/world';
import response from './hello/response';
import LottoGenerator from './hello/LottoBall';
// import GameMatcher from './GameMatcher';
import test from './test';


export default {
  components: { 
    response, world, LottoGenerator, test
  },
  mounted() {
    console.log(this.$router)
    console.log(this.$route)
  },
  computed: {
    currentGame() {
      return this.$route.params.name
    }
  }
}
</script>