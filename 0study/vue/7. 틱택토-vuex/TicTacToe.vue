<template>
  <div>
    <div>{{ turn }}님의 턴입니다.</div>
    <table>
      <tr v-for="(rowData, rowIndex) in tableData" :key="rowIndex">
        <td
          @click="onClickTd(rowIndex, cellIndex)"
          v-for="(cellData, cellIndex) in rowData"
          :key="cellIndex"
        >
          {{ cellData }}
        </td>
      </tr>
    </table>
    <div v-if="winner">{{ winner }}님의 승리!</div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import store, {
  CLICK_CELL,
  SET_WINNER,
  RESET_GAME,
  CHANGE_TURN,
  NO_WINNER,
} from "./store";

export default {
  data() {
    return {
      account: {
        id: 1,
        pw: 2,
      },
      hello: "world",
    };
  },
  store,
  computed: {
    ...mapState(["winner", "turn", "tableData"]), // 아래 내용을 간단하게 이렇게 넣을 수 있다. 위에 import { mapState } from "vuex"; 이거 넣고.
    // winner() {
    //   return this.$store.state.winner;
    // },
    // turn() {
    //   return this.$store.state.winner;
    // },
  },
  methods: {
    onClickTd(rowIndex, cellIndex) {
      if (this.cellData) return;

      this.$store.commit(CLICK_CELL, {
        row: rowIndex,
        cell: cellIndex,
      });

      let win = false;

      if (
        this.tableData[rowIndex][0] === this.turn &&
        this.tableData[rowIndex][1] === this.turn &&
        this.tableData[rowIndex][2] === this.turn
      ) {
        win = true;
      }

      if (
        this.tableData[0][cellIndex] === this.turn &&
        this.tableData[1][cellIndex] === this.turn &&
        this.tableData[2][cellIndex] === this.turn
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
  created() {},
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
