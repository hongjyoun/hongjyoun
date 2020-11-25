<template>
  <div>
    <h2>성별</h2>
    <input type="radio" value="남자" v-model="checkedName" />
    <label>남자</label>
    <input type="radio" value="여자" v-model="checkedName" />
    <label>여자</label>

    <h2>취미</h2>
    <input type="checkbox" id="fish" value="낚시" v-model="hoddyName" />
    <label for="fish">낚시</label>
    <input type="checkbox" id="game" value="게임" v-model="hoddyName" />
    <label for="game">게임</label>

    <div>
      <div>성별: {{ checkedName }}</div>
      <div>취미: {{ hoddyName }}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checkedName: "",
      hobbyName: [],
    };
  },
  methods: {},
};
</script>


<style>
</style>
