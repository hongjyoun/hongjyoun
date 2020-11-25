<template>
  <td @click="onClickTd">
    {{ cellData }}
  </td>
</template>

<script>
import { mapState } from "vuex";
import {
  CLICK_CELL,
  SET_WINNER,
  RESET_GAME,
  CHANGE_TURN,
  NO_WINNER,
} from "./store";
export default {
  props: {
    cellData: String,
    cellIndex: Number,
    rowIndex: Number,
  },
  computed: {
    // vuex의 state들은 computed를 통해 가져온다
    ...mapState({
      tableData: (state) => state.tableData,
      turn: (state) => state.turn,
      cellData(state) {
        return state.tableData[this.rowIndex][this.cellIndex];
      },
    }),
    // cellData() {
    //   return this.$store.state.tableData[this.rowIndex][this.cellIndex];
    // },
    // tableData() {
    //   return this.$store.state.tableData;
    // },
    // turn() {
    //   return this.$store.state.turn;
    // },
  },
  methods: {
    // mutation은 $store.commit으로 실행한다
  },
};
</script>
