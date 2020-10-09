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
    onClickTd() {
      if (this.cellData) return;

      this.$store.commit(CLICK_CELL, {
        row: this.rowIndex,
        cell: this.cellIndex,
      });

      let win = false;

      if (
        this.tableData[this.rowIndex][0] === this.turn &&
        this.tableData[this.rowIndex][1] === this.turn &&
        this.tableData[this.rowIndex][2] === this.turn
      ) {
        win = true;
      }

      if (
        this.tableData[0][this.cellIndex] === this.turn &&
        this.tableData[1][this.cellIndex] === this.turn &&
        this.tableData[2][this.cellIndex] === this.turn
      ) {
        win = true;
      }

      if (
        this.tableData[0][0] === this.turn &&
        this.tableData[1][1] === this.turn &&
        this.tableData[2][2] === this.turn
      ) {
        win = true;
      }

      if (
        this.tableData[0][2] === this.turn &&
        this.tableData[1][1] === this.turn &&
        this.tableData[2][0] === this.turn
      ) {
        win = true;
      }

      if (win) {
        // 이겼을 때
        this.$store.commit(SET_WINNER, this.turn);
        this.$store.commit(RESET_GAME);
      } else {
        // 무승부
        let all = true; // all이 true 이면 무승부
        this.tableData.forEach((row) => {
          // 무승부 검사, 모든 칸에 O나 X가 다 차 있는지 검사하는 것
          row.forEach((cell) => {
            if (!cell) {
              all = false;
            }
          });
        });

        if (all) {
          // 무승부가 되면
          this.$store.commit(NO_WINNER);
          this.$store.commit(RESET_GAME);
        } else {
          // 승자도 없고 무승부도 아니면, 게임이 아직 안끝난 것
          this.$store.commit(CHANGE_TURN);
        }
      }
    },
  },
};
</script>
