<template>
  <div>
    <div>{{ turn }}님의 턴입니다.</div>
    <table-component :table-data="tableData" />
    <div v-if="winner">{{ winner }}님의 승리!</div>
    <div v-if="noWinner">{{ noWinner }}</div>
  </div>
</template>

<script>
import Vue from "vue";
import TableComponent from "./TableComponent";
export default {
  components: {
    TableComponent, //    "table-component": TableComponent, 를 축약한 것. PascalCase를 자동으로 Kebab-case로 인식한다
  },
  data() {
    return {
      tableData: [
        // [rowIndex] [cellIndex]
        ["", "", ""], // [0][0], [0][1], [0][2]
        ["", "", ""], // [1][0], [1][1], [1][2]
        ["", "", ""], // [2][0], [2][1], [2][2]
      ],
      turn: "O",
      winner: "",
      noWinner: "",
    };
  },
  methods: {
    // onChangeData() {
    //   // this.tableData[1][0] = 'X'; 작동하지 않으니까 Vue.set을 사용
    //   this.$set(this.tableData[1], 0, 'x')   // Vue.set과 동일
    // }
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
