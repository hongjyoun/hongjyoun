<template>
  <div>
    <div>{{ turn }}님의 턴입니다.</div>
    <table-component />
    <div v-if="winner">{{ winner }}님의 승리!</div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import store from "./store";
import TableComponent from "./TableComponent";

export default {
  store,
  components: {
    TableComponent, //    "table-component": TableComponent, 를 축약한 것. PascalCase를 자동으로 Kebab-case로 인식한다
  },
  computed: {
    ...mapState(["winner", "turn"]), // 아래 내용을 간단하게 이렇게 넣을 수 있다. 위에 import { mapState } from "vuex"; 이거 넣고.
    // winner() {
    //   return this.$store.state.winner;
    // },
    // turn() {
    //   return this.$store.state.winner;
    // },
  },
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
