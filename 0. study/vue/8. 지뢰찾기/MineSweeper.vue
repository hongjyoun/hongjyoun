<template>
  <div>
    <mine-form></mine-form>
    <div>{{ timer }}</div>
    <table-component></table-component>
    <div>{{ result }}</div>
  </div>
</template>

<script>
import { mapState } from "vuex";

import TableComponent from "./TableComponent";
import MineForm from "./MineForm";
import store, { INCREMENT_TIMER } from "./store";

let interval;
export default {
  store,
  components: {
    TableComponent, //    "table-component": TableComponent, 를 축약한 것. PascalCase를 자동으로 Kebab-case로 인식한다
    MineForm,
  },
  computed: {
    ...mapState(["timer", "result", "halted"]),
  },
  methods: {},
  watch: {
    halted(value, oldValue) {
      if (value === false) {
        // halted가 false이면 게임 시작인 상태
        interval = setInterval(() => {
          this.$store.commit(INCREMENT_TIMER);
        }, 1000); // 게임 시작됐을 때 1초마다 시간 올려주기
      } else {
        // 게임 중단
        clearInterval(interval);
      }
    },
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
